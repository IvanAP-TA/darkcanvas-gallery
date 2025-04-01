import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

export default function Privacy() {
  return (
    <Layout>
      <SEO 
        title="Privacy Policy"
        description="Privacy Policy of Annibale Pace's online gallery - Information on the collection and use of personal data."
        image="/paintings/1.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>
          
          <div className="prose prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how personal data is collected and used when you visit Annibale Pace's website ("we", "our"). 
              We are committed to protecting your privacy and handling your data in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact Information</strong>: Name, email address, phone number, and other data you provide when filling out the contact form.</li>
              <li><strong>Usage Data</strong>: Information about how you interact with our site, including pages visited, time spent on the site, and other statistics.</li>
              <li><strong>Technical Data</strong>: IP address, browser type, internet service provider, device information, and location data.</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Respond to your requests and provide you with the requested information;</li>
              <li>Improve and personalize your experience on our site;</li>
              <li>Analyze site usage to optimize its functionality and content;</li>
              <li>Send communications regarding exhibitions, events, or news, if you have expressed consent.</li>
            </ul>
            
            <h2>Cookies and Similar Technologies</h2>
            <p>
              Our site may use cookies and similar technologies to enhance the user experience and collect usage data. 
              You can control the use of cookies through your browser settings, but disabling certain cookies may affect the functionality of the site.
            </p>
            
            <h2>Data Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personal information to third parties, except for service providers who help us manage the site and related services. 
              These service providers have access to personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
            </p>
            
            <h2>Your Rights</h2>
            <p>Under the GDPR and other applicable data protection laws, you have certain rights regarding your personal data, including:</p>
            <ul>
              <li>The right to access and obtain a copy of your data;</li>
              <li>The right to request rectification or deletion of your data;</li>
              <li>The right to restrict or object to the processing of your data;</li>
              <li>The right to data portability;</li>
              <li>The right to lodge a complaint with a supervisory authority.</li>
            </ul>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            
            <h2>Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, 
              including legal, accounting, or reporting obligations.
            </p>
            
            <h2>Changes to the Privacy Policy</h2>
            <p>
              We may periodically update this Privacy Policy to reflect changes in our practices or for other legal or operational reasons. 
              We encourage you to review this page regularly to stay informed about our privacy practices.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or the processing of your personal data, 
              you can contact us through the <a href="/contact" className="underline hover:text-white">Contact</a> page or via email at annibalepaceart@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 