import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Scan,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Search,
  Camera,
  RefreshCw,
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Booking } from '../types';

interface StaffScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const StaffScannerModal: React.FC<StaffScannerModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    booking?: Booking;
    message: string;
    isAlreadyRedeemed?: boolean;
  } | null>(null);

  const [staffName, setStaffName] = useState('Gate Officer');
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  // Clear states when opening
  useEffect(() => {
    if (isOpen) {
      setVerificationResult(null);
      setRedeemSuccess(null);
      setCameraError(null);
    } else {
      stopCameraScanner();
    }
  }, [isOpen]);

  const verifyTicketCode = async (codeToVerify: string) => {
    const cleanCode = codeToVerify.trim();
    if (!cleanCode) return;

    // If it's a URL like http://.../#verify=ASS-XXXX-YY, extract the parameter
    let extracted = cleanCode;
    if (cleanCode.includes('#verify=')) {
      extracted = cleanCode.split('#verify=')[1];
    } else if (cleanCode.includes('/verify/')) {
      extracted = cleanCode.split('/verify/')[1];
    }

    setIsVerifying(true);
    setRedeemSuccess(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(extracted)}`);
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      setVerificationResult({
        valid: false,
        message: 'Network error communicating with arena verification server.',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRedeemTicket = async () => {
    if (!verificationResult?.booking) return;

    try {
      const res = await fetch('/api/verify/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: verificationResult.booking.id,
          staffName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setRedeemSuccess(`Check-in successful! Ticket marked as USED for ${verificationResult.booking.customerName}.`);
        setVerificationResult({
          valid: true,
          booking: data.booking,
          message: 'Entry Approved! Ticket is now marked USED.',
          isAlreadyRedeemed: true,
        });
      } else {
        alert(data.error || 'Failed to redeem ticket.');
      }
    } catch (err) {
      alert('Error updating check-in state.');
    }
  };

  const startCameraScanner = () => {
    setScannerActive(true);
    setCameraError(null);

    setTimeout(() => {
      try {
        if (!scannerRef.current) {
          const scanner = new Html5QrcodeScanner(
            'staff-qr-reader',
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            /* verbose= */ false
          );

          scanner.render(
            (decodedText) => {
              verifyTicketCode(decodedText);
              scanner.clear();
              setScannerActive(false);
            },
            (error) => {
              // ignore frame read errors
            }
          );

          scannerRef.current = scanner;
        }
      } catch (err: any) {
        setCameraError('Camera access unavailable. Use manual ID entry below.');
        setScannerActive(false);
      }
    }, 150);
  };

  const stopCameraScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (e) {
        // ignore
      }
      scannerRef.current = null;
    }
    setScannerActive(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 bg-[#0a0e0c] border border-neutral-800 rounded-3xl p-6 sm:p-8 neon-glow overflow-hidden shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close Staff Scanner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-[#10ef67]/40 flex items-center justify-center text-[#10ef67]">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold uppercase text-white">
                GATE STAFF <span className="text-[#10ef67]">VERIFIER</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Turf Check-in & QR Authentication Desk
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="px-3 py-1.5 text-xs font-mono font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded-lg transition-colors"
          >
            Open Admin ↗
          </button>
        </div>

        {/* Staff ID & Mode Switcher */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Attendant Name:</span>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-right text-white focus:outline-none focus:border-[#10ef67]"
            />
          </div>

          {/* Camera Scanner Toggle */}
          <div className="flex gap-2">
            {!scannerActive ? (
              <button
                onClick={startCameraScanner}
                className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-850 text-white border border-[#10ef67]/40 hover:border-[#10ef67] rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Camera className="w-4 h-4 text-[#10ef67]" />
                <span>Launch Camera Scanner</span>
              </button>
            ) : (
              <button
                onClick={stopCameraScanner}
                className="flex-1 py-3 px-4 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>Stop Camera</span>
              </button>
            )}
          </div>

          {/* HTML5 QR Code Camera viewport */}
          {scannerActive && (
            <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800">
              <div id="staff-qr-reader" className="w-full rounded-xl overflow-hidden" />
              <p className="text-[11px] text-center text-neutral-400 font-mono mt-2">
                Align the customer’s ticket QR code within camera box
              </p>
            </div>
          )}

          {cameraError && (
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 font-mono">
              {cameraError}
            </div>
          )}

          {/* Manual Entry or Quick ID Lookup */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyTicketCode(manualCode);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. ASS-8812-CR) or paste QR text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#10ef67] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none font-mono transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying || !manualCode.trim()}
              className="px-5 py-2.5 bg-[#10ef67] hover:bg-[#39ff84] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all font-mono shrink-0"
            >
              {isVerifying ? 'Checking...' : 'Verify'}
            </button>
          </form>

          {/* Quick Demo Samples for instant testing */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 overflow-x-auto pb-1">
            <span>Quick test IDs:</span>
            {['ASS-8812-CR', 'ASS-7734-FB', 'ASS-5521-PB'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setManualCode(id);
                  verifyTicketCode(id);
                }}
                className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-800 hover:text-[#10ef67]"
              >
                {id}
              </button>
            ))}
          </div>

          {/* VERIFICATION RESULT PANEL */}
          {verificationResult && (
            <div
              className={`mt-6 p-5 rounded-2xl border transition-all animate-fadeIn ${
                !verificationResult.valid
                  ? 'bg-red-950/30 border-red-800/80 text-red-200'
                  : verificationResult.isAlreadyRedeemed
                  ? 'bg-amber-950/30 border-amber-800/80 text-amber-200'
                  : 'bg-emerald-950/30 border-[#10ef67]/60 text-emerald-100'
              }`}
            >
              {/* Status Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  {!verificationResult.valid ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  ) : verificationResult.isAlreadyRedeemed ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-[#10ef67] shrink-0" />
                  )}
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                      {!verificationResult.valid
                        ? 'INVALID TICKET'
                        : verificationResult.isAlreadyRedeemed
                        ? 'ALREADY REDEEMED / USED'
                        : 'VALID MATCH PASS'}
                    </h3>
                    <p className="text-xs opacity-90">{verificationResult.message}</p>
                  </div>
                </div>

                {verificationResult.booking && (
                  <span className="font-mono text-xs px-2 py-1 bg-black/40 rounded border border-white/10">
                    {verificationResult.booking.status}
                  </span>
                )}
              </div>

              {/* Booking Details if found */}
              {verificationResult.booking && (
                <div className="pt-3 space-y-2 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">PLAYER</span>
                      <span className="font-bold text-white text-sm">
                        {verificationResult.booking.customerName}
                      </span>
                      <span className="block text-neutral-400 text-[11px]">
                        {verificationResult.booking.phone}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px]">TURF ARENA</span>
                      <span className="font-bold text-white text-sm">
                        {verificationResult.booking.sportName}
                      </span>
                      <span className="block text-neutral-400 text-[11px]">
                        {verificationResult.booking.teamName || 'Solo / Open Group'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">DATE & SLOT</span>
                      <span className="text-white font-bold">
                        {verificationResult.booking.date}
                      </span>
                      <span className="text-[#10ef67] block">
                        {verificationResult.booking.timeSlot}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[10px]">PAYMENT DUE</span>
                      <span className="text-white font-bold text-sm">
                        ₹{verificationResult.booking.totalAmount}
                      </span>
                      <span className="text-neutral-400 block text-[10px]">
                        ID: {verificationResult.booking.id}
                      </span>
                    </div>
                  </div>

                  {verificationResult.booking.extraEquipment &&
                    verificationResult.booking.extraEquipment.length > 0 && (
                      <div className="pt-1 text-[11px] text-neutral-300">
                        <span className="text-neutral-400">Gear to issue: </span>
                        {verificationResult.booking.extraEquipment.join(', ')}
                      </div>
                    )}

                  {/* Gate Redeem Button */}
                  {!verificationResult.isAlreadyRedeemed &&
                    verificationResult.booking.status === 'Confirmed' && (
                      <div className="pt-3">
                        <button
                          onClick={handleRedeemTicket}
                          className="w-full py-3 bg-[#10ef67] hover:bg-[#39ff84] text-black font-extrabold uppercase tracking-wider rounded-xl transition-all neon-glow font-sans flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Approve Gate Entry & Mark as Used</span>
                        </button>
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

          {redeemSuccess && (
            <div className="p-4 bg-[#10ef67]/20 border border-[#10ef67] rounded-xl text-xs sm:text-sm font-semibold text-[#10ef67] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{redeemSuccess}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
