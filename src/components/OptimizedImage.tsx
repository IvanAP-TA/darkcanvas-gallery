import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  srcSet,
  sizes,
  priority = false,
  placeholder,
  onLoad,
  loading = 'lazy',
  fetchPriority = 'auto',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);
  // Generate optimal sizes based on viewport
  const generateOptimalSizes = () => {
    if (sizes) return sizes;
    
    // More precise sizing for different image types
    if (className?.includes('hero')) {
      return '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px';
    }
    if (className?.includes('artwork') || className?.includes('portfolio')) {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    }
    if (className?.includes('artist') || className?.includes('about')) {
      return '(max-width: 768px) 100vw, 400px';
    }
    // Default responsive sizes
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {placeholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ aspectRatio: `${width}/${height}` }}
        />
      )}
        <img
        ref={imgRef}
        src={isInView ? src : placeholder || src}
        srcSet={isInView && srcSet ? srcSet : undefined}
        sizes={generateOptimalSizes()}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : fetchPriority}
        onLoad={handleLoad}
        decoding="async"
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ 
          aspectRatio: `${width}/${height}`,
          objectFit: 'cover'
        }}
      />
    </div>
  );
}
