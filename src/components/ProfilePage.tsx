'use client';

import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { app } from '../lib/firebase';
import { processImageUrl } from '../lib/imageUtils';

import { Timestamp } from 'firebase/firestore';

interface User {
  id: string;
  display_name: string;
  email: string;
  avatar?: string;
  bio?: string;
  created_time?: Timestamp;
  favoriteGenres?: string[];
  watchlistCount?: number;
  totalWatchTime?: string;
  membershipType?: string;
  // Add other fields as needed
}

// Utility function to format Firebase Timestamp
const formatTimestamp = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return 'September 14, 2025 at 9:30:45 PM EDT';

  // Convert Firebase Timestamp to Date
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: '',
    bio: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async (currentUser: FirebaseUser) => {
      try {
        const db = getFirestore(app);
        const userDocRef = doc(db, 'user', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
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

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserProfile(currentUser);
      } else {
        setError('User not authenticated');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = () => {
    if (user) {
      setEditForm({
        display_name: user.display_name,
        bio: user.bio || '',
        email: user.email
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const db = getFirestore(app);
      const userDocRef = doc(db, 'user', user.id);

      await updateDoc(userDocRef, {
        display_name: editForm.display_name,
        bio: editForm.bio
      });

      // Update local state
      setUser({
        ...user,
        display_name: editForm.display_name,
        bio: editForm.bio
      });

      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      router.push('/');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

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
      {/* Navigation Buttons */}
      <div className="absolute top-4 right-4 z-10 flex space-x-4">
        <button
          onClick={handleBackToHome}
          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <Image
                    src={processImageUrl(user.avatar)}
                    alt={user.display_name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl md:text-5xl font-bold text-gray-400">
                    {user.display_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={editForm.display_name}
                      onChange={(e) => setEditForm({...editForm, display_name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      disabled
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-orange"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-accent-orange hover:bg-accent-orange-dark text-black font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.display_name}</h1>
                  <p className="text-gray-400 mb-4">{user.email}</p>

                  {user.membershipType && (
                    <div className="inline-block bg-accent-orange text-black px-4 py-2 rounded-full font-semibold mb-4">
                      {user.membershipType} Member
                    </div>
                  )}

                  {user.bio && (
                    <p className="text-gray-300 text-lg max-w-2xl">{user.bio}</p>
                  )}
                </>
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
              <div className="text-lg font-bold text-accent-orange mb-2 leading-tight">
                {formatTimestamp(user.created_time)}
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
              <button
                onClick={handleEditProfile}
                className="w-full md:w-auto bg-accent-orange hover:bg-accent-orange-dark text-black font-semibold py-2 px-6 rounded-md transition-colors"
              >
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