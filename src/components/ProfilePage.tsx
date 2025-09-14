'use client';

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
  favoriteGenres?: string[];
  watchlistCount?: number;
  totalWatchTime?: string;
  membershipType?: string;
  // Add other fields as needed
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const db = getFirestore(app);
        const usersCollection = collection(db, 'users');

        // For now, we'll fetch the first user. In a real app, you'd get the current user's ID
        const usersSnapshot = await getDocs(usersCollection);
        const userDoc = usersSnapshot.docs[0]; // Get first user for demo

        if (userDoc) {
          const userData = {
            id: userDoc.id,
            ...userDoc.data()
          } as User;
          setUser(userData);
        } else {
          setError('No user profile found');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl md:text-5xl font-bold text-gray-400">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>

              {user.membershipType && (
                <div className="inline-block bg-accent-orange text-black px-4 py-2 rounded-full font-semibold mb-4">
                  {user.membershipType} Member
                </div>
              )}

              {user.bio && (
                <p className="text-gray-300 text-lg max-w-2xl">{user.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent-orange mb-2">
                {user.watchlistCount || 0}
              </div>
              <div className="text-gray-400">Movies in Watchlist</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent-orange mb-2">
                {user.totalWatchTime || '0h'}
              </div>
              <div className="text-gray-400">Total Watch Time</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-accent-orange mb-2">
                {user.joinDate ? new Date(user.joinDate).getFullYear() : '2025'}
              </div>
              <div className="text-gray-400">Member Since</div>
            </div>
          </div>

          {/* Favorite Genres */}
          {user.favoriteGenres && user.favoriteGenres.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-accent-orange text-black px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Account Settings */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <button className="w-full md:w-auto bg-accent-orange hover:bg-accent-orange-dark text-black font-semibold py-2 px-6 rounded-md transition-colors">
                Edit Profile
              </button>
              <button className="w-full md:w-auto ml-0 md:ml-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                Change Password
              </button>
              <button className="w-full md:w-auto ml-0 md:ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;