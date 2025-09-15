'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import MuxPlayer from '@mux/mux-player-react';
import { app } from '../lib/firebase';

interface Movie {
  id: string;
  title: string;
  image?: string;
  genre?: string;
  year?: number;
  duration?: string;
  rating?: string;
  video_path?: string;
}

interface ContentRowProps {
  title: string;
}

export default function ContentRow({ title }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Extract playback ID from MUX URL
  const extractPlaybackId = (videoPath: string): string => {
    if (videoPath.includes('stream.mux.com/')) {
      const match = videoPath.match(/stream\.mux\.com\/([^.?]+)/);
      return match ? match[1] : videoPath;
    }
    return videoPath;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const db = getFirestore(app);
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);
        
        const allMovies = moviesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Movie[];
        
        console.log(`ContentRow "${title}": Showing all ${allMovies.length} movies`);
        
        // Show all movies for every carousel
        const filteredMovies = allMovies;
        
        console.log(`ContentRow "${title}": Filtered to ${filteredMovies.length} movies`);
        
        setMovies(filteredMovies);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title]);

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
    
    // Add delay before hiding the hover box
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 500);
  };

  if (loading) return <div className="px-4 md:px-8 py-8"><div className="text-white">Loading {title}...</div></div>;
  if (error) return <div className="px-4 md:px-8 py-8"><div className="text-red-500">Error: {error}</div></div>;

  return (
    <div className="px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[144px] h-[216px] bg-gray-800 rounded-md cursor-pointer transition-all duration-300 relative"
              onMouseEnter={(e) => handleMouseEnter(movie.id, e)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={movie.image || '/placeholder.jpg'}
                alt={movie.title}
                className="w-full h-full object-cover rounded-md"
              />

              {/* Hover expansion box */}
              {hoveredItem === movie.id && (
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
                  {/* MUX Player Section - Top Half */}
                  <div className="w-full h-[169px] rounded-t-md overflow-hidden">
                    {movie.video_path ? (
                      <MuxPlayer
                        playbackId={extractPlaybackId(movie.video_path)}
                        metadata={{
                          video_id: movie.id,
                          video_title: movie.title,
                        }}
                        streamType="on-demand"
                        autoPlay="muted"
                        muted
                        nohotkeys
                        className="w-full h-full"
                        style={{ objectFit: 'cover' }}
                        onLoadStart={(e) => {
                          const player = e.target as any;
                          if (player && player.shadowRoot) {
                            // Disable controls in shadow DOM
                            const video = player.shadowRoot.querySelector('video');
                            if (video) {
                              video.controls = false;
                            }
                            // Hide control elements
                            const controls = player.shadowRoot.querySelectorAll('mux-controls, .mux-controls, [part*="control"]');
                            controls.forEach((control: any) => {
                              control.style.display = 'none';
                              control.style.visibility = 'hidden';
                            });
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <div className="text-gray-400 text-sm">No preview</div>
                      </div>
                    )}
                  </div>

                  {/* Movie Info Section - Bottom Half */}
                  <div className="p-4 h-[131px] flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{movie.title}</h3>
                      <div className="space-y-1 text-gray-300 text-xs">
                        <p>
                          <span className="font-semibold">Genre:</span> {movie.genre || ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance'][Math.floor(Math.random() * 5)]}
                        </p>
                        <p>
                          <span className="font-semibold">Rating:</span> {movie.rating || `${Math.floor(Math.random() * 2) + 7}.${Math.floor(Math.random() * 9) + 1}/10`}
                        </p>
                        <p>
                          <span className="font-semibold">Duration:</span> {movie.duration || `${Math.floor(Math.random() * 60) + 90} min`}
                        </p>
                        <p>
                          <span className="font-semibold">Year:</span> {movie.year || 2024}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => router.push(`/play/${movie.id}`)}
                        className="flex-1 bg-accent-orange hover:bg-accent-orange-dark text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors"
                      >
                        Play
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors">
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