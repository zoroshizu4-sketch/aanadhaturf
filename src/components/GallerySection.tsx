import React, { useState } from 'react';
import { Play, Eye, X, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cricket' | 'football' | 'pickleball' | 'night'>('all');
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    title: string;
    caption: string;
    isVideo?: boolean;
  } | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: 'night',
      title: 'Full Arena Floodlight Panorama',
      caption: 'Spectacular 200 LUX Philips sports illumination over Aanandha Sports Space',
      url: '/src/assets/images/hero_turf_night_1794328244570.jpg',
      aspect: 'col-span-1 md:col-span-2 aspect-[16/9]',
      isVideo: false,
    },
    {
      id: 2,
      category: 'cricket',
      title: 'Box Cricket Night Match',
      caption: 'High-bounce pitch markings and high-tension safety netting',
      url: '/src/assets/images/cricket_turf_action_1794328244883.jpg',
      aspect: 'col-span-1 aspect-[4/3]',
      isVideo: false,
    },
    {
      id: 3,
      category: 'football',
      title: '5-a-Side Football Arena',
      caption: 'FIFA-standard 50mm synthetic grass with perimeter rebound boards',
      url: '/src/assets/images/football_turf_arena_1794328246045.jpg',
      aspect: 'col-span-1 aspect-[4/3]',
      isVideo: false,
    },
    {
      id: 4,
      category: 'pickleball',
      title: 'Pickleball Pro Court & Paddles',
      caption: 'Regulation tournament court with 8-coat acrylic cushioning',
      url: '/src/assets/images/pickleball_court_modern_1794328247429.jpg',
      aspect: 'col-span-1 aspect-[4/3]',
      isVideo: false,
    },
    {
      id: 5,
      category: 'night',
      title: 'Aerial Arena Complex View',
      caption: 'State-of-the-art sports complex glowing brightly under the Coimbatore night sky',
      url: '/src/assets/images/turf_drone_aerial_1794328246122.jpg',
      aspect: 'col-span-1 md:col-span-2 aspect-[16/9]',
      isVideo: true,
    },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#060807] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#10ef67]">
              ARENA VISUAL EXPERIENCE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              TURF <span className="text-[#10ef67]">GALLERY</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg">
              Cinematic glimpses of evening tournaments, match thrill, and world-class turf maintenance.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Photos & Drone' },
              { id: 'cricket', label: 'Cricket' },
              { id: 'football', label: 'Football' },
              { id: 'pickleball', label: 'Pickleball' },
              { id: 'night', label: 'Night Arena' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-[#10ef67] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className={`group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer ${item.aspect}`}
            >
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Center icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#10ef67] text-black flex items-center justify-center neon-glow shadow-lg transform group-hover:scale-110 transition-transform">
                  {item.isVideo ? <Play className="w-5 h-5 fill-black ml-0.5" /> : <Eye className="w-5 h-5" />}
                </div>
              </div>

              {/* Title & Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-lg font-bold uppercase text-white group-hover:text-[#10ef67] transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-300 font-mono mt-0.5 truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#0a0e0c] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 p-2 text-white bg-black/60 rounded-full hover:bg-neutral-800 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] bg-black">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {selectedMedia.title}
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {selectedMedia.caption}
                </p>
              </div>

              <div className="text-xs font-mono text-[#10ef67] border border-[#10ef67]/30 px-3 py-1 rounded-full">
                Aanandha Sports Space · Aathupalam
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
