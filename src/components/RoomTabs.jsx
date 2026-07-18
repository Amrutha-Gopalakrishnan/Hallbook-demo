import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDB } from '../data/db';

const RoomTabs = () => {
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const dbRooms = getDB().rooms;
    const uniqueTypes = [...new Set(dbRooms.map(r => r.type))].slice(0, 4);
    const featured = uniqueTypes.map(type => dbRooms.find(r => r.type === type));
    setRooms(featured);
    if (featured.length > 0) setActiveTab(featured[0].id);
  }, []);

  const activeRoom = rooms.find(r => r.id === activeTab);

  if (rooms.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50" id="rooms">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-amber-400"></div>
            <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">Accommodations</span>
            <div className="w-8 h-[1px] bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-950 mb-6">
            Featured <span className="italic text-amber-700">Guest Rooms</span>
          </h2>
        </div>

        <div className="flex justify-center flex-wrap space-x-4 md:space-x-8 mb-12">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveTab(room.id)}
              className={`uppercase tracking-widest text-sm font-medium pb-2 border-b-2 transition-colors mb-4 ${
                activeTab === room.id ? 'border-amber-400 text-zinc-950' : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {room.type}
            </button>
          ))}
        </div>

        {activeRoom && (
          <div className="relative h-[650px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="flex flex-col md:flex-row h-full gap-8 md:gap-0 bg-white shadow-xl">
                  <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden group">
                    <img src={activeRoom.image} alt={activeRoom.type} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={`absolute top-4 right-4 px-3 py-1 text-xs tracking-widest uppercase font-semibold ${
                      activeRoom.status === 'Available' ? 'bg-green-500 text-white' : 
                      activeRoom.status === 'Booked' ? 'bg-red-500 text-white' : 
                      activeRoom.status === 'Reserved' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {activeRoom.status}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-serif mb-4 text-zinc-950">{activeRoom.type}</h3>
                    <p className="text-amber-700 text-xl font-serif mb-6">₹{activeRoom.price.toLocaleString()} <span className="text-sm font-sans text-zinc-500">/ night</span></p>
                    <p className="text-zinc-600 mb-8">Comfortable accommodations perfect for event guests and extended stays. Includes premium amenities and attached bath.</p>
                    
                    <div className="grid grid-cols-2 gap-y-4 mb-8">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-zinc-400 block mb-1">Capacity</span>
                        <span className="font-medium text-zinc-950">{activeRoom.capacity} Guests</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-zinc-400 block mb-1">Type</span>
                        <span className="font-medium text-zinc-950">{activeRoom.ac}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        window.location.href = `/booking?type=room&roomId=${activeRoom.id}`;
                      }}
                      className="self-start bg-zinc-900 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-amber-500 hover:text-zinc-900 transition-all shadow-lg hover:shadow-[0_8px_30px_rgb(245,158,11,0.25)] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={activeRoom.status !== 'Available'}
                    >
                      {activeRoom.status === 'Available' ? 'Book Room' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <a href="/rooms" className="inline-block border-2 border-zinc-900 text-zinc-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 hover:text-white transition-all rounded-xl hover:shadow-lg">
            View All Rooms
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoomTabs;
