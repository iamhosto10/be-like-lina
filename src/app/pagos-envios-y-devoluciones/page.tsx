import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { enviosPage } from "@/data/legal/envios";
import { legalMetadata } from "@/lib/legal";
import { legalPageSchema } from "@/lib/schema";

export const metadata = legalMetadata(enviosPage);

export default function Page() {
  return (
    <>
      <LegalDocument page={enviosPage} />
      <JsonLd
        data={legalPageSchema({
          title: enviosPage.title,
          description: enviosPage.description,
          path: `/${enviosPage.slug}`,
        })}
      />
    </>
  );
}
