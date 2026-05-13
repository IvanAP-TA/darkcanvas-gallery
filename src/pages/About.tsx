import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/lib/i18n";
import { fetchAboutContent, isSupabaseConfigured } from "@/lib/supabase";
import type { AboutContent } from "@/types/artwork";

export default function About() {
  const { t, language } = useI18n();
  const [cms, setCms] = useState<AboutContent | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    fetchAboutContent()
      .then((c) => {
        if (c && (c.sections?.length || c.portrait_url)) setCms(c);
      })
      .catch(() => {});
  }, []);

  const portrait = cms?.portrait_url || "/paintings/artist.webp";
  const cmsSections = cms?.sections ?? [];
  const lang = language as "en" | "it" | "es" | "zh";
  const localized = (s: any, field: "title" | "body") =>
    s[`${field}_${lang}`] || s[`${field}_en`] || "";
  const localizedItem = (item: any) =>
    (item && (item[lang] || item.en)) || "";

  const textSections = cmsSections.filter((s) => (s.kind ?? "text") === "text");
  const listSections = cmsSections.filter((s) => s.kind === "list");
  const hasCms = cmsSections.length > 0;
  
  return (
    <Layout>
      <SEO 
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        image="/paintings/artist.webp"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": t('nav.home'),
                "item": "https://www.annibalepace.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t('nav.about'),
                "item": "https://www.annibalepace.com/about"
              }
            ]
          })}
        </script>
      </Helmet>
        <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-3">{t('about.title')}</h1>
          <p className="text-muted-foreground text-lg mb-10">
            {t('about.subtitle')}
          </p>
          
          {/* Bio Section with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src={portrait}
                alt="Annibale Pace - Artist Portrait"
                className="w-full h-full object-cover"
                width={600}
                height={750}
              />
            </div>
            <div className="space-y-5">
              {textSections.length > 0 ? (
                textSections.map((s, i) => (
                  <div key={i} className="space-y-3">
                    <h2 className="text-2xl font-serif border-b pb-3 mb-2">
                      {localized(s, "title")}
                    </h2>
                    {localized(s, "body")
                      .split(/\n\n+/)
                      .map((para: string, j: number) => (
                        <p key={j} className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                  </div>
                ))
              ) : (
                <>
                  <h2 className="text-2xl font-serif border-b pb-3 mb-2">{t('about.artist.title')}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t('about.artist.bio1')}</p>
                  <p className="text-muted-foreground leading-relaxed">{t('about.artist.bio2')}</p>
                </>
              )}
            </div>
          </div>

          {/* Artistic Approach hardcoded fallback (only when CMS empty) */}
          {!hasCms && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif border-b pb-3 mb-6">{t('about.approach')}</h2>
              <div className="space-y-5 text-muted-foreground">
                <p className="leading-relaxed">{t('about.approach.text1')}</p>
                <p className="leading-relaxed">{t('about.approach.text2')}</p>
                <p className="leading-relaxed">{t('about.approach.text3')}</p>
              </div>
            </div>
          )}

          {/* CMS list sections (Education, Events, Exhibitions, ...) */}
          {listSections.length > 0 ? (
            <div className="space-y-12">
              {listSections.map((s, i) => {
                const items = (s.items ?? []).map(localizedItem).filter(Boolean);
                if (items.length === 0) return null;
                // Render long lists in two columns to mirror the original "Exhibitions" layout
                const twoCol = items.length > 6;
                return (
                  <div key={i}>
                    <h2 className="text-2xl font-serif border-b pb-3 mb-6">
                      {localized(s, "title")}
                    </h2>
                    <ul
                      className={`text-muted-foreground list-disc pl-5 ${
                        twoCol
                          ? "grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3"
                          : "space-y-3"
                      }`}
                    >
                      {items.map((it, j) => (
                        <li key={j} className="leading-relaxed">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            // Hardcoded fallback when no CMS list sections exist
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="mb-16 md:mb-0">
                  <h2 className="text-2xl font-serif border-b pb-3 mb-6">{t('about.education.title')}</h2>
                  <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                    <li className="leading-relaxed">Maestra Antonella Micocci - Fundamentals of artistic interpretation</li>
                    <li className="leading-relaxed">Maestro Paolo Tagliaferro - Hyperrealistic technique</li>
                    <li className="leading-relaxed">Maestro E. G. Solferino, Centro Artistico "La Casaccia"</li>
                    <li className="leading-relaxed">Bottega Artemisia</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-2xl font-serif border-b pb-3 mb-6">{t('about.events.title')}</h2>
                  <ul className="space-y-4 text-muted-foreground list-disc pl-5">
                    <li className="leading-relaxed">Carousell Du Louvre, Louvre, Parigi, 2013</li>
                    <li className="leading-relaxed">Premio Nazionale di Pittura, Grottaglie, 2015</li>
                    <li className="leading-relaxed">100 Artisti per l'EXPO (EXPO 2015, Milano), Bergamo, 2015</li>
                  </ul>
                </div>
              </div>
              <div className="mt-16">
                <h2 className="text-2xl font-serif border-b pb-3 mb-6">{t('about.exhibitions.title')}</h2>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
