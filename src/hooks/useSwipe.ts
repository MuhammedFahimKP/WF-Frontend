import { useState } from "react";

type SwipeDirection = "left" | "right" | "both";

interface UseSwipeOptions {
  direction: SwipeDirection; // Accept 'left', 'right', or 'both'
  onSwipe: (direction: SwipeDirection) => void; // A single callback with the detected swipe direction
}

export const useSwipe = ({ direction, onSwipe }: UseSwipeOptions) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [endX, setEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX !== null && endX !== null) {
      const deltaX = startX - endX;

      if (direction === "left" || direction === "both") {
        if (deltaX > 0) {
          onSwipe("left"); // Trigger left swipe
        }
      }

      if (direction === "right" || direction === "both") {
        if (deltaX < 0) {
          onSwipe("right"); // Trigger right swipe
        }
      }
    }

    // Reset state after detecting swipe
    setStartX(null);
    setEndX(null);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
