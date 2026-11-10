import React from 'react';
import { ArrowRight, QrCode, Sparkles, MapPin, Clock, Star, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onOpenArenaQR: () => void;
  onSelectSport: (sportId: 'cricket' | 'football' | 'pickleball') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onOpenArenaQR,
  onSelectSport,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#060807] border-b border-neutral-800">
      {/* Background Cinematic Image with deep dark scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_turf_night_1794328244570.jpg"
          alt="Aanandha Sports Space Floodlit Turf Arena at Night"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 opacity-40 mix-blend-screen"
        />
        {/* Measured dark gradient scrims for maximum contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-[#060807]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060807] via-[#060807]/70 to-[#060807]/40" />
        {/* Neon sports lighting glow accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#10ef67]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Location & Trust Kicker (Natural unboxed text separator) */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-400">
            <span className="flex items-center gap-1.5 text-[#10ef67]">
              <MapPin className="w-4 h-4" /> Aathupalam, Coimbatore
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-4 h-4 text-emerald-400" /> 5:00 AM – 12:00 AM Daily
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1 text-amber-400 font-mono">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.7★ (104 Reviews)
            </span>
          </div>

          {/* Core User Mandated Headline: PLAY BIG. PLAY HARD. PLAY TOGETHER. */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] text-balance">
            PLAY BIG. <br />
            <span className="text-[#10ef67] neon-glow-text">PLAY HARD.</span> <br />
            PLAY TOGETHER.
          </h1>

          {/* Subtitle Value Proposition */}
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
            Coimbatore’s premier floodlit multi-sport arena for <strong className="text-white font-semibold">Box Cricket</strong>, <strong className="text-white font-semibold">5-a-Side Football</strong>, and <strong className="text-white font-semibold">Pickleball</strong>. Book real-time hourly slots with instant QR gate passes and zero double-booking.
          </p>

          {/* Pricing Highlight Strip */}
          <div className="inline-flex flex-wrap items-center gap-3 p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl backdrop-blur-sm text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Mon–Thu:</span>
              <span className="text-white font-bold font-mono text-base">₹700/hr</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Fri–Sun:</span>
              <span className="text-white font-bold font-mono text-base">₹850/hr</span>
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5 text-[#10ef67] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Morning Bonus 5 AM–5 PM (Save ₹100/hr)</span>
            </div>
          </div>

          {/* Primary Action Zone */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onBookClick}
              className="px-8 py-4 text-base font-extrabold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-xl neon-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 shadow-lg"
            >
              <span>Book Your Turf Slot</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenArenaQR}
              className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-neutral-200 bg-neutral-900/80 hover:bg-neutral-850 hover:text-white rounded-xl border border-neutral-700/70 hover:border-[#10ef67]/50 transition-all flex items-center gap-2.5 backdrop-blur-sm"
            >
              <QrCode className="w-5 h-5 text-[#10ef67]" />
              <span>Get Branded Arena QR</span>
            </button>
          </div>

          {/* Sport Selector Shortcuts */}
          <div className="pt-4 flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Direct booking:</span>
            <button
              onClick={() => {
                onSelectSport('cricket');
                onBookClick();
              }}
              className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-[#10ef67] border border-neutral-800 rounded transition-colors"
            >
              🏏 Box Cricket
            </button>
            <button
              onClick={() => {
                onSelectSport('football');
                onBookClick();
              }}
              className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-[#10ef67] border border-neutral-800 rounded transition-colors"
            >
              ⚽ Football
            </button>
            <button
              onClick={() => {
                onSelectSport('pickleball');
                onBookClick();
              }}
              className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-[#10ef67] border border-neutral-800 rounded transition-colors"
            >
              🏓 Pickleball
            </button>
          </div>
        </div>

        {/* 4-Item Proof & Facilities Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/80">
          <div className="p-4 bg-neutral-900/40 border border-neutral-800/60 rounded-xl">
            <p className="text-2xl sm:text-3xl font-black font-display text-white">3 TURFS</p>
            <p className="text-xs text-neutral-400 mt-1">Cricket, Football & Pickleball courts</p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/60 rounded-xl">
            <p className="text-2xl sm:text-3xl font-black font-display text-[#10ef67]">200+ LUX</p>
            <p className="text-xs text-neutral-400 mt-1">Philips anti-glare arena floodlights</p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/60 rounded-xl">
            <p className="text-2xl sm:text-3xl font-black font-display text-white">DIGITAL QR</p>
            <p className="text-xs text-neutral-400 mt-1">Instant verified gate pass on every slot</p>
          </div>

          <div className="p-4 bg-neutral-900/40 border border-neutral-800/60 rounded-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <span className="text-2xl sm:text-3xl font-black font-display text-white">4.7 / 5.0</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">104 verified Google customer reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};
