import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import ContactForm from "@/components/Contact";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  
  return (
    <Layout>
      <SEO 
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        image="/paintings/9.webp"
      />
      
      <ContactForm />
    </Layout>
  );
}
