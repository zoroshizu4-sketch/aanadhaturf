import React from 'react';
import { Sparkles, Check, ArrowRight, Zap, Sun, Shield } from 'lucide-react';
import { SportType } from '../types';

interface PricingSectionProps {
  onBookClick: (sport?: SportType) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onBookClick }) => {
  return (
    <section id="pricing" className="py-24 bg-[#080b09] border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-[#10ef67]/30 rounded-full text-xs font-mono text-[#10ef67]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Arena Tariffs</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            SIMPLE, HONEST <span className="text-[#10ef67]">TURF PRICING</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            No hidden floodlight surcharges. Every booking includes full arena illumination, international turf access, and core match equipment.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {/* Card 1: Weekday Regular */}
          <div className="flex flex-col justify-between p-8 bg-neutral-900/40 border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-neutral-400">
                  Monday – Thursday
                </span>
                <span className="text-xs font-mono text-neutral-500">Regular Evening</span>
              </div>

              <div>
                <span className="font-display text-5xl font-black text-white">₹700</span>
                <span className="text-neutral-400 font-mono text-xs ml-1">/ hour</span>
              </div>

              <p className="text-xs text-neutral-300">
                Ideal for post-work friendly box cricket matches, corporate football practice, and evening turf sessions.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 pt-4 border-t border-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Full 200 LUX Philips floodlight coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Standard bats, balls & wickets included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Dressing area & RO mineral drinking water</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Instant verified digital QR gate pass</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onBookClick()}
              className="mt-8 w-full py-3.5 px-4 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700 hover:border-neutral-600 font-sans"
            >
              Book Weekday Slot
            </button>
          </div>

          {/* Card 2: Featured Weekend Prime (Highlight) */}
          <div className="relative flex flex-col justify-between p-8 bg-neutral-900/90 border-2 border-[#10ef67] rounded-3xl neon-glow transition-all scale-100 md:scale-105 shadow-2xl">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#10ef67] text-black font-extrabold font-mono text-[11px] uppercase tracking-wider rounded-full shadow-md">
              Most Popular Arena Time
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#10ef67]">
                  Friday – Sunday
                </span>
                <span className="text-xs font-mono text-neutral-300">Peak Weekend</span>
              </div>

              <div>
                <span className="font-display text-5xl font-black text-white">₹850</span>
                <span className="text-neutral-400 font-mono text-xs ml-1">/ hour</span>
              </div>

              <p className="text-xs text-neutral-200">
                Coimbatore's favorite weekend battleground for competitive tournaments, squad face-offs, and late-night fixtures.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-200 pt-4 border-t border-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Peak weekend stadium atmosphere</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Priority scoreboard access & referee whistle</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Choice of Box Cricket or 5-a-Side Football</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Team bibs & match-grade football/balls</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onBookClick()}
              className="mt-8 w-full py-4 px-4 bg-[#10ef67] hover:bg-[#39ff84] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-sans neon-glow-sm"
            >
              Book Weekend Prime
            </button>
          </div>

          {/* Card 3: Special Morning Bonus Offer */}
          <div className="flex flex-col justify-between p-8 bg-neutral-900/40 border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sun className="w-4 h-4" /> 5 AM – 5 PM Daily
                </span>
                <span className="text-xs font-mono text-amber-400/90 font-bold">BONUS OFFER</span>
              </div>

              <div>
                <span className="font-display text-5xl font-black text-white">₹600</span>
                <span className="text-neutral-400 font-mono text-xs ml-1">/ hour (Save ₹100)</span>
              </div>

              <p className="text-xs text-neutral-300">
                Special discounted daytime rate! Enjoy crisp morning breezes and fitness drills at maximum value.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 pt-4 border-t border-neutral-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Automatic ₹100 discount applied in booking engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Perfect for morning fitness & student squad practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>All sports eligible: Cricket, Football, Pickleball</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10ef67] shrink-0" />
                  <span>Pickleball available from just ₹500/hr</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onBookClick()}
              className="mt-8 w-full py-3.5 px-4 bg-neutral-800 hover:bg-neutral-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700 hover:border-neutral-600 font-sans"
            >
              Grab Morning Bonus Slot
            </button>
          </div>
        </div>

        {/* Corporate & Tournament Banner */}
        <div className="p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono text-[#10ef67] font-bold uppercase tracking-wider">
              TOURNAMENTS & CORPORATE LEAGUES
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Planning a Multi-Team Cup or Company Sports Day?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Custom multi-hour bulk bookings with dedicated umpire, continuous refreshments, live PA system, and customized trophy presentations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:9566550790"
              className="px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-xl font-sans neon-glow-sm"
            >
              Call Manager: 9566550790
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
