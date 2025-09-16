'use client';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { app } from '../lib/firebase';
import { processImageUrl } from '../lib/imageUtils';

interface Movie {
  id: string;
  title: string;
  genre?: string;
  year?: number;
  duration?: string;
  rating?: string;
  video_path?: string;
  trailer_video?: string;
  image?: string;
}

const MoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const db = getFirestore(app);
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);

        const moviesData = moviesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Movie[];

        setMovies(moviesData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-white p-4">Loading movies...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Movies from Database</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-gray-800 rounded-lg p-4 text-white">
            {movie.image && (
              <Image
                src={processImageUrl(movie.image)}
                alt={movie.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            <div className="text-sm text-gray-300 space-y-1">
              {movie.genre && <p><span className="font-semibold">Genre:</span> {movie.genre}</p>}
              {movie.year && <p><span className="font-semibold">Year:</span> {movie.year}</p>}
              {movie.duration && <p><span className="font-semibold">Duration:</span> {movie.duration}</p>}
              {movie.rating && <p><span className="font-semibold">Rating:</span> {movie.rating}</p>}
              {movie.video_path && <p><span className="font-semibold">Video:</span> {movie.video_path}</p>}
              {movie.trailer_video && <p><span className="font-semibold">Trailer:</span> {movie.trailer_video}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;