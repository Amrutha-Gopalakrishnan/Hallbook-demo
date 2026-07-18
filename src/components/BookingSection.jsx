import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import PaymentModal from './PaymentModal';
import CustomSelect from './CustomSelect';
import { getDB, getCurrentUser } from '../data/db';
import AuthModal from './AuthModal';

const eventTypes = [
  "Wedding", "Reception", "Engagement", "Birthday Party", "Corporate Event", "Other"
];

const occupancyOptions = [
  "1 Adult", "2 Adults", "2 Adults, 1 Child", "3 Adults"
];

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState('hall');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    // Parse query params to set active tab and room ID
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    if (type === 'room') {
      setActiveTab('room');
    }
  }, []);

  const handleProceedToPayment = (data) => {
    setBookingData(data);
    if (!getCurrentUser()) {
      setAuthModalOpen(true);
    } else {
      setPaymentModalOpen(true);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-zinc-50 relative scroll-mt-24" id="booking">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-amber-400"></div>
            <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">Reservations</span>
            <div className="w-8 h-[1px] bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-950 mb-6">
            Plan Your <span className="italic text-amber-700">Experience</span>
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-zinc-100/50">
          <div className="flex bg-zinc-50/50 border-b border-zinc-100 p-3 gap-3">
            <button
              onClick={() => setActiveTab('hall')}
              className={`flex-1 py-4 text-center font-serif text-lg md:text-xl rounded-2xl transition-all duration-300 relative z-10 ${activeTab === 'hall' ? 'text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50'}`}
            >
              {activeTab === 'hall' && (
                <motion.div layoutId="tabBg" className="absolute inset-0 bg-white rounded-2xl border border-zinc-200/40 -z-10 shadow-sm" />
              )}
              <span className="flex items-center justify-center gap-2">
                <Icon icon="solar:buildings-2-bold-duotone" className={activeTab === 'hall' ? 'text-amber-500' : ''} /> Hall Booking
              </span>
            </button>
            <button
              onClick={() => setActiveTab('room')}
              className={`flex-1 py-4 text-center font-serif text-lg md:text-xl rounded-2xl transition-all duration-300 relative z-10 ${activeTab === 'room' ? 'text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50'}`}
            >
              {activeTab === 'room' && (
                <motion.div layoutId="tabBg" className="absolute inset-0 bg-white rounded-2xl border border-zinc-200/40 -z-10 shadow-sm" />
              )}
              <span className="flex items-center justify-center gap-2">
                <Icon icon="solar:bed-bold-duotone" className={activeTab === 'room' ? 'text-amber-500' : ''} /> Room Booking
              </span>
            </button>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'hall' ? (
                  <HallForm onSubmit={handleProceedToPayment} />
                ) : (
                  <RoomForm onSubmit={handleProceedToPayment} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={() => { setPaymentModalOpen(false); window.location.reload(); }} 
        data={bookingData}
        type={activeTab}
      />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onSuccess={() => {
          setAuthModalOpen(false);
          setPaymentModalOpen(true);
        }} 
      />
    </section>
  );
};

const HallForm = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [formData, setFormData] = useState({ 
    decoration: false, catering: false, rooms: false, 
    name: '', phone: '', govId: '', type: '', guests: '' 
  });
  
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const db = getDB();
    setBookedDates(db.hallBookings.map(b => b.date));
  }, []);

  const handleDateChange = (e) => {
    const val = e.target.value;
    setDate(val);
    setFormData({...formData, date: val});
    if (bookedDates.includes(val)) {
      setIsAvailable(false);
    } else if (val) {
      setIsAvailable(true);
    } else {
      setIsAvailable(null);
    }
  };

  const [bookingMode, setBookingMode] = useState('Online');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAvailable) return;
    onSubmit({
      type: 'hall',
      ...formData,
      date,
      bookingMode,
      price: 150000 // Demo price
    });
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <InputField label="Full Name" type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        <InputField label="Government ID (Aadhar/PAN)" type="text" placeholder="Enter ID Number" required value={formData.govId} onChange={e => setFormData({...formData, govId: e.target.value})} />
        
        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Event Type</label>
          <CustomSelect 
            value={formData.type}
            onChange={e => setFormData({...formData, type: e.target.value})}
            options={eventTypes}
            placeholder="Select Event Type"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Booking Mode</label>
          <CustomSelect 
            value={bookingMode}
            onChange={e => setBookingMode(e.target.value)}
            options={["Online (Pay Now)", "In-Person (Pay at Venue)"]}
            placeholder="Select Mode"
          />
        </div>

        <div className="space-y-2 relative group">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Event Date</label>
          <input 
            type="date" 
            value={date}
            onChange={handleDateChange}
            className={`w-full border rounded-xl py-3 px-4 bg-zinc-50 outline-none transition-all group-hover:border-amber-500/50 ${
              isAvailable === false ? 'border-red-500 text-red-600 focus:ring-4 focus:ring-red-500/10' : 
              isAvailable === true ? 'border-green-500 text-green-600 focus:ring-4 focus:ring-green-500/10' : 'border-zinc-200 text-zinc-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10'
            }`} 
            required 
          />
          <AnimatePresence>
            {isAvailable === false && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <Icon icon="solar:close-circle-bold" /> Hall is already booked for this date.
              </motion.p>
            )}
            {isAvailable === true && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <Icon icon="solar:check-circle-bold" /> Hall is available!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <InputField label="Expected Guests" type="number" placeholder="500" required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} />
      </div>
      
      <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
        <h4 className="font-serif text-xl mb-4 text-zinc-900">Additional Requirements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Checkbox label="Decoration Services" checked={formData.decoration} onChange={(e) => setFormData({...formData, decoration: e.target.checked})} />
          <Checkbox label="Catering Services" checked={formData.catering} onChange={(e) => setFormData({...formData, catering: e.target.checked})} />
          <Checkbox label="Guest Accommodation" checked={formData.rooms} onChange={(e) => setFormData({...formData, rooms: e.target.checked})} />
        </div>
      </div>

      <button 
        disabled={isAvailable === false || !date}
        className="w-full py-5 rounded-xl uppercase tracking-widest text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3 bg-zinc-900 text-white hover:bg-amber-500 hover:text-zinc-900 hover:shadow-[0_8px_30px_rgb(245,158,11,0.25)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Calculate & Proceed to Payment <Icon icon="solar:arrow-right-linear" className="text-xl" />
      </button>
    </form>
  );
};

