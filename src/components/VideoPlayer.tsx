'use client';

interface VideoPlayerProps {
  src: string;
  title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <video
        src={src}
        title={title}
        className="w-full aspect-video rounded-lg"
        controls
        poster="https://images.unsplash.com/photo-1489599735734-79b4ba6c9c0b?w=1920&h=1080&fit=crop"
      />
    </div>
  );
}