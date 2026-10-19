import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

// Builder de URLs sin el cliente de Sanity ni token: se puede usar desde componentes de
// cliente sin arrastrar nada pesado al bundle.
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
});

export type { SanityImageSource };

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
