import Header from '@/components/Header';
import ContentRow from '@/components/ContentRow';
import Top10Row from '@/components/Top10Row';
import Footer from '@/components/Footer';

export default function Movies() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-20">
        <div className="px-4 md:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Movies</h1>
        </div>

        <ContentRow title="Trending Movies" />
        <Top10Row title="Top 10 Movies This Week" />
        <ContentRow title="Action Movies" />
        <ContentRow title="Comedy Movies" />
        <ContentRow title="Drama Movies" />
        <ContentRow title="Thriller Movies" />
        <ContentRow title="Romance Movies" />
      </main>

      <Footer />
    </div>
  );
}