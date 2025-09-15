'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-accent-orange">
              Sandi Video
            </Link>
          </div>
          <div className="text-white">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-accent-orange">
            Sandi Video
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-accent-orange transition-colors">
              Home
            </Link>
            <Link href="/tv-shows" className="text-white hover:text-accent-orange transition-colors">
              TV Shows
            </Link>
            <Link href="/movies" className="text-white hover:text-accent-orange transition-colors">
              Movies
            </Link>
            <Link href="/my-list" className="text-white hover:text-accent-orange transition-colors">
              My List
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-accent-orange transition-colors">
            Search
          </button>
          {user ? (
            <>
              <Link href="/profile" className="text-white hover:text-accent-orange transition-colors">
                My Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-accent-orange hover:bg-accent-orange-dark text-black px-4 py-2 rounded-md font-semibold transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-accent-orange transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="bg-accent-orange text-black px-4 py-2 rounded-md font-semibold hover:bg-accent-orange-dark transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}