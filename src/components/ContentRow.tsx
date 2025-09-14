import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentRowProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    image: string;
  }>;
}

export default function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="px-4 md:px-8 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="relative group">
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 h-72 bg-gray-800 rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="p-2">
                <h3 className="text-white text-sm font-medium truncate">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        {/* Scroll buttons */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}