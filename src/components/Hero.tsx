'use client';

import { Play, Info } from 'lucide-react';

export default function Hero() {

  return (
    <section className="relative h-[75vh] flex items-center overflow-hidden">
      {/* Background Video with MUX Player */}
      <div className="absolute inset-0 z-0">
        {/* Using HTML5 video for demo - replace with MUX player below */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1489599735734-79b4ba6c9c0b?w=1920&h=1080&fit=crop"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* MUX Player version (uncomment and configure when you have a playback ID):
        <mux-player
          playback-id="YOUR_MUX_PLAYBACK_ID_HERE"
          muted
          autoplay
          loop
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        */}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />

      <div className="relative z-20 px-4 md:px-8 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Featured Movie
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
          An epic adventure story about courage, friendship, and discovery in a world of wonder.
        </p>
        <div className="flex space-x-4">
          <button className="bg-accent-orange hover:bg-accent-orange-dark text-white px-8 py-3 rounded-md font-semibold flex items-center space-x-2 transition-colors">
            <Play size={20} />
            <span>Play</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-md font-semibold flex items-center space-x-2 transition-colors">
            <Info size={20} />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </section>
  );
}