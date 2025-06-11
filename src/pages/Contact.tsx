import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import ContactForm from "@/components/Contact";

export default function Contact() {
  return (
    <Layout>
      <SEO 
        title="Contact"
        description="Get in touch with Annibale Pace for inquiries about artworks, exhibitions, and collaborations."
        image="/paintings/9.webp"
      />
      
      <ContactForm />
    </Layout>
  );
}
