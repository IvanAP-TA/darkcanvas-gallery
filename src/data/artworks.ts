import { Artwork } from "@/types/artwork";
import {
  fetchArtworksDB,
  isSupabaseConfigured,
  type ArtworkDB,
} from "@/lib/supabase";

let cachedArtworks: Artwork[] | null = null;
let inflight: Promise<Artwork[]> | null = null;

/**
 * Legacy numeric IDs ("1".."18" used by the old static data) → new slugs in
 * the database. This lets old bookmarks like /portfolio/1 redirect to
 * /portfolio/happiness instead of 404'ing.
 */
export const LEGACY_ID_TO_SLUG: Record<string, string> = {
  "1": "happiness",
  "2": "zeus-wrath",
  "3": "homage-dali",
  "4": "reminiscence",
  "5": "wine-grapes-sea",
  "6": "high-altitude-passion",
  "7": "ethereal-reverence",
  "8": "meditation",
  "9": "seasonal-freshness",
  "10": "warriors-rest",
  "11": "whispers-firelight",
  "12": "citrus",
  "13": "caring-eye",
  "14": "the-phoenix",
  "15": "resonance-stars",
  "16": "release",
  "17": "spirit-savannah",
  "18": "dunes-of-her",
};

/** Resolve any input (legacy numeric id or slug) to its canonical slug. */
export function resolveArtworkId(input: string | undefined): string | undefined {
  if (!input) return input;
  return LEGACY_ID_TO_SLUG[input] ?? input;
}

function mapDB(art: any): Artwork {
  const descriptions =
    art.descriptions && typeof art.descriptions === "object"
      ? (art.descriptions as Record<string, string>)
      : undefined;
  return {
    id: art.slug || art.id,
    slug: art.slug || undefined,
    title: art.title,
    year: art.year,
    technique: art.technique,
    theme: art.theme,
    dimensions: art.dimensions,
    description: art.description,
    descriptions,
    imageUrl: art.image_url,
    detailImages: Array.isArray(art.detail_images) ? art.detail_images : [],
    saatchiUrl: art.saatchi_url || undefined,
    featured: !!art.featured,
    sortOrder: art.sort_order,
  };
}

