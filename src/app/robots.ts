import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site-url";

/**
 * Rastreadores de motores de IA que se permiten de forma explícita
 * (además de Google, Bing, etc., cubiertos por `*`).
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI · entrenamiento
  "OAI-SearchBot", // OpenAI · búsqueda en ChatGPT
  "ChatGPT-User", // OpenAI · cuando un usuario pide visitar la página
  "ClaudeBot", // Anthropic · entrenamiento
  "Claude-SearchBot", // Anthropic · búsqueda
  "Claude-User", // Anthropic · visita a petición del usuario
  "PerplexityBot", // Perplexity · índice
  "Perplexity-User", // Perplexity · visita a petición del usuario
  "Google-Extended", // Google · Gemini
  "Applebot-Extended", // Apple Intelligence
  "meta-externalagent", // Meta AI
  "Amazonbot", // Alexa
  "DuckAssistBot", // DuckDuckGo AI
];

/** Rutas que nunca deben rastrearse: pagos y endpoints internos. */
const PRIVATE = ["/checkout", "/api/"];

export default function robots(): MetadataRoute.Robots {
  /* Fuera del dominio definitivo (Vercel, pruebas): nadie rastrea, nada se indexa. */
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
