import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacidadPage } from "@/data/legal/privacidad";
import { legalMetadata } from "@/lib/legal";
import { legalPageSchema } from "@/lib/schema";

export const metadata = legalMetadata(privacidadPage);

export default function Page() {
  return (
    <>
      <LegalDocument page={privacidadPage} />
      <JsonLd
        data={legalPageSchema({
          title: privacidadPage.title,
          description: privacidadPage.description,
          path: `/${privacidadPage.slug}`,
        })}
      />
    </>
  );
}