const RoomForm = ({ onSubmit }) => {
  const [occupancy, setOccupancy] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  useEffect(() => {
    const db = getDB();
    setRooms(db.rooms.filter(r => r.status === 'Available'));
    
    // Auto-select room from query params if available
    const searchParams = new URLSearchParams(window.location.search);
    const urlRoomId = searchParams.get('roomId');
    if (urlRoomId) {
      setSelectedRoomId(urlRoomId);
    }
  }, []);
  
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const [bookingMode, setBookingMode] = useState("Online (Pay Now)");

  return (
    <form className="space-y-8" onSubmit={(e) => { 
      e.preventDefault(); 
      onSubmit({ 
        roomId: selectedRoomId,
        checkIn, checkOut, occupancy,
        bookingMode,
        nights: calculateNights() 
      }); 
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <InputField label="Full Name" type="text" placeholder="Jane Doe" required />
        <InputField label="Phone Number" type="tel" placeholder="+91 98765 43210" required />
        
        <InputField label="Check-in Date" type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <InputField label="Check-out Date" type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        
        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Select Available Room</label>
          <CustomSelect 
            value={selectedRoomId}
            onChange={e => setSelectedRoomId(e.target.value)}
            options={rooms.map(r => ({ value: r.id, label: `${r.type} - ₹${r.price}/night` }))}
            placeholder="Select Room"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Occupancy</label>
          <CustomSelect 
            value={occupancy}
            onChange={(e) => setOccupancy(e.target.value)}
            options={occupancyOptions}
            placeholder="Select Occupancy"
          />
        </div>

        <AnimatePresence>
          {occupancy === "Other" && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }} 
              animate={{ opacity: 1, height: 'auto', y: 0 }} 
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="md:col-span-2 overflow-hidden"
            >
              <InputField label="Please specify occupancy" type="text" placeholder="E.g. 5 Adults, 3 Children" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Government ID Number</label>
          <input 
            type="text" 
            className="w-full border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-zinc-900 placeholder:text-zinc-400 hover:border-amber-500/50" 
            placeholder="Required at check-in" 
            required 
          />
        </div>

        <div className="space-y-2 relative">
          <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">Booking Type</label>
          <CustomSelect 
            value={bookingMode}
            onChange={e => setBookingMode(e.target.value)}
            options={["Online Booking", "In-Person Booking"]}
            placeholder="Select Mode"
          />
        </div>
              </div>

      <button className="w-full py-5 rounded-xl uppercase tracking-widest text-sm font-bold transition-all duration-300 flex items-center justify-center gap-3 bg-zinc-900 text-white hover:bg-amber-500 hover:text-zinc-900 hover:shadow-[0_8px_30px_rgb(245,158,11,0.25)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed" disabled={!selectedRoomId}>
        {bookingMode.includes("In-Person") ? "Confirm Booking & Pay at Venue" : "Proceed to Payment"} <Icon icon="solar:arrow-right-linear" className="text-xl" />
      </button>
    </form>
  );
};

const InputField = ({ label, type, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold">{label}</label>
    <input 
      type={type} 
      className="w-full border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-zinc-900 placeholder:text-zinc-400 hover:border-amber-500/50" 
      {...props} 
    />
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-zinc-200">
    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-amber-500 border-amber-500 text-white' : 'border-zinc-300 text-transparent group-hover:border-amber-400'}`}>
      <Icon icon="solar:check-read-linear" className="text-sm" />
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">{label}</span>
  </label>
);

export default BookingSection;
