'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

interface Top10Item {
  id: string;
  title: string;
  image: string;
  rank: number;
}

interface Top10RowProps {
  title: string;
  items: Top10Item[];
}

export default function Top10Row({ title, items }: Top10RowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseEnter = (itemId: string, event: React.MouseEvent) => {
    const tileElement = event.currentTarget as HTMLElement;
    const tileRect = tileElement.getBoundingClientRect();
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set timeout for delayed hover effect
    hoverTimeoutRef.current = setTimeout(() => {
      // Position relative to viewport (fixed positioning)
      setHoverPosition({
        x: tileRect.left + tileRect.width / 2,
        y: tileRect.top + tileRect.height / 2,
      });
      setHoveredItem(itemId);
    }, 1000);
  };

  const handleMouseLeave = () => {
    // Clear the timeout to prevent delayed hover
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredItem(null);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide pb-4"
          style={{ paddingLeft: '120px' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[144px] h-[216px] bg-gray-800 rounded-md cursor-pointer transition-all duration-300 relative"
              style={{ marginRight: '120px' }}
              onMouseEnter={(e) => handleMouseEnter(item.id, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Rank number behind the image */}
              <div
                className="absolute bottom-0 left-[-140px] z-0 flex items-end p-4"
                style={{ width: '300px', height: '300px' }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontSize: '16rem',
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.25)',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                    letterSpacing: '-0.15em',
                  }}
                >
                  {item.rank}
                </div>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover relative z-10 rounded-md"
              />

              {/* Hover expansion box */}
              {hoveredItem === item.id && (
                <div
                  className="fixed z-50 bg-gray-800 rounded-md shadow-2xl transition-all duration-300"
                  style={{
                    width: '300px',
                    height: '300px',
                    left: hoverPosition.x,
                    top: hoverPosition.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex-1">
                      <div className="text-4xl font-black text-white mb-2">{item.rank}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <div className="space-y-2 text-gray-300">
                        <p className="text-sm">
                          <span className="font-semibold">Genre:</span> {item.rank % 2 === 0 ? 'Action/Adventure' : 'Drama/Thriller'}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Rating:</span> {Math.floor(Math.random() * 2) + 8}.{Math.floor(Math.random() * 9) + 1}/10
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Duration:</span> {Math.floor(Math.random() * 60) + 90} min
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Year:</span> 2024
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button className="flex-1 bg-accent-orange hover:bg-accent-orange-dark text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors">
                        Play
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-semibold text-sm transition-colors">
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Scroll buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}