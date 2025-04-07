import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About"
        description="Learn about Annibale Pace's artistic journey, influences, and creative process in contemporary art."
        image="/paintings/artist.jpg"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">About</h1>
          <p className="text-muted-foreground text-lg mb-10">
            Discover the story behind my artistic journey and creative process.
          </p>
          
          {/* Bio Section with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src="/paintings/artist.jpg"
                alt="Annibale Pace - Artist Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-5">
              <h2 className="text-2xl font-serif border-b pb-3 mb-2">About Annibale Pace</h2>
              <p className="text-muted-foreground leading-relaxed">
                Born in Grottaglie in 1963, Annibale Pace's artistic journey began with his passion for art nurtured since youth. 
                His formal training started under Maestra Antonella Micocci, where he learned the fundamentals of artistic interpretation.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                His artistic evolution continued through apprenticeships with Maestro Paolo Tagliaferro, where he developed his hyperrealistic technique, 
                and later with Maestro E. G. Solferino at the Artistic Center "La Casaccia." Today, his work combines technical precision with contemporary 
                artistic sensibilities, creating pieces that bridge tradition and innovation.
              </p>
            </div>
          </div>

          {/* Artistic Approach Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif border-b pb-3 mb-6">Artistic Approach</h2>
            <div className="space-y-5 text-muted-foreground">
              <p className="leading-relaxed">
                My artistic journey is driven by a deep exploration of form, color, and emotion. 
                Through various media and techniques, I seek to create works that resonate with 
                viewers on both an intellectual and emotional level.
              </p>
              
              <p className="leading-relaxed">
                Each piece is a reflection of my ongoing dialogue with contemporary art, 
                drawing inspiration from both classical traditions and modern innovations.
              </p>
              
              <p className="leading-relaxed">
                Based in Taranto, Italy, my studio serves as a laboratory for artistic 
                experimentation and creative expression.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education Section */}
            <div className="mb-16 md:mb-0">
              <h2 className="text-2xl font-serif border-b pb-3 mb-6">Education</h2>
              <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                <li className="leading-relaxed">Maestra Antonella Micocci - Fundamentals of artistic interpretation</li>
                <li className="leading-relaxed">Maestro Paolo Tagliaferro - Hyperrealistic technique</li>
                <li className="leading-relaxed">Maestro E. G. Solferino, Centro Artistico "La Casaccia"</li>
                <li className="leading-relaxed">Bottega Artemisia</li>
              </ul>
            </div>

            {/* Events Section */}
            <div>
              <h2 className="text-2xl font-serif border-b pb-3 mb-6">Notable Events</h2>
              <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                <li className="leading-relaxed">Carousell Du Louvre, Louvre, Parigi, 2013</li>
                <li className="leading-relaxed">Premio Nazionale di Pittura, Grottaglie, 2015</li>
                <li className="leading-relaxed">100 Artisti per l'EXPO (EXPO 2015, Milano), Bergamo, 2015</li>
              </ul>
            </div>
          </div>

          {/* Exhibitions Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif border-b pb-3 mb-6">Exhibitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
              <ul className="text-muted-foreground list-disc pl-5">
                <li className="leading-relaxed">Carousell Du Louvre, Louvre, Parigi, 2013</li>
                <li className="leading-relaxed">Paestum Arte, Paestum, 2013</li>
                <li className="leading-relaxed">Premio Nazionale di Pittura, Grottaglie, 2015</li>
                <li className="leading-relaxed">100 Artisti per l'EXPO (EXPO 2015, Milano), Bergamo, 2015</li>
                <li className="leading-relaxed">Paolo Tagliaferro e i suoi allievi, Vicenza, 2018</li>
                <li className="leading-relaxed">Art' Arete', Grottaglie (TA), 2019</li>
                <li className="leading-relaxed">Dalla grisaglia al colore, Laterza, 2019</li>
                <li className="leading-relaxed">Arte in fiera Dolomiti, Treviso, 2022</li>
                <li className="leading-relaxed">Giganti di Puglia, Francavilla Fontana (BR), 2022</li>
              </ul>
              <ul className="text-muted-foreground list-disc pl-5">
                <li className="leading-relaxed">Cubiamo, Francavilla Fontana (BR), 2022</li>
                <li className="leading-relaxed">Natale degli artisti, Brindisi, 2022</li>
                <li className="leading-relaxed">Colors of Fashion – Biennale di Venezia, Venezia, 2022</li>
                <li className="leading-relaxed">Mesagnesi, Mesagne (BR), 2023</li>
                <li className="leading-relaxed">A Carnevale ogni scherzo vale, Francavilla Fontana (BR), 2023</li>
                <li className="leading-relaxed">Chi può esser lieto sia, Mesagne (BR), 2023</li>
                <li className="leading-relaxed">L'abbraccio delle donne, Villa Castelli (BR), 2023</li>
                <li className="leading-relaxed">Mostra d'arte per il centenario dell'aeronautica Militare, Francavilla Fontana (BR), 2023</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
