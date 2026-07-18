import { Icon } from '@iconify/react';
import { useEffect } from 'react';

const GalleryLightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[5000] bg-zinc-950/95 backdrop-blur-sm flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
      >
        <Icon icon="solar:close-circle-linear" className="text-4xl" />
      </button>
      
      <button 
        onClick={onPrev}
        className="absolute left-6 text-white/70 hover:text-white transition-colors"
      >
        <Icon icon="solar:alt-arrow-left-linear" className="text-5xl" />
      </button>
      
      <div className="w-[80vw] max-w-5xl aspect-[16/9] relative">
        <img 
          src={images[currentIndex]} 
          alt={`Gallery view ${currentIndex + 1}`} 
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      <button 
        onClick={onNext}
        className="absolute right-6 text-white/70 hover:text-white transition-colors"
      >
        <Icon icon="solar:alt-arrow-right-linear" className="text-5xl" />
      </button>
    </div>
  );
};

export default GalleryLightbox;
