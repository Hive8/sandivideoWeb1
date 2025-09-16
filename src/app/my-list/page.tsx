'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Header from '@/components/Header';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function MyList() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-white text-xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">My List</h1>
            <p className="text-gray-400 mb-8">Sign in to view your saved movies and TV shows.</p>
            <Link
              href="/login"
              className="bg-accent-orange hover:bg-accent-orange-dark text-black px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-20">
        <div className="px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>
          <p className="text-gray-400 mb-8">Your saved movies and TV shows</p>
        </div>

        {/* For now, show all movies. In a real implementation, this would filter by user's saved items */}
        <ContentRow title="Your Saved Content" />
      </main>

      <Footer />
    </div>
  );
}