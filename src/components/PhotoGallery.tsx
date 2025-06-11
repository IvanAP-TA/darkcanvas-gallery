import { useState } from 'react';
import { Photo } from '@/types/photo';

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square group cursor-pointer overflow-hidden"
            onClick={() => setSelectedPhoto(photo.id)}
          >            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
              <h3 className="text-white text-lg font-serif">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              ×
            </button>
            <div className="relative aspect-auto max-h-[80vh]">              <img
                src={photos.find(p => p.id === selectedPhoto)?.imageUrl || ''}
                alt={photos.find(p => p.id === selectedPhoto)?.title || ''}
                className="w-full h-full object-contain"
                width={1200}
                height={900}
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-serif text-white mb-2">
                {photos.find(p => p.id === selectedPhoto)?.title}
              </h2>
              {photos.find(p => p.id === selectedPhoto)?.description && (
                <p className="text-muted-foreground">
                  {photos.find(p => p.id === selectedPhoto)?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 