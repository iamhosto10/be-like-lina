import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { terminosPage } from "@/data/legal/terminos";
import { legalMetadata } from "@/lib/legal";
import { legalPageSchema } from "@/lib/schema";

export const metadata = legalMetadata(terminosPage);

export default function Page() {
  return (
    <>
      <LegalDocument page={terminosPage} />
      <JsonLd
        data={legalPageSchema({
          title: terminosPage.title,
          description: terminosPage.description,
          path: `/${terminosPage.slug}`,
        })}
      />
    </>
  );
}
