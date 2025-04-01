export interface Artwork {
  id: string;
  title: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  detailImages?: string[];
  saatchiUrl?: string;
}
