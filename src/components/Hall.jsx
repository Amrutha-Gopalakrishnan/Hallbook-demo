import RestaurantImage from "../assets/dinning2.png";
import { Icon } from '@iconify/react';

const Restaurant = () => {
  return (
    <section className="py-24 bg-white" id="hall">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="w-full lg:w-1/2">
            <img 
              src={RestaurantImage} 
              alt="Grand Event Hall" 
              className="w-full aspect-[4/3] object-cover rounded-sm shadow-2xl"
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-400"></div>
              <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">The Grand Venue</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-zinc-950 leading-tight">
              Majestic <span className="italic text-amber-700">Event Hall</span>
            </h2>
            <p className="text-zinc-600 mb-8 leading-relaxed">
              Our signature event hall boasts soaring ceilings, elegant chandeliers, and a spacious layout designed to accommodate your grandest visions. Fully equipped with central air conditioning and acoustic treatments to ensure a flawless experience.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Icon icon="solar:users-group-rounded-linear" className="text-amber-500 text-xl" />
                <span className="text-sm font-medium text-zinc-800">1000 Seating Capacity</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:cup-star-linear" className="text-amber-500 text-xl" />
                <span className="text-sm font-medium text-zinc-800">500 Dining Capacity</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:lightbulb-bolt-linear" className="text-amber-500 text-xl" />
                <span className="text-sm font-medium text-zinc-800">Generator Backup</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="solar:magic-stick-3-linear" className="text-amber-500 text-xl" />
                <span className="text-sm font-medium text-zinc-800">Decoration Support</span>
              </div>
            </div>
            
            <a href="/booking?type=hall" className="inline-block border-2 border-zinc-900 text-zinc-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 hover:text-white transition-all rounded-xl hover:shadow-lg inline-block border border-zinc-950 text-zinc-950 px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-zinc-950 hover:text-white transition-colors">
              Check Availability
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
