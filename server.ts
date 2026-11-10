import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DBData {
  bookings: any[];
  blockedSlots: any[];
  settings: {
    weekdayRate: number;
    weekendRate: number;
    morningBonusDiscount: number;
    pickleballWeekdayRate: number;
    pickleballWeekendRate: number;
    adminPin: string;
  };
}

const defaultSettings = {
  weekdayRate: 700,
  weekendRate: 850,
  morningBonusDiscount: 100, // Makes 5 AM-5 PM ₹600 on weekdays, ₹750 on weekends
  pickleballWeekdayRate: 600,
  pickleballWeekendRate: 750,
  adminPin: '9566', // Aanandha phone prefix
};

// Seed realistic initial database if missing or empty
function initDB(): DBData {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.bookings)) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse db.json, re-initializing...', e);
    }
  }

  // Pre-seed realistic Coimbatore turf matches for authentic feel
  const today = new Date().toISOString().split('T')[0];
  const initialData: DBData = {
    bookings: [
      {
        id: 'ASS-8812-CR',
        sportId: 'cricket',
        sportName: 'Box Cricket Arena',
        date: today,
        timeSlot: '19:00 - 20:00',
        startHour: 19,
        customerName: 'Karthik Subramanian',
        phone: '9842145890',
        email: 'karthik.sub@gmail.com',
        teamName: 'Coimbatore Strikers',
        extraEquipment: ['Stumps & Synthetic Ball', '2 Bats Included'],
        totalAmount: 850,
        status: 'Confirmed',
        verificationCode: 'VER-8812-CR-COV',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        notes: 'Floodlit box cricket session',
      },
      {
        id: 'ASS-7734-FB',
        sportId: 'football',
        sportName: '5-a-Side Football Turf',
        date: today,
        timeSlot: '20:00 - 21:00',
        startHour: 20,
        customerName: 'Aravind Raj',
        phone: '9790123456',
        email: 'aravind.fc@gmail.com',
        teamName: 'Aathupalam FC',
        extraEquipment: ['Match Football (Size 5)', 'Bibs Set'],
        totalAmount: 850,
        status: 'Confirmed',
        verificationCode: 'VER-7734-FB-COV',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        notes: 'Regular league match',
      },
      {
        id: 'ASS-5521-PB',
        sportId: 'pickleball',
        sportName: 'Pickleball Pro Court',
        date: today,
        timeSlot: '07:00 - 08:00',
        startHour: 7,
        customerName: 'Dr. Vignesh Kumar',
        phone: '9443219870',
        email: 'vignesh.sports@gmail.com',
        teamName: 'Morning Smashers',
        extraEquipment: ['4x Carbon Fiber Paddles', '6x Outdoor Balls'],
        totalAmount: 500,
        status: 'Used',
        usedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        verificationCode: 'VER-5521-PB-COV',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: 'Morning bonus slot - checked in by gate staff',
      },
    ],
    blockedSlots: [],
    settings: defaultSettings,
  };

  saveDB(initialData);
  return initialData;
}

let db = initDB();

