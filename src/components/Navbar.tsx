import React, { useState } from 'react';
import { Menu, X, QrCode, Shield, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenScanner: () => void;
  onOpenAdmin: () => void;
  onOpenArenaQR: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScanner,
  onOpenAdmin,
  onOpenArenaQR,
  onBookClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Turfs & Arena', href: '#turfs' },
    { label: 'Pricing & Offers', href: '#pricing' },
    { label: 'Book Slot', href: '#booking' },
    { label: 'Reviews (4.7★)', href: '#reviews' },
    { label: 'Location & Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070908]/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in athletic display face */}
        <a
          href="#"
          className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#10ef67] neon-glow group-hover:scale-125 transition-transform" />
          <span>AANANDHA <span className="text-[#10ef67]">SPORTS SPACE</span></span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold tracking-wide text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#10ef67] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#10ef67]/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Arena QR Button */}
          <button
            onClick={onOpenArenaQR}
            title="Scan or Share Website & Booking QR Code"
            className="p-2 text-neutral-400 hover:text-[#10ef67] hover:bg-neutral-800/60 rounded-lg transition-colors border border-neutral-800 flex items-center gap-1.5 text-xs font-mono"
          >
            <QrCode className="w-4 h-4 text-[#10ef67]" />
            <span className="hidden sm:inline">Arena QR</span>
          </button>

          {/* Staff Scanner & Admin trigger */}
          <button
            onClick={onOpenScanner}
            title="Gate Staff QR Scanner for Ticket Check-in"
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-colors border border-neutral-800 flex items-center gap-1.5 text-xs font-mono"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Staff / Admin</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onBookClick}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-lg neon-glow transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            Book Slot
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d0b] border-b border-neutral-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-neutral-200 hover:text-[#10ef67] hover:bg-neutral-900 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArenaQR();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700/60"
            >
              <QrCode className="w-4 h-4 text-[#10ef67]" />
              Scan & Share Arena QR Code
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScanner();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-700/60"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              Gate Staff Ticket Scanner & Admin
            </button>
            <a
              href="tel:9566550790"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-300 bg-neutral-900 rounded-lg border border-neutral-800"
            >
              <Phone className="w-4 h-4 text-[#10ef67]" />
              Call Turf: +91 9566550790
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