export async function fetchArtworks(): Promise<Artwork[]> {
  if (cachedArtworks) return cachedArtworks;
  if (inflight) return inflight;

  if (!isSupabaseConfigured()) {
    cachedArtworks = fallbackArtworks;
    return cachedArtworks;
  }

  inflight = (async () => {
    try {
      // Race the DB fetch against a short timeout: if Supabase is slow or
      // blocked by CORS/network, we don't want the gallery to stay empty.
      const timeoutMs = 4000;
      const data = await Promise.race([
        fetchArtworksDB(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Supabase fetch timeout")), timeoutMs)
        ),
      ]);
      const mapped = data.map(mapDB).filter((a) => a.imageUrl && a.title);
      cachedArtworks = mapped.length > 0 ? mapped : fallbackArtworks;
      return cachedArtworks;
    } catch (error) {
      console.warn("[artworks] Falling back to static data:", error);
      cachedArtworks = fallbackArtworks;
      return cachedArtworks;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

// Force a refetch (used after admin mutations)
export function invalidateArtworksCache() {
  cachedArtworks = null;
  inflight = null;
}

// Fallback data for when Supabase is not available
export const fallbackArtworks: Artwork[] = [
  {
    id: "1",
    title: "Happiness",
    year: 2022,
    technique: "Oil on Canvas",
    theme: "Neapolitan Culture",
    dimensions: "80 x 60 cm",
    description: "This artwork is a celebration of the rich and colorful tradition of Naples, drawing inspiration from the iconic figure of Pulcinella and the vibrant folklore that permeates the city. The lively and whimsical nature of Neapolitan culture served as a wellspring of creative influence, infusing this painting with a sense of joy and playfulness.",
    imageUrl: "/paintings/1.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Happiness/2284565/10999217/view"
  },
  {
    id: "2",
    title: "Zeus's Wrath",
    year: 2020,
    technique: "Oil on Canvas",
    theme: "Mythology",
    dimensions: "50 x 40 cm",
    description: "This artwork is a testament to the powerful influence of nature and mythology on my creative journey. Inspired by the tumultuous beauty of stormy seas and the timeless tales of ancient gods, this painting seeks to transport viewers to a world where the elements of the natural world merge with the realm of mythology.",
    imageUrl: "/paintings/zeus_wrath.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Zeus-s-Wrath/2284565/10942645/view"
  },
  {
    id: "3",
    title: "Homage to Salvador Dalí",
    year: 2018,
    technique: "Oil on Canvas",
    theme: "Surrealism",
    dimensions: "50 x 70 cm",
    description: "This artwork stands as a testament to my fascination with the enigmatic and surreal world of Salvador Dalí. Depicting Christ in the unmistakable style of the great surrealist, the painting emerges from the canvas like a dream.",
    imageUrl: "/paintings/3.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Homage-to-Salvador-Dal/2284565/10907877/view"
  },
  {
    id: "4",
    title: "Reminiscence",
    year: 2020,
    technique: "Oil on Canvas",
    theme: "Metaphysical Art",
    dimensions: "50 x 50 cm",
    description: "Creating this artwork was an exploration of the surreal and enigmatic, inspired by the works of Giorgio De Chirico. It's one of my first forays into the realm of metaphysical art, a style that has always fascinated me for its ability to evoke a sense of mystery and intrigue.",
    imageUrl: "/paintings/4.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Reminiscence/2284565/10875147/view"
  },  {
    id: "5",
    title: "Wine, Grapes, Sea",
    year: 2021,
    technique: "Oil on Canvas",
    theme: "Photorealism",
    dimensions: "80 x 60 cm",
    description: "This painting is a testament to mastery in photorealistic painting. With details so sharp and lifelike that they seem to emerge from the canvas, it captures the beauty and essence of a serene and fulfilling moment.",
    imageUrl: "/paintings/5.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Wine-grapes-sea/2284565/10875148/view"
  },  {
    id: "6",
    title: "High Altitude Passion",
    year: 2023,
    technique: "Oil on Canvas",
    theme: "Aviation",
    dimensions: "100 x 70 cm",
    description: "This is the painting I made for the centennial of the Italian Air Force.",
    imageUrl: "/paintings/6.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-High-altitude-passion/2284565/10875149/view"
  },
  {
    id: "7",
    title: "Ethereal Reverence",
    year: 2022,
    technique: "Oil on Canvas",
    theme: "Landscape",
    dimensions: "60 x 60 cm",
    description: "This is one of my most introspective works and is one of my son's favorites. He has always told me he considers it an extremely relaxing painting, probably because of the dark tones and the sunset light that dominates the landscape.",
    imageUrl: "/paintings/7.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Ethereal-Reverence/2284565/10859161/view"
  },
  {
    id: "8",
    title: "Meditation",
    year: 2017,
    technique: "Oil on Canvas",
    theme: "Classical Art",
    dimensions: "40 x 30 cm",
    description: "The inspiration for this work flowed from the depths of my soul, ignited by the eternal beauty of Michelangelo's David. Standing before this masterpiece, I was struck by the timeless elegance and profound grace emanating from the statue.",
    imageUrl: "/paintings/8.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Meditation/2284565/10875150/view"
  },
  {
    id: "9",
    title: "Seasonal Freshness",
    year: 2021,
    technique: "Oil on Canvas",
    theme: "Still Life",
    dimensions: "30 x 30 cm",
    description: "This painting is the culmination of my experiments with photorealistic painting. Fruit is always a fascinating subject, and the nuances of the cherries convey a sense of calm and serenity to anyone who sees them.",
    imageUrl: "/paintings/9.webp",
    saatchiUrl: "https://www.saatchiart.com/art/Painting-Seasonal-Freshness/2284565/10875151/view"
  },
  {
    id: "10",
    title: "Warrior's Rest",
    year: 2022,
    technique: "Oil on Canvas",
    theme: "Figurative",
    dimensions: "100 x 100 cm",
    description: "This painting depicts a warrior finding solace after battle, symbolizing the quest for inner peace following life's challenges.",
    imageUrl: "/paintings/10.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/account/profile/2284565"
  },
  {
    id: "11",
    title: "Whispers of Firelight Painting",
    year: 2024,
    technique: "Oil on Canvas",
    theme: "Figurative",
    dimensions: "70 x 80 cm",
    description: "An exploration of the nuances between spoken words and unspoken thoughts, encouraging viewers to look beyond the surface.",
    imageUrl: "/paintings/11.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Whispers-of-Firelight/2284565/12859855/view"
  },
  {
    id: "12",
    title: "Citrus",
    year: 2020,
    technique: "Oil on Canvas",
    theme: "Still Life",
    dimensions: "100 x 100 cm",
    description: "A vibrant composition capturing the zest and freshness of citrus fruits, evoking feelings of vitality and rejuvenation.",
    imageUrl: "/paintings/12.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/account/profile/2284565"
  },
  {
    id: "13",
    title: "Caring Eye",
    year: 2015,
    technique: "Oil on Canvas",
    theme: "Portrait",
    dimensions: "100 x 100 cm",
    description: "Focusing on the expressive power of a compassionate gaze, this piece highlights the importance of empathy and human connection.",
    imageUrl: "/paintings/13.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/account/profile/2284565"
  },
  {
    id: "14",
    title: "The Phoenix",
    year: 2024,
    technique: "Oil on Canvas",
    theme: "Mythology",
    dimensions: "100 x 100 cm",
    description: "Drawing inspiration from the mythical bird, this artwork represents rebirth and hope, illustrating a creature rising anew from its ashes.",
    imageUrl: "/paintings/14.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/account/profile/2284565"
  },
  {
    id: "15",
    title: "Resonance Under the Stars",
    year: 2024,
    technique: "Oil on Canvas",
    theme: "Portraiture",
    dimensions: "80 x 60 cm",
    description: "This work was inspired by the captivating union between architecture, memory, and sound. Set in a quiet, historic Italian town square at night, the piece reflects on how music can transform and elevate familiar spaces into places of wonder.",
    imageUrl: "/paintings/15.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Resonance-Under-the-Stars/2284565/12868851/view"
  },
  {
    id: "16",
    title: "Release",
    year: 2017,
    technique: "Oil on Canvas",
    theme: "Mythology",
    dimensions: "30 x 40 cm",
    description: "Two weathered hands gently open, releasing a butterfly into the air. The cracked eggshell symbolizes rebirth, while the vibrant wings speak of transformation, fragility, and freedom. This piece was inspired by the quiet courage required to let go — of fear, of sorrow, or of someone you love — and to trust in what comes next.",
    imageUrl: "/paintings/16.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Release/2284565/12859935/view"
  },
  {
    id: "17",
    title: "Spirit of the Savannah",
    year: 2020,
    technique: "Oil on Canvas",
    theme: "Surrealism",
    dimensions: "50 x 50 cm",
    description: "This painting was born from a deep reverence for both African heritage and the natural world. The central figure, a serene Black woman with eyes closed, becomes one with the landscape, her profile blending seamlessly into the silhouettes of majestic elephants walking through a sunlit savannah. This symbolizes the spiritual bond between humans and nature, and the quiet strength found in both.",
    imageUrl: "/paintings/17.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Spirit-of-the-Savannah/2284565/12868881/view"
  },
  {
    id: "18",
    title: "Dunes of Her",
    year: 2024,
    technique: "Oil on Canvas",
    theme: "Surrealism",
    dimensions: "120 x 45 cm",
    description: "n this dreamlike sunset, rolling dunes stretch into the horizon — but a second glance reveals their true nature: the soft, sensual contours of a woman’s body merging with the earth. This painting is inspired by the surreal connection between nature and the feminine, the sacred landscape of the human form.",
    imageUrl: "/paintings/18.webp",
    saatchiUrl: "https://www.saatchiart.com/en-it/art/Painting-Dunes-of-Her/2284565/12862119/view"
  }
];

// Funzione per ordinare i quadri per anno
export const getArtworksByYear = async () => {
  const artworks = await fetchArtworks();
  return [...artworks].sort((a, b) => b.year - a.year);
};

// Funzione per ottenere i quadri di un anno specifico
export const getArtworksByYearValue = async (year: number) => {
  const artworks = await fetchArtworks();
  return artworks.filter(artwork => artwork.year === year);
};

// Funzione per ottenere tutti gli anni disponibili
export const getAvailableYears = async () => {
  const artworks = await fetchArtworks();
  return [...new Set(artworks.map(artwork => artwork.year))].sort((a, b) => b - a);
};
