import React from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  Clock,
  Navigation,
  Car,
  Droplets,
  Lightbulb,
  Shield,
  MessageCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const address = '23/1559, Palakkad–Coimbatore Road, Near Rana Food, Aathupalam, Coimbatore, Tamil Nadu 641008';
  const phone = '9566550790';
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Aanandha Sports Space Palakkad-Coimbatore Road Aathupalam Coimbatore')}`;

  const amenities = [
    { icon: Lightbulb, title: '200 LUX Arena Lights', desc: 'Philips anti-glare sports floodlights' },
    { icon: Car, title: 'Spacious Parking', desc: 'Secure parking for cars & bikes' },
    { icon: Droplets, title: 'Drinking Water & Cafe', desc: 'Chilled RO water & sports refreshments' },
    { icon: Shield, title: 'Dressing & First Aid', desc: 'Separate changing rooms & emergency kit' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#060807] border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <p className="text-xs font-mono font-bold tracking-widest uppercase text-[#10ef67]">
            FIND YOUR TURF
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            LOCATION & <span className="text-[#10ef67]">CONTACT</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Conveniently situated on the main Palakkad–Coimbatore highway at Aathupalam, minutes from Ukkadam and Kuniyamuthur.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact & Amenities, Right Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business Info & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 sm:p-8">
            <div className="space-y-6">
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#10ef67] shrink-0 neon-glow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase font-bold text-[#10ef67] tracking-wider">
                    ARENA LOCATION
                  </h3>
                  <p className="text-sm font-semibold text-white mt-1 leading-snug">
                    {address}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Landmark: Near Rana Food, Palakkad–Coimbatore Main Road
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#10ef67] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase font-bold text-[#10ef67] tracking-wider">
                    PHONE & WHATSAPP
                  </h3>
                  <a
                    href={`tel:${phone}`}
                    className="text-lg font-bold font-mono text-white hover:text-[#10ef67] transition-colors block mt-0.5"
                  >
                    +91 {phone}
                  </a>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Available for slot queries, tournament bookings & academy registration
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#10ef67] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase font-bold text-[#10ef67] tracking-wider">
                    ARENA OPERATING HOURS
                  </h3>
                  <p className="text-sm font-bold text-white mt-1">
                    05:00 AM – 12:00 AM (Midnight)
                  </p>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Open 7 Days a Week, 365 Days a Year
                  </p>
                </div>
              </div>

              {/* Instagram Handle */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#10ef67] shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase font-bold text-[#10ef67] tracking-wider">
                    OFFICIAL INSTAGRAM
                  </h3>
                  <a
                    href="https://instagram.com/aanandha_sports_space"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-white hover:text-[#10ef67] transition-colors block mt-0.5 font-mono"
                  >
                    @aanandha_sports_space
                  </a>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Follow for tournament clips, player reels & match photo drops
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-4 border-t border-neutral-800 grid grid-cols-2 gap-3">
              <a
                href={`tel:${phone}`}
                className="py-3 px-4 bg-[#10ef67] hover:bg-[#39ff84] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 neon-glow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Arena</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent('Hi Aanandha Sports Space! I would like to inquire about turf slot booking.')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#10ef67]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps & Arena Amenities */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Embedded Interactive Map */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 h-80 sm:h-96 shadow-xl">
              <iframe
                title="Aanandha Sports Space Location Map, Aathupalam Coimbatore"
                src="https://maps.google.com/maps?q=Palakkad-Coimbatore+Road+Aathupalam+Coimbatore+641008&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert contrast-125 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Direction Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 bg-[#080c09]/95 border border-neutral-800 p-3 rounded-2xl backdrop-blur-md shadow-2xl">
                <div>
                  <p className="font-display text-sm font-bold text-white uppercase">
                    Aathupalam, Coimbatore
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Near Rana Food, Palakkad Rd
                  </p>
                </div>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#10ef67] hover:bg-[#39ff84] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Arena Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-neutral-900/40 border border-neutral-800 rounded-2xl flex flex-col items-center text-center space-y-1.5"
                >
                  <item.icon className="w-5 h-5 text-[#10ef67]" />
                  <span className="font-bold text-xs text-white block">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono block leading-tight">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
