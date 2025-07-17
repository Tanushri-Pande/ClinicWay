import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SlotSelector = ({ docSlots, slotIndex, slotTime, setSlotTime }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Helper function to check scroll state for arrows
  const checkScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Show right arrow if there's content to scroll AND it's not at the very end
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5); // -5 for a small buffer
    }
  };

  // Auto-scroll to selected slot on date change or initial load
  useEffect(() => {
    if (containerRef.current) {
      const selectedSlotElement = containerRef.current.querySelector('.slot-selected');
      if (selectedSlotElement) {
        // Scroll the selected element into view, centered if possible
        selectedSlotElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        // If no selected slot, scroll to the beginning for the new day's slots
        containerRef.current.scrollLeft = 0;
      }
      checkScrollState(); // Initial check for arrows
    }
  }, [slotIndex, slotTime, docSlots]);

  // Add event listener for scroll to update arrow visibility
  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollState);
      // Initial check on mount
      checkScrollState();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScrollState);
      }
    };
  }, [docSlots]);


  // Function to scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const currentDaySlots = docSlots.length > 0 ? docSlots[slotIndex] : [];

  return (
    <div className="flex items-center justify-center relative w-full my-6 py-2">
      {/* Left Arrow Button */}
      {showLeftArrow && ( // Conditionally render
        <button
          className="p-3 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 absolute left-0 z-20 transform -translate-x-1/2 opacity-90 hover:opacity-100"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable Slots Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-4 overflow-x-scroll no-scrollbar py-4 px-2 sm:px-4 snap-x snap-mandatory scroll-smooth w-full"
      >
        {currentDaySlots.length > 0 && currentDaySlots[0].time !== false ? (
          currentDaySlots.map((item, index) => (
            <button
              onClick={() => setSlotTime(item.time)}
              className={`flex-shrink-0 px-8 py-3 rounded-full cursor-pointer transition-all duration-200 ease-in-out text-base font-semibold whitespace-nowrap snap-center
                ${
                  item.time === slotTime
                    ? "bg-blue-600 text-white shadow-lg transform scale-105 slot-selected" // Added class for selection
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md"
                }`}
              key={item.time || index} // Use time as key if unique, otherwise index
            >
              {item.time.toLowerCase()}
            </button>
          ))
        ) : (
          <div className="flex-shrink-0 px-8 py-3 rounded-full bg-gray-100 text-gray-500 italic text-center w-full shadow-inner cursor-not-allowed">
            No slots available for this day.
          </div>
        )}
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && ( // Conditionally render
        <button
          className="p-3 bg-white text-blue-700 rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 absolute right-0 z-20 transform translate-x-1/2 opacity-90 hover:opacity-100"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <FaChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default SlotSelector;

