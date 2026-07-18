import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDB } from '../data/db';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomSelect from '../components/CustomSelect';

gsap.registerPlugin(ScrollTrigger);

const RoomsPage = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterAc, setFilterAc] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const db = getDB();
    setAllRooms(db.rooms);
    setFilteredRooms(db.rooms);
  }, []);

  useEffect(() => {
    let result = allRooms;
    if (filterType !== 'All') {
      result = result.filter(r => r.type === filterType);
    }
    if (filterAc !== 'All') {
      result = result.filter(r => r.ac === filterAc);
    }
    if (filterStatus !== 'All') {
      result = result.filter(r => r.status === filterStatus);
    }
    setFilteredRooms(result);
  }, [filterType, filterAc, filterStatus, allRooms]);

  const uniqueTypes = ['All', ...new Set(allRooms.map(r => r.type))];

  return (
    <div className="bg-zinc-50 min-h-screen pt-5">
      <Navbar isInnerPage={true} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-zinc-950 mb-4 mt-10">Our Rooms</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">Explore our range of premium accommodations. Perfect for wedding guests or corporate stays.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 mb-12 flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold mb-2 block">Room Type</label>
            <CustomSelect 
              value={filterType} 
              onChange={e => setFilterType(e.target.value)}
              options={uniqueTypes}
              placeholder="Select Room Type"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold mb-2 block">AC / Non-AC</label>
            <CustomSelect 
              value={filterAc} 
              onChange={e => setFilterAc(e.target.value)}
              options={["All", "AC", "Non-AC"]}
              placeholder="Select AC Preference"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs tracking-widest uppercase text-zinc-400 font-semibold mb-2 block">Status</label>
            <CustomSelect 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={["All", "Available", "Booked", "Reserved"]}
              placeholder="Select Status"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRooms.map((room, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={room.image} alt={room.type} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className={`absolute top-4 right-4 px-3 py-1.5 text-xs tracking-widest uppercase font-semibold rounded-full shadow-sm backdrop-blur-md ${
                    room.status === 'Available' ? 'bg-green-500/90 text-white border border-green-400/50' : 
                    room.status === 'Booked' ? 'bg-red-500/90 text-white border border-red-400/50' : 
                    room.status === 'Reserved' ? 'bg-blue-500/90 text-white border border-blue-400/50' : 'bg-amber-500/90 text-white border border-amber-400/50'
                  }`}>
                    {room.status}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md text-white px-3 py-1.5 text-xs rounded-full uppercase tracking-wider border border-white/10">
                    Room {room.id}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-serif text-zinc-900 group-hover:text-amber-600 transition-colors">{room.type}</h3>
                    <div className="text-amber-600 font-medium whitespace-nowrap bg-amber-50 px-3 py-1 rounded-full text-sm">₹{room.price}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8 flex-1">
                    <span className="text-xs bg-zinc-50 border border-zinc-100 text-zinc-600 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Icon icon="solar:users-group-rounded-linear" className="text-amber-500" /> {room.capacity} Guests</span>
                    <span className="text-xs bg-zinc-50 border border-zinc-100 text-zinc-600 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Icon icon="solar:snowflake-linear" className="text-amber-500" /> {room.ac}</span>
                    <span className="text-xs bg-zinc-50 border border-zinc-100 text-zinc-600 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Icon icon="solar:stairs-linear" className="text-amber-500" /> Floor {room.floor}</span>
                  </div>
                  <button 
                    disabled={room.status !== 'Available'}
                    className={`w-full py-4 rounded-xl uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      room.status === 'Available' 
                        ? 'bg-zinc-900 text-white hover:bg-amber-500 hover:text-zinc-900 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]' 
                        : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      window.location.href = `/booking?type=room&roomId=${room.id}`;
                    }}
                  >
                    {room.status === 'Available' ? 'Book Room' : 'Unavailable'}
                    {room.status === 'Available' && <Icon icon="solar:arrow-right-linear" className="text-base" />}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomsPage;
