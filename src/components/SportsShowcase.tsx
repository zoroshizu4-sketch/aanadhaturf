import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity, Users, Award } from 'lucide-react';
import { SportType } from '../types';

interface SportsShowcaseProps {
  onSelectSportAndBook: (sportId: SportType) => void;
}

export const SportsShowcase: React.FC<SportsShowcaseProps> = ({
  onSelectSportAndBook,
}) => {
  const [activeTab, setActiveTab] = useState<SportType>('cricket');

  const sportsData: Record<
    SportType,
    {
      title: string;
      tagline: string;
      description: string;
      image: string;
      dimensions: string;
      capacity: string;
      lighting: string;
      turfType: string;
      features: string[];
      equipment: string[];
      rulesHighlights: string[];
      rateSnippet: string;
    }
  > = {
    cricket: {
      title: 'Box Cricket Arena',
      tagline: 'High-Tension Enclosure & High-Density Astro Pitch',
      description:
        'Engineered for maximum hitting and lightning-fast reactions. Features 360° roof-to-ground shock-absorbent netting so the ball never leaves play. The specially selected 35mm monofilament turf provides consistent bounce for seamers and spinners alike.',
      image: '/src/assets/images/cricket_turf_action_1794328244883.jpg',
      dimensions: '100 ft × 50 ft with 28 ft clear vertical play height',
      capacity: 'Up to 16 Players (6v6 to 8v8)',
      lighting: '200+ LUX Philips LED Sports Arena Towers',
      turfType: '35mm High-Density Monofilament with Dual Shock Pad',
      features: [
        'Regulation pitch markings and calibrated batting creases',
        '360° anti-tear nylon boundary nets with zero rebound blindspots',
        'Even bounce calibrated for tennis & hard synthetic cricket balls',
        'Full floodlight coverage with zero shadow rings during evening overs',
      ],
      equipment: [
        'English & Kashmir Willow box cricket bats',
        'Synthetic cricket tennis balls & heavy wind balls',
        'Heavy metal base spring stumps & bails',
        'Umpire score counter & leg pads available on demand',
      ],
      rulesHighlights: [
        'Direct hit roof netting: 1 run or live ball (house rules customizable)',
        'Straight boundary fence: 4 / 6 runs',
        'One-tip one-hand catches allowed by consensus',
      ],
      rateSnippet: '₹700 weekdays / ₹850 weekends · Morning offer ₹600',
    },
    football: {
      title: '5-a-Side & 7-a-Side Football Turf',
      tagline: 'FIFA-Standard Synthetic Pitch with Rebound Barriers',
      description:
        'Feel the speed of European five-a-side futsal right here in Coimbatore. Our 50mm non-abrasive turf features cryogenic rubber granulate for realistic slide tackles without skin burns. Continuous side rebound boards keep the ball moving at high tempo.',
      image: '/src/assets/images/football_turf_arena_1794328246045.jpg',
      dimensions: '110 ft × 65 ft with enclosed rebound netting',
      capacity: 'Up to 14 Players (5v5 or 7v7)',
      lighting: 'Multi-mast floodlighting with anti-glare diffusers',
      turfType: '50mm FIFA-Quality Artificial Grass with SBR infill',
      features: [
        'High-absorption sub-base reducing knee and joint impact',
        'Reinforced lower perimeter rebound barriers for off-the-wall play',
        'Heavy-duty regulation mini-football goals with deep netting',
        'All-weather quick-dry drainage — play uninterrupted even after rain',
      ],
      equipment: [
        'FIFA-approved match footballs (Size 5 & low-bounce futsal size 4)',
        'Fluorescent team jersey bibs (Neon Yellow & Crimson sets)',
        'Padded tournament goalkeeper gloves',
        'Corner flags and automated match scoreboard',
      ],
      rulesHighlights: [
        'Kick-ins from perimeter lines or continuous rebound wall play',
        'Penalty spot designated at 6 meters',
        'Goalkeeper distribution under waist height',
      ],
      rateSnippet: '₹700 weekdays / ₹850 weekends · Morning offer ₹600',
    },
    pickleball: {
      title: 'Pickleball Pro Court',
      tagline: 'Dedicated Regulation Tournament Court with Pro Cushion',
      description:
        'Coimbatore’s fastest growing sport! A dedicated, permanent regulation pickleball court engineered with an 8-layer acrylic cushion system that is gentle on joints while providing crisp, true bounce for dinks and smashes.',
      image: '/src/assets/images/pickleball_court_modern_1794328247429.jpg',
      dimensions: '44 ft × 20 ft with 7 ft non-volley kitchen zone',
      capacity: '2 to 4 Players (Singles or Doubles)',
      lighting: 'Even-spread side LED luminaires calibrated for high-speed balls',
      turfType: '8-Layer Multi-Sport Cushioned Acrylic Surface',
      features: [
        'Official USAPA tournament court dimensions and crisp white lines',
        '7-foot Non-Volley Zone (The Kitchen) clearly mapped out',
        'Heavy-gauge tournament steel post and tension-lock net system',
        'Anti-glare twilight floodlights positioned to avoid overhead blinding',
      ],
      equipment: [
        '4x USAPA-approved Carbon Fiber pickleball paddles',
        'High-visibility 40-hole outdoor neon yellow balls',
        'Pickleball ball retriever hopper for continuous drill sessions',
        'Beginner rulebook guide and referee score flip card',
      ],
      rulesHighlights: [
        'Underhand serve must clear the kitchen zone diagonally',
        'Two-bounce rule on serve and return',
        'No volleying while standing inside the 7 ft kitchen zone',
      ],
      rateSnippet: '₹600 weekdays / ₹750 weekends · Morning offer ₹500',
    },
  };

  const currentSport = sportsData[activeTab];

  return (
    <section id="turfs" className="py-24 bg-[#080b09] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#10ef67] font-mono">
            ENGINEERED FOR SERIOUS ATHLETES
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            THREE ARENAS. <span className="text-[#10ef67]">ZERO COMPROMISES.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            From cricket under the floodlights to fast-paced five-a-side football and high-energy pickleball rallies, experience professional-grade turf infrastructure built to international standards.
          </p>
        </div>

        {/* Sport Switcher Segmented Control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-neutral-900/90 rounded-2xl border border-neutral-800 gap-1.5 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('cricket')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'cricket'
                  ? 'bg-[#10ef67] text-black neon-glow-sm shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              🏏 Box Cricket
            </button>
            <button
              onClick={() => setActiveTab('football')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'football'
                  ? 'bg-[#10ef67] text-black neon-glow-sm shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              ⚽ Football (5v5 & 7v7)
            </button>
            <button
              onClick={() => setActiveTab('pickleball')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === 'pickleball'
                  ? 'bg-[#10ef67] text-black neon-glow-sm shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              🏓 Pickleball Court
            </button>
          </div>
        </div>

        {/* Marquee Sport Presentation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow in corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#10ef67]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Left: Visual Asset & Quick Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 group aspect-[4/3] bg-neutral-950">
              <img
                src={currentSport.image}
                alt={`${currentSport.title} at Aanandha Sports Space`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-neutral-700">
                  {currentSport.dimensions}
                </span>
                <span className="font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-neutral-700 text-[#10ef67]">
                  {currentSport.lighting}
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">Max Capacity</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{currentSport.capacity}</span>
              </div>
              <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">Surface Tech</span>
                <span className="text-sm font-bold text-[#10ef67] mt-0.5 block truncate">{currentSport.turfType.split(' ')[0]} Pro Turf</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 bg-neutral-950/80 rounded-xl border border-neutral-800">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block">Rate Guide</span>
                <span className="text-sm font-bold text-white mt-0.5 block font-mono">₹700 / ₹850 hr</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Content & Booking Action */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-[#10ef67] uppercase">
                  {currentSport.tagline}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white mt-1">
                  {currentSport.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {currentSport.description}
              </p>

              {/* Arena Specifications */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  TURF SPECIFICATIONS
                </h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {currentSport.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10ef67] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment Provided */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  EQUIPMENT INCLUDED WITH BOOKING
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {currentSport.equipment.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2 bg-neutral-950/60 rounded-lg border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10ef67]" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Booking CTA for this sport */}
            <div className="pt-4 border-t border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Standard Slot:</span>
                <span className="text-white font-bold">{currentSport.rateSnippet}</span>
              </div>
              <button
                onClick={() => onSelectSportAndBook(activeTab)}
                className="w-full py-4 px-6 text-sm font-extrabold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-xl neon-glow transition-all hover:scale-[1.01] flex items-center justify-center gap-3 shadow-lg"
              >
                <span>Select & Book {currentSport.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
