import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoGalleryProps {
  photos: string[];
  petName?: string;
}

export default function PhotoGallery({ photos, petName = 'Pet' }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const openPhoto = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closePhoto = () => {
    setSelectedIndex(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Sem fotos</p>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => openPhoto(index)}
            className={cn(
              "aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer",
              "hover:ring-2 hover:ring-primary transition-all",
              index === 0 && "col-span-2 row-span-2"
            )}
          >
            <img
              src={photo}
              alt={`${petName} - Foto ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => closePhoto()}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closePhoto}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={zoomOut}
                disabled={zoom <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <span className="text-white flex items-center px-2 text-sm">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={zoomIn}
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 w-12 h-12"
                  onClick={prevPhoto}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 w-12 h-12"
                  onClick={nextPhoto}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Image */}
            {selectedIndex !== null && (
              <div 
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                <img
                  src={photos[selectedIndex]}
                  alt={`${petName} - Foto ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                  }}
                  draggable={false}
                />
              </div>
            )}

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {selectedIndex !== null ? selectedIndex + 1 : 0} / {photos.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
