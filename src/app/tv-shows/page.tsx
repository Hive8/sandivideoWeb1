import Header from '@/components/Header';
import ContentRow from '@/components/ContentRow';
import Top10Row from '@/components/Top10Row';
import Footer from '@/components/Footer';

export default function TVShows() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-20">
        <div className="px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">TV Shows</h1>
        </div>

        <ContentRow title="Trending TV Shows" />
        <Top10Row title="Top 10 TV Shows This Week" />
        <ContentRow title="TV Shows" />
        <ContentRow title="Drama Series" />
        <ContentRow title="Comedy Series" />
        <ContentRow title="Crime Shows" />
        <ContentRow title="Documentaries" />
      </main>

      <Footer />
    </div>
  );
}