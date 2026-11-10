import React, { useEffect, useState } from 'react';
import { X, Download, Share2, Copy, Check, QrCode, Sparkles } from 'lucide-react';
import { generateNeonQRCode, downloadDataUrl } from '../utils/qr';

interface ArenaQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArenaQRCodeModal: React.FC<ArenaQRCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const websiteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}#booking`
    : 'https://aanandhasports.com/#booking';

  useEffect(() => {
    if (isOpen) {
      generateNeonQRCode(websiteUrl, {
        width: 380,
        margin: 2,
        neonColor: '#10ef67',
        bgColor: '#080c09',
      }).then((url) => {
        setQrDataUrl(url);
      });
    }
  }, [isOpen, websiteUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    if (qrDataUrl) {
      downloadDataUrl(qrDataUrl, 'Aanandha_Sports_Space_Booking_QR.png');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🏏 ⚽ 🏓 Book your turf slot at AANANDHA SPORTS SPACE, Coimbatore!\nBook Box Cricket, Football & Pickleball here: ${websiteUrl}\n📞 Phone: +91 9566550790`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0a0e0c] border border-neutral-800 rounded-2xl p-6 sm:p-8 neon-glow overflow-hidden shadow-2xl">
        {/* Glow halo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#10ef67]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Close QR Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-[#10ef67]/30 rounded-full text-xs font-mono text-[#10ef67]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Arena Smart QR</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            AANANDHA <span className="text-[#10ef67]">QR CODE</span>
          </h2>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto">
            Scan with any phone camera to jump directly to live turf slot bookings, pricing & digital gate passes.
          </p>
        </div>

        {/* Branded Neon-Green QR Display Card */}
        <div className="relative flex flex-col items-center justify-center p-5 bg-[#050706] rounded-xl border-2 border-[#10ef67]/50 shadow-inner group">
          {qrDataUrl ? (
            <div className="relative p-2 bg-[#080c09] rounded-lg">
              <img
                src={qrDataUrl}
                alt="Aanandha Sports Space Direct Booking Neon QR Code"
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded"
              />
              {/* Center Monogram / Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-[#070908] border-2 border-[#10ef67] flex items-center justify-center shadow-lg">
                  <span className="font-display font-black text-xs text-[#10ef67]">ASS</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-64 h-64 flex items-center justify-center text-neutral-500 font-mono text-sm">
              Generating Neon QR...
            </div>
          )}

          <div className="mt-3 text-center">
            <p className="font-display text-sm tracking-widest text-[#10ef67] uppercase font-bold">
              SCAN TO BOOK AATHUPALAM TURF
            </p>
            <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
              Palakkad–Coimbatore Rd · 9566550790
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#10ef67] hover:bg-[#39ff84] rounded-xl transition-all font-sans neon-glow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Save QR Image</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-700 transition-all font-sans"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Share WhatsApp</span>
          </button>
        </div>

        {/* Copy Link input */}
        <div className="mt-4 flex items-center gap-2 p-2 bg-neutral-900/90 rounded-lg border border-neutral-800 text-xs">
          <span className="text-neutral-400 font-mono truncate px-2 select-all flex-1">
            {websiteUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-medium flex items-center gap-1.5 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10ef67]" />
                <span className="text-[#10ef67]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
