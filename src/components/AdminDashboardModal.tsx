import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  DollarSign,
  Calendar,
  Users,
  Settings,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Trash2,
  Filter,
} from 'lucide-react';
import { Booking, PricingSettings, SportType } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScanner: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenScanner,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'slots' | 'pricing' | 'stats'>('bookings');

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Stats state
  const [stats, setStats] = useState<any>(null);

  // Pricing settings state
  const [pricing, setPricing] = useState<PricingSettings>({
    weekdayRate: 700,
    weekendRate: 850,
    morningBonusDiscount: 100,
    pickleballWeekdayRate: 600,
    pickleballWeekendRate: 750,
    adminPin: '9566',
  });
  const [pricingSaved, setPricingSaved] = useState(false);

  // Slot blocking state
  const [blockSport, setBlockSport] = useState<SportType>('cricket');
  const [blockDate, setBlockDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [blockHour, setBlockHour] = useState<number>(14);
  const [blockReason, setBlockReason] = useState<string>('Turf Maintenance & Grooming');
  const [blockMessage, setBlockMessage] = useState<string | null>(null);

  // Fetch admin data once authenticated
  const loadAdminData = async () => {
    try {
      setLoadingBookings(true);
      const [bookingsRes, statsRes, settingsRes] = await Promise.all([
        fetch(`/api/admin/bookings?search=${encodeURIComponent(searchQuery)}&sportId=${filterSport}&status=${filterStatus}`),
        fetch('/api/admin/stats'),
        fetch('/api/admin/settings'),
      ]);

      const [bookingsData, statsData, settingsData] = await Promise.all([
        bookingsRes.json(),
        statsRes.json(),
        settingsRes.json(),
      ]);

      if (bookingsData.bookings) setBookings(bookingsData.bookings);
      if (statsData.stats) setStats(statsData.stats);
      if (settingsData.settings) setPricing((prev) => ({ ...prev, ...settingsData.settings }));
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadAdminData();
    }
  }, [isAuthenticated, isOpen, filterSport, filterStatus]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === '9566' || enteredPin === pricing.adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/bookings/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          status: newStatus,
          pin: '9566',
        }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
        );
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setPricingSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...pricing,
          pin: '9566',
        }),
      });

      if (res.ok) {
        setPricingSaved(true);
        setTimeout(() => setPricingSaved(false), 3000);
      }
    } catch (err) {
      alert('Failed to save pricing');
    }
  };

  const handleBlockSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlockMessage(null);

    try {
      const res = await fetch('/api/admin/slots/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sportId: blockSport,
          date: blockDate,
          startHour: blockHour,
          reason: blockReason,
          pin: '9566',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setBlockMessage(`Slot ${blockHour}:00 - ${blockHour + 1}:00 on ${blockDate} successfully reserved/blocked.`);
      } else {
        alert(data.error || 'Failed to block slot');
      }
    } catch (err) {
      alert('Error blocking slot');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-6 bg-[#0a0e0c] border border-neutral-800 rounded-3xl p-6 sm:p-8 neon-glow overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors z-20"
          aria-label="Close Admin Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PIN LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-sm mx-auto my-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-[#10ef67]/40 flex items-center justify-center text-[#10ef67] mx-auto neon-glow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                ARENA <span className="text-[#10ef67]">ADMIN CONSOLE</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Enter security PIN to manage bookings, slots & pricing.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter 4-digit PIN (9566)"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl bg-neutral-950 border border-neutral-800 focus:border-[#10ef67] rounded-xl py-3 text-white focus:outline-none"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 font-mono mt-1.5">
                    Invalid PIN. Default manager PIN is 9566.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#10ef67] hover:bg-[#39ff84] text-black font-extrabold uppercase tracking-wider rounded-xl transition-all neon-glow font-sans text-sm"
              >
                Unlock Management Console
              </button>
            </form>

            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Coimbatore Turf Admin · Secure Session
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex flex-col flex-1 overflow-hidden space-y-6">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#10ef67]/40 flex items-center justify-center text-[#10ef67]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-black uppercase text-white">
                    AANANDHA <span className="text-[#10ef67]">MANAGEMENT</span>
                  </h2>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Aathupalam Arena · Live Database Connected
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                    activeTab === 'bookings'
                      ? 'bg-[#10ef67] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab('slots')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                    activeTab === 'slots'
                      ? 'bg-[#10ef67] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Slot Control
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                    activeTab === 'pricing'
                      ? 'bg-[#10ef67] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                    activeTab === 'stats'
                      ? 'bg-[#10ef67] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Revenue
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenScanner();
                  }}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[#10ef67] text-xs font-mono font-bold rounded-lg border border-neutral-800 transition-colors"
                >
                  Gate Scanner Desk ↗
                </button>
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto pr-1">
              {/* TAB 1: ALL BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search by customer name, phone, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && loadAdminData()}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#10ef67]"
                      />
                    </div>

                    <select
                      value={filterSport}
                      onChange={(e) => setFilterSport(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="all">All Sports</option>
                      <option value="cricket">Cricket</option>
                      <option value="football">Football</option>
                      <option value="pickleball">Pickleball</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Used">Used (Checked in)</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={loadAdminData}
                      className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 rounded-xl border border-neutral-800"
                    >
                      Refresh
                    </button>
                  </div>

                  {/* Bookings Table */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-neutral-800 bg-neutral-900/50 text-neutral-400 font-mono">
                            <th className="py-3 px-4">BOOKING ID</th>
                            <th className="py-3 px-4">PLAYER / TEAM</th>
                            <th className="py-3 px-4">SPORT</th>
                            <th className="py-3 px-4">DATE & SLOT</th>
                            <th className="py-3 px-4">AMOUNT</th>
                            <th className="py-3 px-4">STATUS</th>
                            <th className="py-3 px-4 text-right">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900 font-mono">
                          {bookings.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-neutral-500">
                                {loadingBookings ? 'Loading live bookings...' : 'No bookings found.'}
                              </td>
                            </tr>
                          ) : (
                            bookings.map((b) => (
                              <tr key={b.id} className="hover:bg-neutral-900/30 transition-colors">
                                <td className="py-3 px-4 font-bold text-white select-all">
                                  {b.id}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-sans font-semibold text-white">
                                    {b.customerName}
                                  </div>
                                  <div className="text-[11px] text-neutral-400">
                                    {b.phone} {b.teamName ? `· ${b.teamName}` : ''}
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-sans text-neutral-300">
                                  {b.sportName}
                                </td>
                                <td className="py-3 px-4">
                                  <div>{b.date}</div>
                                  <div className="text-[#10ef67]">{b.timeSlot}</div>
                                </td>
                                <td className="py-3 px-4 font-bold text-white">
                                  ₹{b.totalAmount}
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                      b.status === 'Confirmed'
                                        ? 'bg-[#10ef67]/20 text-[#10ef67]'
                                        : b.status === 'Used'
                                        ? 'bg-blue-950 text-blue-300'
                                        : 'bg-red-950 text-red-300'
                                    }`}
                                  >
                                    {b.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <select
                                    value={b.status}
                                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                    className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-[11px] text-neutral-200 focus:outline-none"
                                  >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Used">Mark Used</option>
                                    <option value="Cancelled">Cancel</option>
                                  </select>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SLOT CONTROL & BLOCKING */}
              {activeTab === 'slots' && (
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
                    <h3 className="font-display text-xl font-bold uppercase text-white">
                      RESERVE / BLOCK TURF SLOT
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Block specific time slots for turf infill grooming, academy coaching sessions, or private corporate tournaments.
                    </p>

                    <form onSubmit={handleBlockSlot} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                          SELECT SPORT
                        </label>
                        <select
                          value={blockSport}
                          onChange={(e) => setBlockSport(e.target.value as SportType)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="cricket">Box Cricket</option>
                          <option value="football">Football Turf</option>
                          <option value="pickleball">Pickleball Court</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                          DATE
                        </label>
                        <input
                          type="date"
                          value={blockDate}
                          onChange={(e) => setBlockDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                          START HOUR
                        </label>
                        <select
                          value={blockHour}
                          onChange={(e) => setBlockHour(parseInt(e.target.value, 10))}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        >
                          {Array.from({ length: 19 }).map((_, idx) => {
                            const h = 5 + idx;
                            return (
                              <option key={h} value={h}>
                                {h.toString().padStart(2, '0')}:00 - {(h + 1 === 24 ? '00' : (h + 1).toString().padStart(2, '0'))}:00
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                          REASON
                        </label>
                        <input
                          type="text"
                          value={blockReason}
                          onChange={(e) => setBlockReason(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                          placeholder="Maintenance / Tournament"
                        />
                      </div>

                      <div className="sm:col-span-2 lg:col-span-4 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase rounded-xl transition-all font-mono"
                        >
                          Block / Reserve Slot
                        </button>
                      </div>
                    </form>

                    {blockMessage && (
                      <div className="p-3 bg-[#10ef67]/20 border border-[#10ef67] rounded-xl text-xs text-[#10ef67] font-mono">
                        {blockMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: DYNAMIC PRICING CONFIGURATION */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <form onSubmit={handleSavePricing} className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-6">
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase text-white">
                        DYNAMIC PRICING & PROMOTIONAL OFFERS
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Configure hourly rates for weekdays (Mon–Thu), weekends (Fri–Sun), and the morning bonus promotion (5 AM–5 PM).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                          WEEKDAY BASE RATE (MON–THU)
                        </label>
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                          <span className="text-neutral-500 font-mono mr-2">₹</span>
                          <input
                            type="number"
                            value={pricing.weekdayRate}
                            onChange={(e) =>
                              setPricing({ ...pricing, weekdayRate: Number(e.target.value) })
                            }
                            className="bg-transparent text-white font-mono font-bold w-full focus:outline-none"
                          />
                          <span className="text-neutral-500 text-xs font-mono">/hr</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Cricket & Football</span>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                          WEEKEND BASE RATE (FRI–SUN)
                        </label>
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                          <span className="text-neutral-500 font-mono mr-2">₹</span>
                          <input
                            type="number"
                            value={pricing.weekendRate}
                            onChange={(e) =>
                              setPricing({ ...pricing, weekendRate: Number(e.target.value) })
                            }
                            className="bg-transparent text-white font-mono font-bold w-full focus:outline-none"
                          />
                          <span className="text-neutral-500 text-xs font-mono">/hr</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Prime peak hours</span>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-[#10ef67] block mb-1.5 font-bold">
                          MORNING BONUS DISCOUNT (5 AM–5 PM)
                        </label>
                        <div className="flex items-center bg-neutral-900 border border-[#10ef67]/40 rounded-xl px-3 py-2">
                          <span className="text-neutral-500 font-mono mr-2">₹</span>
                          <input
                            type="number"
                            value={pricing.morningBonusDiscount}
                            onChange={(e) =>
                              setPricing({
                                ...pricing,
                                morningBonusDiscount: Number(e.target.value),
                              })
                            }
                            className="bg-transparent text-[#10ef67] font-mono font-bold w-full focus:outline-none"
                          />
                          <span className="text-neutral-500 text-xs font-mono">off/hr</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Applies 5:00 AM to 5:00 PM</span>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                          PICKLEBALL WEEKDAY RATE
                        </label>
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                          <span className="text-neutral-500 font-mono mr-2">₹</span>
                          <input
                            type="number"
                            value={pricing.pickleballWeekdayRate}
                            onChange={(e) =>
                              setPricing({
                                ...pricing,
                                pickleballWeekdayRate: Number(e.target.value),
                              })
                            }
                            className="bg-transparent text-white font-mono font-bold w-full focus:outline-none"
                          />
                          <span className="text-neutral-500 text-xs font-mono">/hr</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-neutral-400 block mb-1.5 font-bold">
                          PICKLEBALL WEEKEND RATE
                        </label>
                        <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
                          <span className="text-neutral-500 font-mono mr-2">₹</span>
                          <input
                            type="number"
                            value={pricing.pickleballWeekendRate}
                            onChange={(e) =>
                              setPricing({
                                ...pricing,
                                pickleballWeekendRate: Number(e.target.value),
                              })
                            }
                            className="bg-transparent text-white font-mono font-bold w-full focus:outline-none"
                          />
                          <span className="text-neutral-500 text-xs font-mono">/hr</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#10ef67] hover:bg-[#39ff84] text-black font-extrabold uppercase tracking-wider rounded-xl transition-all neon-glow font-sans text-xs"
                      >
                        Save Updated Rates to Database
                      </button>

                      {pricingSaved && (
                        <span className="text-xs font-mono text-[#10ef67] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Rates successfully applied!
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: REVENUE & ANALYTICS */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  {stats ? (
                    <>
                      {/* Metric Cards */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                          <span className="text-xs font-mono text-neutral-400 block">TOTAL REVENUE</span>
                          <span className="font-display text-3xl font-black text-[#10ef67] block mt-1">
                            ₹{stats.totalRevenue.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono">All confirmed bookings</span>
                        </div>

                        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                          <span className="text-xs font-mono text-neutral-400 block">TODAY’S REVENUE</span>
                          <span className="font-display text-3xl font-black text-white block mt-1">
                            ₹{stats.todayRevenue.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono">{stats.todayBookingsCount} bookings today</span>
                        </div>

                        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                          <span className="text-xs font-mono text-neutral-400 block">CHECKED-IN PASSES</span>
                          <span className="font-display text-3xl font-black text-blue-400 block mt-1">
                            {stats.usedCount}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono">Redeemed at gate</span>
                        </div>

                        <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl">
                          <span className="text-xs font-mono text-neutral-400 block">UPCOMING MATCHES</span>
                          <span className="font-display text-3xl font-black text-emerald-400 block mt-1">
                            {stats.confirmedCount}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono">Active valid tickets</span>
                        </div>
                      </div>

                      {/* Sports Popularity Distribution */}
                      <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
                        <h4 className="font-display text-lg font-bold uppercase text-white">
                          TURF UTILIZATION BREAKDOWN
                        </h4>
                        <div className="space-y-3 font-mono text-xs">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-neutral-300">🏏 Box Cricket Arena</span>
                              <span className="text-white font-bold">{stats.sportsBreakdown.cricket} bookings</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10ef67] rounded-full"
                                style={{
                                  width: `${(stats.sportsBreakdown.cricket / (stats.totalBookings || 1)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-neutral-300">⚽ 5-a-Side Football Turf</span>
                              <span className="text-white font-bold">{stats.sportsBreakdown.football} bookings</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-400 rounded-full"
                                style={{
                                  width: `${(stats.sportsBreakdown.football / (stats.totalBookings || 1)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-neutral-300">🏓 Pickleball Pro Court</span>
                              <span className="text-white font-bold">{stats.sportsBreakdown.pickleball} bookings</span>
                            </div>
                            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-teal-400 rounded-full"
                                style={{
                                  width: `${(stats.sportsBreakdown.pickleball / (stats.totalBookings || 1)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-neutral-400 font-mono text-xs">
                      Loading revenue metrics...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
