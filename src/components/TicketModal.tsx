import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  Download,
  Share2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { Booking } from '../types';
import { generateNeonQRCode, downloadDataUrl } from '../utils/qr';

interface TicketModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (booking && isOpen) {
      // Encode verification URL with booking ID
      const verificationPayload = `${window.location.origin}/#verify=${booking.id}`;
      generateNeonQRCode(verificationPayload, {
        width: 280,
        margin: 1,
        neonColor: '#10ef67',
        bgColor: '#070a08',
      }).then((url) => {
        setQrCodeDataUrl(url);
      });
    }
  }, [booking, isOpen]);

  if (!isOpen || !booking) return null;

  const handleDownloadTicket = () => {
    if (qrCodeDataUrl) {
      downloadDataUrl(qrCodeDataUrl, `Aanandha_Ticket_${booking.id}.png`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🏏 AANANDHA SPORTS SPACE - BOOKING CONFIRMED!\n\n` +
        `🎫 Booking ID: ${booking.id}\n` +
        `🏟️ Sport: ${booking.sportName}\n` +
        `📅 Date: ${booking.date}\n` +
        `⏰ Time: ${booking.timeSlot}\n` +
        `👤 Player: ${booking.customerName}\n` +
        `💰 Amount: ₹${booking.totalAmount}\n` +
        `📍 Venue: Aathupalam, Coimbatore (Near Rana Food, Palakkad Rd)\n` +
        `📞 Contact: 9566550790\n\nShow your digital QR pass at the entrance gate!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-[#090d0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 neon-glow overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors z-20"
          aria-label="Close Ticket Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10ef67]/10 border border-[#10ef67]/40 rounded-full text-xs font-mono text-[#10ef67]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Booking Confirmed & Gate Pass Active</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
            OFFICIAL <span className="text-[#10ef67]">MATCH PASS</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Present this scannable QR ticket to gate attendants upon arrival.
          </p>
        </div>

        {/* Visual Athletic Pass Container */}
        <div
          ref={ticketRef}
          className="relative bg-[#060807] border-2 border-neutral-800 rounded-2xl p-6 shadow-inner overflow-hidden"
        >
          {/* Top Notch Indicators */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#090d0a] rounded-b-full border border-neutral-800" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#090d0a] rounded-t-full border border-neutral-800" />

          {/* Ticket Header */}
          <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
            <div>
              <span className="font-display text-xl font-black text-white tracking-wider block">
                AANANDHA <span className="text-[#10ef67]">SPORTS SPACE</span>
              </span>
              <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-[#10ef67]" /> Aathupalam, Coimbatore
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Status</span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold font-mono uppercase ${
                  booking.status === 'Used'
                    ? 'bg-neutral-800 text-neutral-300'
                    : 'bg-[#10ef67]/20 text-[#10ef67] border border-[#10ef67]/40'
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>

          {/* Ticket Body: Match Info */}
          <div className="py-4 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Turf / Arena</span>
              <p className="font-display text-2xl font-bold uppercase text-white">
                {booking.sportName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#10ef67]" /> Match Date
                </span>
                <p className="text-sm font-bold text-white font-mono mt-0.5">{booking.date}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#10ef67]" /> Scheduled Slot
                </span>
                <p className="text-sm font-bold text-[#10ef67] font-mono mt-0.5">{booking.timeSlot}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Player Name</span>
                <p className="text-sm font-semibold text-white truncate mt-0.5">{booking.customerName}</p>
                {booking.teamName && (
                  <p className="text-xs text-neutral-400 font-mono truncate">{booking.teamName}</p>
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Total Amount</span>
                <p className="text-base font-black text-white font-mono mt-0.5">₹{booking.totalAmount}</p>
                <p className="text-[10px] text-neutral-400 font-mono">UPI / Pay at Arena</p>
              </div>
            </div>

            {booking.extraEquipment && booking.extraEquipment.length > 0 && (
              <div className="pt-1">
                <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Equipment Add-ons</span>
                <p className="text-xs text-neutral-300 font-mono">
                  {booking.extraEquipment.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Perforated Separator */}
          <div className="relative py-2 flex items-center justify-between">
            <div className="w-full border-t border-dashed border-neutral-700" />
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <div className="p-2 bg-[#080c09] rounded-xl border border-neutral-800 shadow-md shrink-0">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt={`QR Ticket for ${booking.id}`}
                  className="w-32 h-32 object-contain rounded"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center font-mono text-xs text-neutral-500">
                  Generating QR...
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] uppercase font-mono text-neutral-500 font-bold">Unique Booking ID</span>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-base font-bold text-white tracking-wider select-all">
                  {booking.id}
                </span>
                <button
                  onClick={handleCopyBookingId}
                  className="p-1 text-neutral-400 hover:text-white rounded"
                  title="Copy Booking ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10ef67]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-[11px] text-neutral-400 leading-tight">
                Scan with staff scanner at the gate to check-in. One-time entry per pass.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Anti-Tamper Ticket</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-xl font-sans neon-glow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Save Ticket QR</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-700 font-sans"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Share WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 font-sans"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
