import React from 'react';
import { QrCode, Shield, Phone, MapPin, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenScanner: () => void;
  onOpenAdmin: () => void;
  onOpenArenaQR: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenScanner,
  onOpenAdmin,
  onOpenArenaQR,
}) => {
  return (
    <footer className="bg-[#050706] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand lockup */}
          <div className="space-y-3 md:col-span-1">
            <span className="font-display text-2xl font-black text-white tracking-wide block">
              AANANDHA <span className="text-[#10ef67]">SPORTS SPACE</span>
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Premier multi-sport arena in Coimbatore featuring professional Box Cricket, 5-a-Side Football, and Pickleball courts under stadium floodlights.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenArenaQR}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[#10ef67] border border-neutral-800 rounded-lg text-xs font-mono transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Arena Smart QR</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="font-mono text-white text-xs font-bold uppercase tracking-wider block">
              SPORTS & ARENA
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#turfs" className="hover:text-[#10ef67] transition-colors">
                  Box Cricket Arena
                </a>
              </li>
              <li>
                <a href="#turfs" className="hover:text-[#10ef67] transition-colors">
                  5-a-Side & 7-a-Side Football
                </a>
              </li>
              <li>
                <a href="#turfs" className="hover:text-[#10ef67] transition-colors">
                  Pickleball Pro Court
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#10ef67] transition-colors">
                  Tariff & Morning Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <span className="font-mono text-white text-xs font-bold uppercase tracking-wider block">
              COIMBATORE LOCATION
            </span>
            <p className="leading-relaxed">
              23/1559, Palakkad–Coimbatore Road,<br />
              Near Rana Food, Aathupalam,<br />
              Coimbatore, Tamil Nadu 641008
            </p>
            <div className="pt-1 space-y-1 font-mono text-neutral-300">
              <p>Phone: +91 9566550790</p>
              <a
                href="https://instagram.com/aanandha_sports_space"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#10ef67] transition-colors block"
              >
                Instagram: @aanandha_sports_space
              </a>
            </div>
          </div>

          {/* Staff & Admin Access */}
          <div className="space-y-3">
            <span className="font-mono text-white text-xs font-bold uppercase tracking-wider block">
              GATE & ARENA STAFF
            </span>
            <p className="leading-relaxed text-[11px]">
              Authorized arena personnel can verify customer passes at gate check-in or manage hourly slot allocations.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#10ef67]" />
                <span>Gate QR Ticket Scanner</span>
              </button>
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10ef67]" />
                <span>Admin Management Console</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} AANANDHA SPORTS SPACE. All rights reserved. Aathupalam, Coimbatore.</p>
          <div className="flex items-center gap-4">
            <span>Play Big. Play Hard. Play Together.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
