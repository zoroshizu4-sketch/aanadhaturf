export type SportType = 'cricket' | 'football' | 'pickleball';

export type BookingStatus = 'Confirmed' | 'Pending' | 'Used' | 'Cancelled';

export interface SportInfo {
  id: SportType;
  name: string;
  tagline: string;
  description: string;
  dimensions: string;
  capacity: string;
  turfSpecs: string[];
  equipmentProvided: string[];
  imageUrl: string;
  baseWeekdayPrice: number;
  baseWeekendPrice: number;
}

export interface TimeSlot {
  time: string; // e.g. "06:00 - 07:00"
  startHour: number; // 6
  isAvailable: boolean;
  isBlocked: boolean;
  blockReason?: string;
  price: number;
  originalPrice: number;
  isMorningBonus: boolean;
  bookedBookingId?: string;
}

export interface Booking {
  id: string; // e.g. ASS-8392-CR
  sportId: SportType;
  sportName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  startHour: number;
  customerName: string;
  phone: string;
  email: string;
  teamName?: string;
  extraEquipment?: string[];
  totalAmount: number;
  status: BookingStatus;
  verificationCode: string;
  createdAt: string;
  usedAt?: string;
  checkInStaff?: string;
  notes?: string;
}

export interface BlockedSlot {
  id: string;
  sportId: SportType;
  date: string;
  timeSlot: string;
  reason: string;
  createdAt: string;
}

export interface PricingSettings {
  weekdayRate: number; // Default 700
  weekendRate: number; // Default 850
  morningBonusDiscount: number; // ₹100 off or custom rate
  pickleballWeekdayRate: number;
  pickleballWeekendRate: number;
  adminPin: string; // Default 9566
}

export interface VerificationResult {
  valid: boolean;
  booking?: Booking;
  message: string;
  isAlreadyRedeemed?: boolean;
}
