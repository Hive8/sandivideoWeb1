import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ContentRow from '@/components/ContentRow';
import VideoPlayer from '@/components/VideoPlayer';
import { sampleMovies, sampleTVShows } from '@/data/sampleData';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />

      <main className="pt-20">
        <ContentRow title="Trending Now" items={sampleMovies} />
        <ContentRow title="TV Shows" items={sampleTVShows} />
        <ContentRow title="Action Movies" items={sampleMovies} />
        <ContentRow title="Comedies" items={sampleTVShows} />

        {/* Demo Video Player Section */}
        <div className="px-4 md:px-8 py-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Featured Video</h2>
          <VideoPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            title="Big Buck Bunny"
          />
        </div>
      </main>
    </div>
  );
}
