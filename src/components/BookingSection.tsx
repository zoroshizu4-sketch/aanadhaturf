import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Phone,
  Users,
  ShieldCheck,
  CreditCard,
  Flame,
} from 'lucide-react';
import { SportType, TimeSlot, Booking } from '../types';

interface BookingSectionProps {
  selectedSport: SportType;
  onSportChange: (sport: SportType) => void;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedSport,
  onSportChange,
  onBookingConfirmed,
}) => {
  // Generate next 14 calendar days
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6; // Fri, Sat, Sun
    return { dateStr, dayName, dayNum, month, isWeekend };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].dateStr);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [notes, setNotes] = useState('');
  const [extraEquipment, setExtraEquipment] = useState<string[]>([]);
  const [paymentOption, setPaymentOption] = useState<'arena' | 'upi'>('arena');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch live slots whenever sport or date changes
  useEffect(() => {
    let isCancelled = false;
    setLoadingSlots(true);
    setSelectedSlot(null);
    setErrorMessage(null);

    fetch(`/api/slots?sportId=${selectedSport}&date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.slots) {
          setSlots(data.slots);
        }
      })
      .catch((err) => {
        console.error('Failed to load slots:', err);
        if (!isCancelled) {
          setErrorMessage('Could not load slots from server. Please refresh.');
        }
      })
      .finally(() => {
        if (!isCancelled) setLoadingSlots(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedSport, selectedDate]);

  const toggleEquipment = (item: string) => {
    if (extraEquipment.includes(item)) {
      setExtraEquipment(extraEquipment.filter((x) => x !== item));
    } else {
      setExtraEquipment([...extraEquipment, item]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedSlot) {
      setErrorMessage('Please select an available time slot.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for ticket SMS/WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sportId: selectedSport,
          sportName:
            selectedSport === 'cricket'
              ? 'Box Cricket Arena'
              : selectedSport === 'football'
              ? '5-a-Side Football Turf'
              : 'Pickleball Pro Court',
          date: selectedDate,
          startHour: selectedSlot.startHour,
          timeSlot: selectedSlot.time,
          customerName: customerName.trim(),
          phone: phoneNumber.trim(),
          email: email.trim(),
          teamName: teamName.trim(),
          extraEquipment,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Booking could not be confirmed.');
      }

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10ef67', '#39ff84', '#ffffff', '#22c55e'],
        });
      } catch (err) {
        // ignore confetti errors in headless env
      }

      // Pass confirmed booking to parent to display digital QR ticket
      onBookingConfirmed(data.booking);

      // Refresh slots
      setSelectedSlot(null);
      setCustomerName('');
      setPhoneNumber('');
      setEmail('');
      setTeamName('');
      setNotes('');
      setExtraEquipment([]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sportEquipmentOptions: Record<SportType, string[]> = {
    cricket: ['Extra Match Tennis Ball (+₹50)', 'Premium Willow Bat rental (+₹100)', 'Wicketkeeper Gloves Set'],
    football: ['Extra Match Ball (+₹50)', 'Fluorescent Team Bibs Set', 'Goalkeeper Gloves'],
    pickleball: ['Extra Carbon Fiber Paddles (Set of 2)', 'Extra Tournament Balls (3x)', 'Court Score Flipboard'],
  };

  return (
    <section id="booking" className="py-24 bg-[#060807] border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-[#10ef67]/30 rounded-full text-xs font-mono text-[#10ef67]">
            <Flame className="w-3.5 h-3.5 text-[#10ef67]" />
            <span>Real-Time Turf Engine · Instant QR Gate Pass</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            BOOK YOUR <span className="text-[#10ef67]">MATCH SLOT</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Select sport, choose date, pick your hour, and receive your unique verified digital QR ticket instantly.
          </p>
        </div>

        {/* Multi-Step Booking Panel */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
          {/* STEP 1: SPORT SELECTION */}
          <div className="mb-8">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              STEP 1: SELECT ARENA / SPORT
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'cricket', name: '🏏 Box Cricket', sub: 'High bounce turf & safety nets' },
                { id: 'football', name: '⚽ 5-a-Side Football', sub: 'FIFA 50mm turf with rebound boards' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSportChange(s.id as SportType)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedSport === s.id
                      ? 'bg-neutral-900 border-[#10ef67] neon-glow-sm shadow-md'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <p className="font-display text-lg font-bold uppercase text-white">
                    {s.name}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{s.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: DATE PICKER (Scrollable 14 days) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#10ef67]" />
                STEP 2: SELECT DATE (NEXT 14 DAYS)
              </label>
              <span className="text-xs text-neutral-400 font-mono">
                {selectedDate}
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-800">
              {dateOptions.map((d) => (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(d.dateStr)}
                  className={`flex flex-col items-center justify-center min-w-[76px] py-3 px-2 rounded-2xl border transition-all ${
                    selectedDate === d.dateStr
                      ? 'bg-[#10ef67] text-black border-[#10ef67] neon-glow-sm scale-105'
                      : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <span className={`text-[11px] font-bold uppercase ${selectedDate === d.dateStr ? 'text-black/80' : 'text-neutral-400'}`}>
                    {d.dayName}
                  </span>
                  <span className="font-display text-2xl font-black mt-0.5">
                    {d.dayNum}
                  </span>
                  <span className={`text-[10px] uppercase font-mono ${selectedDate === d.dateStr ? 'text-black/90 font-bold' : d.isWeekend ? 'text-[#10ef67]' : 'text-neutral-500'}`}>
                    {d.isWeekend ? 'Wknd' : d.month}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: TIME SLOTS GRID WITH REAL-TIME AVAILABILITY */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#10ef67]" />
                STEP 3: SELECT HOURLY TIME SLOT (5:00 AM – 12:00 AM)
              </label>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10ef67]" /> Available
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Morning Bonus
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" /> Booked / Blocked
                </span>
              </div>
            </div>

            {loadingSlots ? (
              <div className="p-12 text-center bg-neutral-950/60 rounded-2xl border border-neutral-800 font-mono text-neutral-400 text-sm">
                Fetching real-time turf availability from arena server...
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.startHour === slot.startHour;
                  const isDisabled = !slot.isAvailable;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setSelectedSlot(slot)}
                      className={`relative p-3 rounded-xl border text-left transition-all ${
                        isDisabled
                          ? 'bg-neutral-950/40 border-neutral-800/60 text-neutral-600 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'bg-[#10ef67] text-black border-[#10ef67] neon-glow scale-[1.02] shadow-lg font-bold'
                          : 'bg-neutral-950/90 text-neutral-200 border-neutral-800 hover:border-[#10ef67]/60 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="font-bold">{slot.time}</span>
                        {slot.isMorningBonus && !isDisabled && !isSelected && (
                          <span className="text-[10px] text-amber-400 font-sans font-bold">Offer</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 text-xs">
                        {isDisabled ? (
                          <span className="font-mono text-[11px] text-red-400/80 font-bold uppercase">
                            {slot.isBlocked ? 'Blocked' : 'Booked'}
                          </span>
                        ) : (
                          <>
                            <span className="font-mono font-bold text-sm">
                              ₹{slot.price}
                            </span>
                            {slot.isMorningBonus && (
                              <span className={`text-[10px] line-through ${isSelected ? 'text-black/60' : 'text-neutral-500'}`}>
                                ₹{slot.originalPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* STEP 4: CUSTOMER DETAILS & INSTANT BOOKING SUBMIT */}
          {selectedSlot && (
            <form onSubmit={handleBookingSubmit} className="pt-8 border-t border-neutral-800 animate-fadeIn space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-950/80 rounded-2xl border border-neutral-800">
                <div>
                  <span className="text-xs font-mono uppercase text-[#10ef67] font-bold">Selected Session:</span>
                  <p className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {selectedSport === 'cricket' ? 'Box Cricket Arena' : selectedSport === 'football' ? '5-a-Side Football Turf' : 'Pickleball Pro Court'} · {selectedDate}
                  </p>
                  <p className="text-xs font-mono text-neutral-400">
                    Slot: {selectedSlot.time} ({selectedSlot.isMorningBonus ? 'Morning Bonus Rate' : 'Regular Slot'})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400 block">Total Due at Turf</span>
                  <span className="font-display text-3xl font-black text-[#10ef67]">
                    ₹{selectedSlot.price}
                  </span>
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                    YOUR FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vignesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#10ef67] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                    WHATSAPP / MOBILE NO. *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9842100000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#10ef67] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                    TEAM / CLUB NAME
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Kovai Strikers"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#10ef67] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Equipment Addons (Optional) */}
              <div>
                <label className="text-xs font-mono uppercase text-neutral-400 font-bold block mb-2">
                  ARENA EQUIPMENT & GEAR ADD-ONS (OPTIONAL)
                </label>
                <div className="flex flex-wrap gap-2">
                  {sportEquipmentOptions[selectedSport].map((equip) => (
                    <button
                      key={equip}
                      type="button"
                      onClick={() => toggleEquipment(equip)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        extraEquipment.includes(equip)
                          ? 'bg-[#10ef67]/20 border-[#10ef67] text-[#10ef67]'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {extraEquipment.includes(equip) ? '✓ ' : '+ '}
                      {equip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-xl flex items-center gap-3 text-red-300 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#10ef67]" />
                  <span>Atomic Double-Booking Guard Active · Instant QR Pass Generated</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] disabled:opacity-50 rounded-xl neon-glow transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Verifying Slot & Generating Ticket...</span>
                  ) : (
                    <span>Confirm Booking & Get QR Ticket (₹{selectedSlot.price})</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
