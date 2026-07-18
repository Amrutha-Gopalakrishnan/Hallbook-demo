import DeluxeRoom from "../assets/ac.png";
import PremierSuite from "../assets/ac2.png";
import PresidentialSuite from "../assets/nonac.png";

const imgAc = DeluxeRoom;
const imgAc2 = PremierSuite;
const imgNonAc = PresidentialSuite;

const generateRooms = () => {
  const rooms = [];
  const types = [
    { type: 'Standard Non-AC', price: 1500, capacity: 2, ac: 'Non-AC', img: imgNonAc },
    { type: 'Deluxe AC Room', price: 2500, capacity: 2, ac: 'AC', img: imgAc },
    { type: 'Premium AC Suite', price: 3500, capacity: 3, ac: 'AC', img: imgAc2 },
    { type: 'Family Room', price: 4500, capacity: 4, ac: 'AC', img: imgAc },
    { type: 'Luxury Suite', price: 6500, capacity: 2, ac: 'AC', img: imgAc2 },
  ];

  let idCounter = 101;
  for (let i = 0; i < 30; i++) {
    const t = types[Math.floor(Math.random() * types.length)];
    const statusRand = Math.random();
    let status = 'Available';
    if (statusRand > 0.8) status = 'Booked';
    else if (statusRand > 0.7) status = 'Reserved';
    else if (statusRand > 0.65) status = 'Maintenance';

    rooms.push({
      id: `RM-${idCounter++}`,
      type: t.type,
      price: t.price,
      capacity: t.capacity,
      ac: t.ac,
      image: t.img,
      status: status,
      floor: Math.floor(i / 10) + 1,
      amenities: t.ac === 'AC' ? ['TV', 'WiFi', 'Geyser', 'AC'] : ['TV', 'WiFi', 'Geyser']
    });
  }
  return rooms;
};

const initialData = {
  rooms: generateRooms(),
  users: [], 
  currentUser: null,
  hallBookings: [
    { id: 'HB-001', date: '2026-07-20', name: 'Rahul Sharma', type: 'Wedding', guests: 800, status: 'Approved', userEmail: 'demo@demo.com' }
  ],
  roomBookings: [
    { id: 'RB-001', roomId: 'RM-101', name: 'John Doe', checkIn: '2026-07-18', checkOut: '2026-07-20', status: 'Approved', userEmail: 'demo@demo.com' }
  ]
};

export const getDB = () => {
  const data = localStorage.getItem('mandapam_db');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      let updated = false;
      if (!parsed.users) {
        parsed.users = [];
        updated = true;
      }
      if (!parsed.hallBookings) {
        parsed.hallBookings = [];
        updated = true;
      }
      if (!parsed.roomBookings) {
        parsed.roomBookings = [];
        updated = true;
      }
      if (updated) {
        localStorage.setItem('mandapam_db', JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      localStorage.setItem('mandapam_db', JSON.stringify(initialData));
      return initialData;
    }
  }
  localStorage.setItem('mandapam_db', JSON.stringify(initialData));
  return initialData;
};

export const saveDB = (data) => {
  localStorage.setItem('mandapam_db', JSON.stringify(data));
};

export const resetDB = () => {
  localStorage.setItem('mandapam_db', JSON.stringify(initialData));
  return initialData;
};

export const loginUser = (email, password) => {
  const db = getDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    db.currentUser = user;
    saveDB(db);
    return user;
  }
  return null;
};

export const registerUser = (name, email, password) => {
  const db = getDB();
  if (db.users.find(u => u.email === email)) return null; 
  const newUser = { id: `U-${Date.now()}`, name, email, password };
  db.users.push(newUser);
  db.currentUser = newUser;
  saveDB(db);
  return newUser;
};

export const logoutUser = () => {
  const db = getDB();
  db.currentUser = null;
  saveDB(db);
};

export const getCurrentUser = () => {
  return getDB().currentUser;
};

export const getUserBookings = (email) => {
  const db = getDB();
  return {
    hallBookings: db.hallBookings.filter(b => b.userEmail === email),
    roomBookings: db.roomBookings.filter(b => b.userEmail === email)
  };
};

export const bookHall = (bookingData) => {
  const db = getDB();
  const newBooking = {
    id: `HB-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    ...bookingData,
    userEmail: db.currentUser?.email || 'guest',
    status: 'Approved'
  };
  db.hallBookings.push(newBooking);
  saveDB(db);
  return newBooking;
};

export const bookRoom = (bookingData) => {
  const db = getDB();
  const newBooking = {
    id: `RB-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    ...bookingData,
    userEmail: db.currentUser?.email || 'guest',
    status: 'Approved'
  };
  db.roomBookings.push(newBooking);
  
  // Update room status
  if (bookingData.roomId) {
    const room = db.rooms.find(r => r.id === bookingData.roomId);
    if (room) {
      room.status = 'Booked';
    }
  }
  
  saveDB(db);
  return newBooking;
};
