'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MuxPlayer from '@mux/mux-player-react';
import { app } from '@/lib/firebase';

interface Movie {
  id: string;
  title: string;
  description: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  video_path?: string;
}

const PlayVideoPage = () => {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract playback ID from MUX URL
  const extractPlaybackId = (videoPath: string): string => {
    // Handle full MUX URLs like: https://stream.mux.com/Tu6Rja019GjwarCcHPL7tqiVgKbQjWJH019V2zECya6ow.m3u8
    if (videoPath.includes('stream.mux.com/')) {
      const match = videoPath.match(/stream\.mux\.com\/([^.?]+)/);
      return match ? match[1] : videoPath;
    }
    // If it's already just the playback ID, return as is
    return videoPath;
  };

  const fetchMovie = useCallback(async () => {
    try {
      const db = getFirestore(app);
      const movieId = params.id as string;
      const movieDoc = await getDoc(doc(db, 'movies', movieId));

      if (movieDoc.exists()) {
        const movieData = {
          id: movieDoc.id,
          ...movieDoc.data()
        } as Movie;
        setMovie(movieData);
      } else {
        setError('Movie not found');
      }
    } catch (err) {
      console.error('Error fetching movie:', err);
      setError('Failed to load movie');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    // Check authentication
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMovie();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, fetchMovie]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading video...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error || 'Movie not found'}</div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .mux-player-container mux-player {
            --accent-color: #f3c033;
            --media-control-background: rgba(0, 0, 0, 0.7);
            --media-control-hover-background: rgba(0, 0, 0, 0.9);
            --media-control-bar-color: rgba(255, 255, 255, 0.7);
            --media-control-bar-hover-color: #f3c033;
            --media-control-bar-active-color: #f3c033;
            --media-control-bar-fill-color: #f3c033;
            --media-control-bar-fill-hover-color: #f4c842;
            --media-control-bar-fill-active-color: #f4c842;
            --media-control-button-color: rgba(255, 255, 255, 0.8);
            --media-control-button-hover-color: #f3c033;
            --media-control-button-active-color: #f3c033;
            --media-control-time-color: rgba(255, 255, 255, 0.8);
            --media-control-time-hover-color: #f3c033;
            --media-control-volume-color: rgba(255, 255, 255, 0.8);
            --media-control-volume-hover-color: #f3c033;
            --media-control-volume-fill-color: #f3c033;
            --media-control-volume-fill-hover-color: #f4c842;
          }
        `
      }} />
      <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <div className="relative z-20 p-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Video Player Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 pb-8">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          {movie.video_path ? (
            <div className="mux-player-container">
              <MuxPlayer
                playbackId={extractPlaybackId(movie.video_path)}
                metadata={{
                  video_id: movie.id,
                  video_title: movie.title,
                  viewer_user_id: getAuth(app).currentUser?.uid,
                }}
                streamType="on-demand"
                autoPlay={false}
                className="w-full"
                style={{ aspectRatio: '16/9', maxHeight: '70vh' }}
              />
            </div>
          ) : (
            <div
              className="w-full flex items-center justify-center bg-gray-900"
              style={{ aspectRatio: '16/9', minHeight: '400px' }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-400">Video not available</p>
              </div>
            </div>
          )}

          {/* Movie Info Overlay */}
          <div className="p-6 bg-gray-900">
            <div className="max-w-none">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-green-400 font-semibold">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : '2025'}</span>
                <span className="border border-gray-400 px-2 py-1 text-sm">HD</span>
              </div>
              <p className="text-lg text-gray-300 max-w-none">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PlayVideoPage;