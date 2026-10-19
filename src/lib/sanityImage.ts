import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/lib/sanityConfig";
import type { SanityImageSource } from "@sanity/image-url";

// Builder de URLs sin el cliente de Sanity ni token: se puede usar desde componentes de
// cliente sin arrastrar nada pesado al bundle.
const builder = createImageUrlBuilder({ projectId, dataset });

export type { SanityImageSource };

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
