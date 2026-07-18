const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-zinc-800 pb-16 mb-8">
          <div>
            <h3 className="text-2xl font-serif text-white mb-6">Aurelian Reserve</h3>
            <p className="text-sm mb-6">
              The premier destination for exquisite events and comfortable accommodations. Where elegance meets tradition.
            </p>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Explore</h4>
            <ul className="space-y-3">
              {['Event Hall', 'Guest Rooms', 'Services', 'Gallery', 'Bookings'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase().split(' ')[0]}`} className="hover:text-amber-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>123 Grand Avenue, City Center</li>
              <li>Chennai, TN 600001</li>
              <li>+91 98765 43210</li>
              <li>info@aurelianreserve.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for exclusive offers and updates.</p>
            <form className="flex border-b border-zinc-700 pb-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent w-full outline-none text-white placeholder-zinc-600"
              />
              <button className="text-amber-400 uppercase tracking-widest text-xs font-semibold hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Aurelian Reserve. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/admin" className="hover:text-white transition-colors text-amber-500 font-semibold">Admin Demo</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
