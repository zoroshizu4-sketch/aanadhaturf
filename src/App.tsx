/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SportsShowcase } from './components/SportsShowcase';
import { BookingSection } from './components/BookingSection';
import { PricingSection } from './components/PricingSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArenaQRCodeModal } from './components/ArenaQRCodeModal';
import { TicketModal } from './components/TicketModal';
import { StaffScannerModal } from './components/StaffScannerModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { SportType, Booking } from './types';

export default function App() {
  const [selectedSport, setSelectedSport] = useState<SportType>('cricket');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isArenaQRModalOpen, setIsArenaQRModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check URL hash for verify links (e.g. #verify=ASS-8812-CR)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('verify=')) {
        setIsScannerModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSportAndBook = (sportId: SportType) => {
    setSelectedSport(sportId);
    scrollToBooking();
  };

  const handleBookingConfirmed = (booking: Booking) => {
    setConfirmedBooking(booking);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060807] text-neutral-100 flex flex-col font-sans selection:bg-[#10ef67] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onBookClick={scrollToBooking}
        onOpenArenaQR={() => setIsArenaQRModalOpen(true)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={scrollToBooking}
          onOpenArenaQR={() => setIsArenaQRModalOpen(true)}
          onSelectSport={(sportId) => {
            setSelectedSport(sportId);
            scrollToBooking();
          }}
        />

        {/* Sports Showcases (Cricket, Football, Pickleball) */}
        <SportsShowcase onSelectSportAndBook={handleSelectSportAndBook} />

        {/* Real-Time Online Booking Engine */}
        <BookingSection
          selectedSport={selectedSport}
          onSportChange={(s) => setSelectedSport(s)}
          onBookingConfirmed={handleBookingConfirmed}
        />

        {/* Pricing & Morning Bonus Offer Section */}
        <PricingSection onBookClick={scrollToBooking} />

        {/* Photo & Video Gallery */}
        <GallerySection />

        {/* Google Reviews Section (4.7 Stars, 104 Reviews) */}
        <ReviewsSection />

        {/* Contact & Google Maps Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenScanner={() => setIsScannerModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenArenaQR={() => setIsArenaQRModalOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Official Branded Arena QR Code Modal */}
      <ArenaQRCodeModal
        isOpen={isArenaQRModalOpen}
        onClose={() => setIsArenaQRModalOpen(false)}
      />

      {/* 2. Confirmed Digital QR Ticket Modal */}
      <TicketModal
        booking={confirmedBooking}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* 3. Gate Staff QR Scanner Modal */}
      <StaffScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* 4. Secure Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
      />
    </div>
  );
}
