import { useState } from 'react';
import { Photo } from '@/types/photo';
import { useI18n, getPhotoTranslations } from '@/lib/i18n';

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { language } = useI18n();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
        {photos.map((photo) => {
          const translatedPhoto = getPhotoTranslations(photo.id, language);
          return (
            <div
              key={photo.id}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-md touch-manipulation"
              onClick={() => setSelectedPhoto(photo.id)}
            >            <img
                src={photo.imageUrl}
                alt={translatedPhoto.title || photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3 xs:p-4">
                <h3 className="text-white text-base xs:text-lg font-serif">
                  {translatedPhoto.title || photo.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>{selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 xs:p-4" 
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full h-full max-w-6xl flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-2 xs:top-4 right-2 xs:right-4 z-10 text-white text-2xl xs:text-3xl font-bold hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center touch-manipulation min-h-[44px] min-w-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              ×
            </button>
            
            {(() => {
              const photo = photos.find(p => p.id === selectedPhoto);
              const translatedPhoto = photo ? getPhotoTranslations(photo.id, language) : null;
              return (
                <div className="h-full flex flex-col">
                  {/* Image container with strict height constraints */}
                  <div className="flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 0, maxHeight: 'calc(100vh - 120px)' }}>
                    <img
                      src={photo?.imageUrl || ''}
                      alt={translatedPhoto?.title || photo?.title || ''}
                      className="max-w-full max-h-full object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  {/* Description section with fixed height */}                  <div className="flex-shrink-0 text-center px-2 xs:px-4 py-3 xs:py-4 bg-black bg-opacity-20 rounded-lg backdrop-blur-sm mt-2 xs:mt-4" style={{ maxHeight: '120px', overflow: 'auto' }}>
                    <h2 className="text-lg xs:text-xl md:text-2xl font-serif text-white mb-2">
                      {translatedPhoto?.title || photo?.title}
                    </h2>
                    {(translatedPhoto?.description || photo?.description) && (
                      <p className="text-gray-300 text-sm xs:text-base leading-relaxed max-w-3xl mx-auto">
                        {translatedPhoto?.description || photo?.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
} 