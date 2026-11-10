import React from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      author: 'Kishore Kumar',
      role: 'Coimbatore Weekend Cricket Club',
      time: '2 weeks ago',
      rating: 5,
      content:
        'Easily the best turf near Aathupalam and Kuniyamuthur. The Philips floodlights are intensely bright without blinding batsman or fielders. Consistent ball bounce on the 35mm turf. We book 2-hour slots every Saturday night!',
      verified: true,
      sport: 'Box Cricket',
    },
    {
      id: 2,
      author: 'Mohammed Rizwan',
      role: 'FC Kovai Gunners',
      time: '1 month ago',
      rating: 5,
      content:
        'The 5-a-side football turf quality is outstanding! Synthetic grass is top-notch with perfect rubber infill — zero skin abrasions when sliding. The side rebound net makes the gameplay super fast and exciting.',
      verified: true,
      sport: '5-a-Side Football',
    },
    {
      id: 3,
      author: 'Deepika & Harish',
      role: 'Pickleball Enthusiasts',
      time: '3 weeks ago',
      rating: 5,
      content:
        'Finally a dedicated regulation pickleball court in south Coimbatore! The cushioned acrylic surface is very comfortable on knees, and the provided carbon fiber paddles are tournament standard. Great morning bonus offer too!',
      verified: true,
      sport: 'Pickleball',
    },
    {
      id: 4,
      author: 'Senthil Nathan',
      role: 'Tech Mahindra Squad',
      time: '2 months ago',
      rating: 4,
      content:
        'Prime location right on Palakkad-Coimbatore Road near Rana Food. Ample two-wheeler & car parking, clean drinking water, and changing space. Booking online through their website was effortless with instant QR tickets.',
      verified: true,
      sport: 'Corporate Match',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-[#080b09] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Official Google Review Rating Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10ef67] uppercase font-bold tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              PLAYER <span className="text-[#10ef67]">EXPERIENCES</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg">
              Rated 4.7 out of 5 stars by athletes, weekend squads, and corporate leagues across Coimbatore.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-6 p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
            <div className="text-center pr-6 border-r border-neutral-800">
              <span className="font-display text-5xl font-black text-white">4.7</span>
              <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                104 Google Reviews
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span>5★</span>
                <div className="w-24 sm:w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-amber-400 rounded-full" />
                </div>
                <span>88</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4★</span>
                <div className="w-24 sm:w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-amber-400 rounded-full" />
                </div>
                <span>12</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3★</span>
                <div className="w-24 sm:w-32 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="w-[3%] h-full bg-amber-400 rounded-full" />
                </div>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 bg-neutral-900/30 border border-neutral-800 rounded-2xl flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {r.author}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mt-0.5">
                      <span>{r.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{r.sport}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  "{r.content}"
                </p>
              </div>

              {/* Footer metadata */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                <span className="flex items-center gap-1 text-[#10ef67]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Google Review
                </span>
                <span>{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
