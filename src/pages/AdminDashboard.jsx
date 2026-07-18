import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BedDouble, Users, IndianRupee, BellRing, Settings, RotateCcw } from 'lucide-react';
import { getDB, resetDB } from '../data/db';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [db, setDb] = useState(null);

  useEffect(() => {
    setDb(getDB());
  }, []);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all demo data?")) {
      setDb(resetDB());
      alert("Demo data reset successfully.");
    }
  };

  if (!db) return null;

  const totalRevenue = db.roomBookings.length * 3500 + db.hallBookings.length * 150000;
  const occupiedRooms = db.rooms.filter(r => r.status === 'Booked' || r.status === 'Reserved').length;

  const stats = [
    { title: "Total Bookings", value: db.hallBookings.length + db.roomBookings.length, icon: "solar:calendar-date-linear", trend: "+20%" },
    { title: "Est. Revenue", value: `₹${(totalRevenue/100000).toFixed(1)}L`, icon: "solar:wallet-money-linear", trend: "+15%" },
    { title: "Occupied Rooms", value: `${occupiedRooms}/${db.rooms.length}`, icon: "solar:bed-linear", trend: `${Math.round((occupiedRooms/db.rooms.length)*100)}%` },
    { title: "Upcoming Events", value: db.hallBookings.length, icon: "solar:confetti-linear", trend: "This Week" },
  ];

  const allBookings = [
    ...db.hallBookings.map(b => ({ ...b, itemType: `Hall (${b.type})`, dateDisplay: b.date })),
    ...db.roomBookings.map(b => ({ ...b, itemType: `Room (${b.roomId})`, dateDisplay: `${b.checkIn} to ${b.checkOut}` }))
  ].sort((a, b) => new Date(b.dateDisplay) - new Date(a.dateDisplay));

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans">
      <aside className="w-64 bg-zinc-950 text-zinc-400 p-6 flex flex-col hidden md:flex h-screen sticky top-0">
        <div className="font-serif text-2xl text-white mb-12">Aurelian Admin</div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<CalendarDays size={20} />} label="Hall Bookings" active={activeTab === 'hall'} onClick={() => setActiveTab('hall')} />
          <NavItem icon={<BedDouble size={20} />} label="Room Bookings" active={activeTab === 'rooms'} onClick={() => setActiveTab('rooms')} />
          <NavItem icon={<Users size={20} />} label="Customers" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
        </nav>
        
        <div className="pt-6 border-t border-zinc-800 space-y-2">
          <button onClick={handleReset} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-red-400">
            <RotateCcw size={20} />
            <span className="font-medium">Reset Demo Data</span>
          </button>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-900 transition-colors mt-auto text-amber-500">
            <Icon icon="solar:exit-linear" className="text-xl" />
            <span className="font-medium">Exit Admin</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif text-zinc-900">Dashboard Overview</h1>
            <p className="text-zinc-500">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="p-2 relative text-zinc-500 hover:text-zinc-900 transition-colors">
              <BellRing size={24} />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-amber-500 flex items-center justify-center font-bold text-amber-800">
              A
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Icon icon={stat.icon} className="text-2xl" />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
              </div>
              <h3 className="text-zinc-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-serif text-zinc-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
            <h2 className="text-xl font-serif text-zinc-900">All Booking Requests</h2>
            <button className="text-sm font-medium text-amber-600 hover:text-amber-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 text-zinc-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date(s)</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {allBookings.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">{row.name}</div>
                      <div className="text-xs text-zinc-500">ID: {row.id}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">{row.itemType}</td>
                    <td className="px-6 py-4 text-zinc-600 text-sm">{row.dateDisplay}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {row.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button className="text-green-600 bg-green-50 p-2 rounded hover:bg-green-100 transition-colors">
                            <Icon icon="solar:check-circle-linear" className="text-lg" />
                          </button>
                          <button className="text-red-600 bg-red-50 p-2 rounded hover:bg-red-100 transition-colors">
                            <Icon icon="solar:close-circle-linear" className="text-lg" />
                          </button>
                        </div>
                      ) : (
                        <button className="text-zinc-400 hover:text-zinc-600">
                          <Icon icon="solar:menu-dots-bold" className="text-lg" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {allBookings.length === 0 && (
                  <tr><td colSpan="5" className="text-center py-8 text-zinc-500">No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-amber-500 text-zinc-950 font-medium shadow-lg' : 'hover:bg-zinc-900 hover:text-zinc-200'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default AdminDashboard;
