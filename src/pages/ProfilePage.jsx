import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCurrentUser, getUserBookings, logoutUser } from '../data/db';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState({ hallBookings: [], roomBookings: [] });

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      window.location.href = '/';
      return;
    }
    setUser(currentUser);
    setBookings(getUserBookings(currentUser.email));
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
  };

  if (!user) return null;

  return (
    <div className="bg-zinc-50 min-h-screen pt-24">
      <Navbar isInnerPage={true} />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 p-8 text-center sticky top-32">
              <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-serif text-zinc-900 font-bold mb-1">{user.name}</h2>
              <p className="text-zinc-500 text-sm mb-8">{user.email}</p>

              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-amber-50 text-amber-700 font-medium">
                  <Icon icon="solar:ticket-linear" className="text-xl" />
                  My Bookings
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-50 text-red-600 hover:text-red-700 font-medium">
                  <Icon icon="solar:logout-2-linear" className="text-xl" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          <main className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 p-8 md:p-12">
              <h1 className="text-3xl font-serif text-zinc-900 mb-8 border-b border-zinc-100 pb-6">Your Bookings</h1>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-lg font-bold text-zinc-700 mb-6 flex items-center gap-2">
                    <Icon icon="solar:buildings-2-bold-duotone" className="text-amber-500 text-2xl" /> Hall Bookings
                  </h3>
                  {bookings.hallBookings.length === 0 ? (
                    <p className="text-zinc-500 italic bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-center">No hall bookings found.</p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.hallBookings.map(b => (
                        <div key={b.id} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">{b.date}</div>
                            <h4 className="font-serif text-xl text-zinc-900">{b.type}</h4>
                            <p className="text-sm text-zinc-500 mt-1">{b.guests} Guests • Booking ID: {b.id}</p>
                          </div>
                          <span className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 w-fit">
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-700 mb-6 flex items-center gap-2">
                    <Icon icon="solar:bed-bold-duotone" className="text-amber-500 text-2xl" /> Room Bookings
                  </h3>
                  {bookings.roomBookings.length === 0 ? (
                    <p className="text-zinc-500 italic bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-center">No room bookings found.</p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.roomBookings.map(b => (
                        <div key={b.id} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">{b.checkIn} to {b.checkOut}</div>
                            <h4 className="font-serif text-xl text-zinc-900">Room {b.roomId}</h4>
                            <p className="text-sm text-zinc-500 mt-1">{b.occupancy} • Booking ID: {b.id}</p>
                          </div>
                          <span className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 w-fit">
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
