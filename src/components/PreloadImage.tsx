// Componente React per precaricare un'immagine (es. LCP) in modo dichiarativo
import { useEffect } from "react";

interface PreloadImageProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  as?: string;
}

const PreloadImage = ({ src, srcSet, sizes, as = "image" }: PreloadImageProps) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = as;
    link.href = src;
    if (srcSet) link.setAttribute("imagesrcset", srcSet);
    if (sizes) link.setAttribute("imagesizes", sizes);
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [src, srcSet, sizes, as]);
  return null;
};

export default PreloadImage;
