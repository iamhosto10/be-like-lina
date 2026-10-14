import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { assertValidSignature } from "@sanity/webhook";

/**
 * Webhook de Sanity (manage → API → Webhooks):
 *   POST https://<dominio>/api/revalidate
 *   Trigger: Create, Update, Delete · Dataset: production
 *   Projection: {_type, "slug": slug.current}
 *   Secret: mismo valor que SANITY_REVALIDATE_SECRET
 *
 * Invalida por tags (ver `lib/sanity.ts`): el home, el listado y el artículo se regeneran
 * sin necesidad de un nuevo despliegue.
 */
type WebhookPayload = { _type?: string; slug?: string | null };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET no configurado" },
      { status: 500 },
    );
  }

  // La firma se verifica contra el cuerpo tal cual llegó, sin re-serializarlo.
  const raw = await req.text();
  try {
    await assertValidSignature(raw, req.headers.get("sanity-webhook-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ message: "Firma inválida" }, { status: 401 });
  }

  let body: WebhookPayload = {};
  try {
    body = JSON.parse(raw) as WebhookPayload;
  } catch {
    return NextResponse.json({ message: "Cuerpo no válido" }, { status: 400 });
  }

  const tags = ["global-data"];
  if (body._type) {
    tags.push(`all-${body._type}`);
    if (body.slug) tags.push(`${body._type}-${body.slug}`);
  }

  // Next 16: el segundo argumento es obligatorio. { expire: 0 } hace que la siguiente visita
  // espere el contenido nuevo en lugar de ver una vez la versión anterior.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tags });
}
