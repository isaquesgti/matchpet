import { useRef, useState, useCallback } from 'react';

interface UseSwipeGestureOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
}

export function useSwipeGesture({ onSwipeLeft, onSwipeRight, threshold = 80 }: UseSwipeGestureOptions) {
  const startX = useRef(0);
  const startY = useRef(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    setIsDragging(true);
    isDraggingRef.current = true;
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const diffX = clientX - startX.current;
    const diffY = clientY - startY.current;
    // Only swipe horizontally if movement is more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setOffsetX(diffX);
    }
  }, []);

  const handleEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (offsetX > threshold) {
      onSwipeRight();
    } else if (offsetX < -threshold) {
      onSwipeLeft();
    }
    setOffsetX(0);
  }, [offsetX, threshold, onSwipeLeft, onSwipeRight]);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY),
    onTouchEnd: handleEnd,
    onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY),
    onMouseMove: (e: React.MouseEvent) => { if (isDraggingRef.current) handleMove(e.clientX, e.clientY); },
    onMouseUp: handleEnd,
    onMouseLeave: () => { if (isDraggingRef.current) handleEnd(); },
  };

  const rotation = offsetX * 0.1;
  const opacity = 1 - Math.abs(offsetX) / 400;

  const style: React.CSSProperties = {
    transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
    opacity: Math.max(opacity, 0.5),
    transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
    cursor: 'grab',
    userSelect: 'none' as const,
  };

  return { handlers, style, offsetX, isDragging };
}