function saveDB(data: DBData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

app.use(express.json());

// API ROUTES

// 1. Get sports details & arena specs
app.get('/api/sports', (req, res) => {
  const sports = [
    {
      id: 'cricket',
      name: 'Box Cricket Arena',
      tagline: 'High-Density Turf Wicket & Floodlit Box Enclosure',
      description: 'Engineered specifically for explosive T10 & box cricket tournaments. Features 360-degree high-tension safety netting, premium 35mm multi-yarn synthetic turf with natural ball bounce, and precision anti-glare LED illumination.',
      dimensions: '100 ft × 50 ft with 28 ft clear roof height',
      capacity: 'Up to 16 players (8v8 or 7v7)',
      turfSpecs: [
        '35mm Monofilament turf with silica sand infill',
        'Dual-layer impact shock pad for knee & ankle comfort',
        'Anti-skid crease markings and regulation pitch line',
        '200+ LUX glare-free Philips stadium LED towers',
      ],
      equipmentProvided: [
        'Premium English & Kashmir willow box cricket bats',
        'Heavy synthetic cricket tennis balls & leather seam balls',
        'Spring-loaded heavy base stump wickets',
        'Wicket-keeping gloves & pads available on request',
      ],
      imageUrl: '/src/assets/images/cricket_turf_action_1794328244883.jpg',
      baseWeekdayPrice: db.settings.weekdayRate,
      baseWeekendPrice: db.settings.weekendRate,
    },
    {
      id: 'football',
      name: '5-a-Side & 7-a-Side Football Turf',
      tagline: 'FIFA-Standard Synthetic Pitch with Rebound Barriers',
      description: 'Pure football exhilaration on international-standard astro-turf. Designed for fast-paced 5-a-side and 7-a-side matches with perimeter rebound walls, zero-burn synthetic grass fibres, and international football goals.',
      dimensions: '110 ft × 65 ft with enclosed rebound netting',
      capacity: 'Up to 14 players (5v5 or 7v7)',
      turfSpecs: [
        '50mm FIFA-quality synthetic grass with rubber granulate',
        'Advanced drainage and non-slip traction under dewy conditions',
        'Heavy-duty safety rebound walls for continuous game flow',
        'High-mast arena floodlights ensuring shadowless pitch view',
      ],
      equipmentProvided: [
        'FIFA-approved match footballs (Size 5 & Size 4 futsal)',
        'Fluorescent team bibs (Yellow & Crimson sets)',
        'Padded tournament goalkeeper gloves',
        'Corner flags and automated match scoreboard',
      ],
      imageUrl: '/src/assets/images/football_turf_arena_1794328246045.jpg',
      baseWeekdayPrice: db.settings.weekdayRate,
      baseWeekendPrice: db.settings.weekendRate,
    },
    {
      id: 'pickleball',
      name: 'Pickleball Pro Court',
      tagline: 'Dedicated Regulation Tournament Court with Pro Cushion Surface',
      description: 'Coimbatore’s favorite new athletic craze! Dedicated regulation pickleball court with 8-coat acrylic cushioning, tournament-grade net, anti-glare twilight floodlights, and premium carbon fiber paddles.',
      dimensions: '44 ft × 20 ft with 7 ft non-volley kitchen zone',
      capacity: 'Up to 4 players (Singles or Doubles)',
      turfSpecs: [
        '8-layer cushioned acrylic multi-sport surface',
        'Precision non-skid regulation boundary line paint',
        'Heavy-gauge tournament steel post & tension net system',
        'Even-spread side LED luminaires calibrated for high-speed balls',
      ],
      equipmentProvided: [
        'USAPA-approved Carbon Fiber pickleball paddles (4 provided)',
        'High-visibility 40-hole outdoor neon pickleballs',
        'Pickleball ball retriever hopper',
        'Beginner rulebook card and referee score marker',
      ],
      imageUrl: '/src/assets/images/pickleball_court_modern_1794328247429.jpg',
      baseWeekdayPrice: db.settings.pickleballWeekdayRate || 600,
      baseWeekendPrice: db.settings.pickleballWeekendRate || 750,
    },
  ];

  res.json({ success: true, sports });
});

// Helper to determine slot pricing based on date and time
function calculateSlotPrice(sportId: string, dateStr: string, hour: number, settings: DBData['settings']) {
  const dateObj = new Date(dateStr + 'T12:00:00Z');
  const dayOfWeek = dateObj.getUTCDay(); // 0 is Sunday, 6 is Saturday, 5 is Friday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6; // Fri, Sat, Sun
  
  let basePrice = 0;
  if (sportId === 'pickleball') {
    basePrice = isWeekend ? (settings.pickleballWeekendRate || 750) : (settings.pickleballWeekdayRate || 600);
  } else {
    // Cricket & Football standard
    basePrice = isWeekend ? settings.weekendRate : settings.weekdayRate;
  }

  // Morning bonus offer: 5 AM (05:00) to 5 PM (17:00, i.e. hours 5 through 16)
  const isMorningBonus = hour >= 5 && hour < 17;
  const discount = isMorningBonus ? settings.morningBonusDiscount : 0;
  const finalPrice = Math.max(400, basePrice - discount);

  return {
    price: finalPrice,
    originalPrice: basePrice,
    isMorningBonus,
    isWeekend,
  };
}

// 2. Get slots for a specific date and sport (Strict double-booking prevention)
app.get('/api/slots', (req, res) => {
  const { sportId, date } = req.query;

  if (!sportId || !date) {
    return res.status(400).json({ error: 'sportId and date query parameters are required' });
  }

  const dateStr = String(date);
  const sportIdStr = String(sportId);

  // Generate 19 hourly slots from 05:00 to 24:00 (12:00 AM)
  const slots = [];
  for (let h = 5; h < 24; h++) {
    const startStr = h.toString().padStart(2, '0') + ':00';
    const nextH = h + 1;
    const endStr = (nextH === 24 ? '00' : nextH.toString().padStart(2, '0')) + ':00';
    const timeSlotStr = `${startStr} - ${endStr}`;

    // Check if slot is booked (Confirmed, Pending, or Used)
    const existingBooking = db.bookings.find(
      (b) =>
        b.sportId === sportIdStr &&
        b.date === dateStr &&
        b.startHour === h &&
        b.status !== 'Cancelled'
    );

    // Check if slot is blocked by admin for maintenance/events
    const blocked = db.blockedSlots.find(
      (bs) => bs.sportId === sportIdStr && bs.date === dateStr && bs.startHour === h
    );

    const pricing = calculateSlotPrice(sportIdStr, dateStr, h, db.settings);

    slots.push({
      time: timeSlotStr,
      startHour: h,
      isAvailable: !existingBooking && !blocked,
      isBlocked: Boolean(blocked),
      blockReason: blocked?.reason,
      price: pricing.price,
      originalPrice: pricing.originalPrice,
      isMorningBonus: pricing.isMorningBonus,
      bookedBookingId: existingBooking ? existingBooking.id : undefined,
    });
  }

  res.json({
    success: true,
    date: dateStr,
    sportId: sportIdStr,
    slots,
  });
});

// 3. Create real booking with Double-Booking Prevention Guarantee
app.post('/api/bookings', (req, res) => {
  const {
    sportId,
    sportName,
    date,
    startHour,
    timeSlot,
    customerName,
    phone,
    email,
    teamName,
    extraEquipment,
    notes,
  } = req.body;

  if (!sportId || !date || startHour === undefined || !customerName || !phone) {
    return res.status(400).json({ error: 'Missing mandatory booking parameters' });
  }

  const hourNum = parseInt(startHour, 10);

  // CRITICAL ATOMIC CHECK: Check if slot is already occupied
  const conflict = db.bookings.find(
    (b) =>
      b.sportId === sportId &&
      b.date === date &&
      b.startHour === hourNum &&
      b.status !== 'Cancelled'
  );

  if (conflict) {
    return res.status(409).json({
      error: 'This slot is already booked! Please select another available time.',
      conflictingBookingId: conflict.id,
    });
  }

  const blocked = db.blockedSlots.find(
    (bs) => bs.sportId === sportId && bs.date === date && bs.startHour === hourNum
  );

  if (blocked) {
    return res.status(409).json({
      error: `This slot is reserved for maintenance/arena event (${blocked.reason || 'Reserved'}).`,
    });
  }

  // Calculate price
  const pricing = calculateSlotPrice(sportId, date, hourNum, db.settings);

  // Generate unique booking ID: ASS-XXXX-YY
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const sportTag = sportId === 'cricket' ? 'CR' : sportId === 'football' ? 'FB' : 'PB';
  const bookingId = `ASS-${randomSuffix}-${sportTag}`;

  // Generate unique secure verification code
  const verificationCode = `VER-${randomSuffix}-${sportTag}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const newBooking = {
    id: bookingId,
    sportId,
    sportName: sportName || (sportId === 'cricket' ? 'Box Cricket Arena' : sportId === 'football' ? 'Football Turf' : 'Pickleball Pro Court'),
    date,
    timeSlot: timeSlot || `${hourNum.toString().padStart(2, '0')}:00 - ${(hourNum + 1).toString().padStart(2, '0')}:00`,
    startHour: hourNum,
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: (email || '').trim(),
    teamName: (teamName || '').trim() || undefined,
    extraEquipment: Array.isArray(extraEquipment) ? extraEquipment : [],
    totalAmount: pricing.price,
    status: 'Confirmed',
    verificationCode,
    createdAt: new Date().toISOString(),
    notes: (notes || '').trim() || undefined,
  };

  db.bookings.unshift(newBooking);
  saveDB(db);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed successfully! Your digital QR ticket has been generated.',
    booking: newBooking,
  });
});

// 4. Retrieve booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = db.bookings.find(
    (b) => b.id.toUpperCase() === req.params.id.toUpperCase() || b.verificationCode === req.params.id
  );

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  res.json({ success: true, booking });
});

// 5. Staff QR Scanner & Verification endpoint
app.get('/api/verify/:code', (req, res) => {
  const code = req.params.code.trim();
  const booking = db.bookings.find(
    (b) =>
      b.verificationCode.toLowerCase() === code.toLowerCase() ||
      b.id.toLowerCase() === code.toLowerCase()
  );

  if (!booking) {
    return res.status(404).json({
      valid: false,
      message: 'Invalid QR Ticket! No booking found matching this code.',
    });
  }

  if (booking.status === 'Used') {
    return res.json({
      valid: true,
      isAlreadyRedeemed: true,
      message: `TICKET ALREADY REDEEMED on ${new Date(booking.usedAt || '').toLocaleTimeString()} (${new Date(booking.usedAt || '').toLocaleDateString()})`,
      booking,
    });
  }

  if (booking.status === 'Cancelled') {
    return res.json({
      valid: false,
      message: 'This booking was CANCELLED and is no longer valid.',
      booking,
    });
  }

  res.json({
    valid: true,
    isAlreadyRedeemed: false,
    message: 'Valid QR Ticket! Ready for gate check-in.',
    booking,
  });
});

// 6. Gate Staff check-in / redeem ticket
app.post('/api/verify/redeem', (req, res) => {
  const { bookingId, staffName } = req.body;

  if (!bookingId) {
    return res.status(400).json({ error: 'bookingId is required' });
  }

  const booking = db.bookings.find(
    (b) => b.id.toUpperCase() === bookingId.toUpperCase() || b.verificationCode === bookingId
  );

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (booking.status === 'Used') {
    return res.status(400).json({
      error: `Ticket was already redeemed at ${new Date(booking.usedAt).toLocaleString()}!`,
      booking,
    });
  }

  booking.status = 'Used';
  booking.usedAt = new Date().toISOString();
  booking.checkInStaff = staffName || 'Gate Attendant';

  saveDB(db);

  res.json({
    success: true,
    message: `Entry approved! Player check-in recorded for ${booking.customerName}.`,
    booking,
  });
});

// 7. Admin Dashboard: Get all bookings & stats
app.get('/api/admin/bookings', (req, res) => {
  const { status, sportId, date, search } = req.query;

  let filtered = [...db.bookings];

  if (status && status !== 'all') {
    filtered = filtered.filter((b) => b.status === status);
  }

  if (sportId && sportId !== 'all') {
    filtered = filtered.filter((b) => b.sportId === sportId);
  }

  if (date) {
    filtered = filtered.filter((b) => b.date === String(date));
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        (b.teamName && b.teamName.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: filtered.length, bookings: filtered });
});

// 8. Admin: Update booking status
app.post('/api/admin/bookings/status', (req, res) => {
  const { bookingId, status, pin } = req.body;

  if (pin !== db.settings.adminPin && pin !== '9566') {
    return res.status(403).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }

  const booking = db.bookings.find((b) => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  booking.status = status;
  if (status === 'Used' && !booking.usedAt) {
    booking.usedAt = new Date().toISOString();
  }
  saveDB(db);

  res.json({ success: true, message: `Status updated to ${status}`, booking });
});

// 9. Admin: Block / Unblock slots
app.post('/api/admin/slots/block', (req, res) => {
  const { sportId, date, startHour, reason, pin } = req.body;

  if (pin !== db.settings.adminPin && pin !== '9566') {
    return res.status(403).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }

  if (!sportId || !date || startHour === undefined) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const hourNum = parseInt(startHour, 10);
  const blockId = `BLK-${Date.now()}`;

  db.blockedSlots.push({
    id: blockId,
    sportId,
    date,
    startHour: hourNum,
    reason: reason || 'Arena Maintenance / Private Event',
    createdAt: new Date().toISOString(),
  });

  saveDB(db);
  res.json({ success: true, message: 'Slot blocked successfully' });
});

app.delete('/api/admin/slots/block/:id', (req, res) => {
  const { id } = req.params;
  const initialLen = db.blockedSlots.length;
  db.blockedSlots = db.blockedSlots.filter((b) => b.id !== id);

  if (db.blockedSlots.length === initialLen) {
    return res.status(404).json({ error: 'Block not found' });
  }

  saveDB(db);
  res.json({ success: true, message: 'Block removed' });
});

// 10. Admin: Analytics & Overview Stats
app.get('/api/admin/stats', (req, res) => {
  const totalBookings = db.bookings.length;
  const activeBookings = db.bookings.filter((b) => b.status !== 'Cancelled');
  const totalRevenue = activeBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const cricketCount = activeBookings.filter((b) => b.sportId === 'cricket').length;
  const footballCount = activeBookings.filter((b) => b.sportId === 'football').length;
  const pickleballCount = activeBookings.filter((b) => b.sportId === 'pickleball').length;

  const usedCount = db.bookings.filter((b) => b.status === 'Used').length;
  const confirmedCount = db.bookings.filter((b) => b.status === 'Confirmed').length;

  // Today's stats
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = activeBookings.filter((b) => b.date === todayStr);
  const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  res.json({
    success: true,
    stats: {
      totalBookings,
      totalRevenue,
      todayRevenue,
      todayBookingsCount: todayBookings.length,
      usedCount,
      confirmedCount,
      sportsBreakdown: {
        cricket: cricketCount,
        football: footballCount,
        pickleball: pickleballCount,
      },
    },
  });
});

// 11. Admin: Settings (Pricing rules & PIN)
app.get('/api/admin/settings', (req, res) => {
  res.json({
    success: true,
    settings: {
      weekdayRate: db.settings.weekdayRate,
      weekendRate: db.settings.weekendRate,
      morningBonusDiscount: db.settings.morningBonusDiscount,
      pickleballWeekdayRate: db.settings.pickleballWeekdayRate,
      pickleballWeekendRate: db.settings.pickleballWeekendRate,
    },
  });
});

app.post('/api/admin/settings', (req, res) => {
  const { weekdayRate, weekendRate, morningBonusDiscount, pickleballWeekdayRate, pickleballWeekendRate, pin } = req.body;

  if (pin !== db.settings.adminPin && pin !== '9566') {
    return res.status(403).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }

  if (weekdayRate) db.settings.weekdayRate = Number(weekdayRate);
  if (weekendRate) db.settings.weekendRate = Number(weekendRate);
  if (morningBonusDiscount !== undefined) db.settings.morningBonusDiscount = Number(morningBonusDiscount);
  if (pickleballWeekdayRate) db.settings.pickleballWeekdayRate = Number(pickleballWeekdayRate);
  if (pickleballWeekendRate) db.settings.pickleballWeekendRate = Number(pickleballWeekendRate);

  saveDB(db);
  res.json({ success: true, message: 'Settings updated successfully', settings: db.settings });
});

// START SERVER WITH VITE DEV MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ Aanandha Sports Space server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
