import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ContentRow from '@/components/ContentRow';
import Top10Row from '@/components/Top10Row';
import { top10Movies } from '@/data/sampleData';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />

      <main className="pt-20">
        <ContentRow title="Trending Now" />
        <Top10Row title="Top 10 Movies This Week" items={top10Movies} />
        <ContentRow title="TV Shows" />
        <ContentRow title="Action Movies" />
        <ContentRow title="Comedies" />
      </main>
    </div>
  );
}
