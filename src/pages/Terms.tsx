import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <Layout>
      <SEO 
        title="Terms of Service"
        description="Terms and conditions for using Annibale Pace's online gallery - Information on copyright and usage conditions."
        image="/paintings/1.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>
          
          <div className="prose prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to Annibale Pace's website. By accessing or using this website, you agree to be bound by these Terms of Service. 
              If you do not accept all terms and conditions, please do not use this site.
            </p>
            
            <h2>2. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will take effect immediately after being posted on the website. 
              Continued use of the site after such changes constitutes acceptance of the new terms.
            </p>
            
            <h2>3. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, 
              and software, is the property of Annibale Pace or its content suppliers and is protected by Italian and international copyright laws.
            </p>
            <p>
              The artworks displayed on this site are the intellectual property of Annibale Pace. Reproduction, distribution, display, or transmission of any 
              content from this site is strictly prohibited without written authorization from Annibale Pace.
            </p>
            
            <h2>4. Use of the Site</h2>
            <p>You agree to use the site only for legitimate purposes and in a way that does not interfere with or damage the operation of the site. In particular, you agree not to:</p>
            <ul>
              <li>Violate any applicable law or regulation;</li>
              <li>Collect or store personal information of other site users;</li>
              <li>Engage in any activity that interferes with or disrupts the site or servers and networks connected to it;</li>
              <li>Attempt to access areas/features of the site that you are not authorized to access.</li>
            </ul>
            
            <h2>5. Accuracy of Information</h2>
            <p>
              We strive to ensure that all information on our website is accurate and up-to-date. However, we cannot guarantee the accuracy, 
              completeness, or timeliness of the information at all times. Information about artworks, availability, prices, and exhibition details may change 
              and might not be immediately updated on the site.
            </p>
            
            <h2>6. Links to Third-Party Sites</h2>
            <p>
              Our website may contain links to third-party websites that are not owned or controlled by Annibale Pace. We have no control over and assume 
              no responsibility for the content, privacy policies, or practices of any third-party websites. We recommend that you read the terms and conditions 
              and privacy policy of other websites that you visit.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall Annibale Pace, its artists, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising from the use or inability to use the materials on this site, even if Annibale Pace or an authorized representative 
              has been notified of the possibility of such damages.
            </p>
            
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Annibale Pace, its collaborators, licensors, and service providers from any claim or demand, including 
              reasonable attorneys' fees, made by any third party due to or arising out of your breach of these Terms of Service or any document they incorporate by reference, 
              or your violation of any law or the rights of a third party.
            </p>
            
            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service and any disputes arising out of or related to them will be governed by and construed in accordance with Italian law, 
              without giving effect to any principles of conflicts of law.
            </p>
            
            <h2>10. Severability</h2>
            <p>
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be modified and interpreted to accomplish 
              the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              For any questions regarding these Terms of Service, please contact us through the <a href="/contact" className="underline hover:text-white">Contact</a> page 
              or via email at annibalepaceart@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 