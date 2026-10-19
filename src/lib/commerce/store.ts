import "server-only";
import { Redis } from "@upstash/redis";
import type { Order } from "@/lib/commerce/types";

/**
 * Almacén de pedidos. En producción es Upstash Redis (se activa desde Vercel → Storage →
 * Marketplace → Upstash Redis, que crea las variables solo). Sin Redis, en local se usa memoria.
 *
 * En Vercel la memoria NO sirve (cada petición puede caer en otra instancia y el webhook de
 * Mercado Pago no encontraría el pedido), por eso allí `isDurable()` obliga a tener Redis.
 */
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const memory =
  (globalThis as unknown as { __bllStore?: Map<string, unknown> }).__bllStore ??
  new Map<string, unknown>();
(globalThis as unknown as { __bllStore?: Map<string, unknown> }).__bllStore = memory;

const ORDER_TTL_SECONDS = 60 * 60 * 24 * 400; // ~13 meses
const CLAIM_TTL_SECONDS = 60 * 60 * 24 * 30;

/** ¿Los pedidos sobreviven entre peticiones? Falso solo en memoria dentro de Vercel. */
export function isDurable(): boolean {
  return redis !== null || !process.env.VERCEL;
}

export async function saveOrder(order: Order): Promise<void> {
  const next = { ...order, updatedAt: new Date().toISOString() };
  if (redis) await redis.set(`order:${order.id}`, next, { ex: ORDER_TTL_SECONDS });
  else memory.set(`order:${order.id}`, structuredClone(next));
}

export async function getOrder(id: string): Promise<Order | null> {
  if (!/^BLL-[A-Z0-9]{8}$/.test(id)) return null;
  if (redis) return (await redis.get<Order>(`order:${id}`)) ?? null;
  const found = memory.get(`order:${id}`);
  return found ? (structuredClone(found) as Order) : null;
}

/**
 * Reclama una marca de una sola vez (SET NX). Devuelve true solo a quien la obtiene primero:
 * así dos notificaciones simultáneas de Mercado Pago no envían el correo dos veces.
 */
export async function claim(key: string): Promise<boolean> {
  if (redis) {
    const result = await redis.set(`claim:${key}`, "1", { nx: true, ex: CLAIM_TTL_SECONDS });
    return result === "OK";
  }
  if (memory.has(`claim:${key}`)) return false;
  memory.set(`claim:${key}`, "1");
  return true;
}

/** Libera una marca para que un reintento pueda volver a intentarlo (p. ej. si falló el envío). */
export async function release(key: string): Promise<void> {
  if (redis) await redis.del(`claim:${key}`);
  else memory.delete(`claim:${key}`);
}
