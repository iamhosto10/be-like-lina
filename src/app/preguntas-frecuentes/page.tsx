import { FaqList } from "@/components/legal/FaqList";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqItems, faqPage } from "@/data/legal/faq";
import { legalMetadata } from "@/lib/legal";
import { faqPageSchema } from "@/lib/schema";

export const metadata = legalMetadata(faqPage);

export default function Page() {
  return (
    <>
      <LegalLayout title={faqPage.title} currentHref={`/${faqPage.slug}`}>
        <FaqList items={faqItems} />
      </LegalLayout>
      <JsonLd data={faqPageSchema(faqItems, `/${faqPage.slug}`)} />
    </>
  );
}
