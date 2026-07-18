import { Icon } from '@iconify/react';

const servicesList = [
  { icon: 'solar:hearts-linear', title: 'Wedding Venue', desc: 'Grand hall for traditional and modern weddings.' },
  { icon: 'solar:cup-star-linear', title: 'Reception Hall', desc: 'Elegant setups for memorable evening receptions.' },
  { icon: 'solar:rings-linear', title: 'Engagement Ceremony', desc: 'Intimate spaces for your pre-wedding celebrations.' },
  { icon: 'solar:confetti-linear', title: 'Birthday Celebration', desc: 'Versatile areas perfect for parties of any size.' },
  { icon: 'solar:case-round-linear', title: 'Corporate Events', desc: 'Professional environment for meetings and conferences.' },
  { icon: 'solar:bed-linear', title: 'Room Accommodation', desc: 'Comfortable guest rooms for hosts and VIP attendees.' },
];

const Amenities = () => {
  return (
    <section className="py-24 bg-zinc-950 text-zinc-50" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-amber-400"></div>
            <span className="tracking-widest uppercase text-sm font-semibold text-amber-400">Our Offerings</span>
            <div className="w-8 h-[1px] bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Premium <span className="italic text-amber-400">Services</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((item, index) => (
            <div key={index} className="p-8 border border-zinc-800 hover:border-amber-400/50 transition-colors group">
              <Icon icon={item.icon} className="text-4xl text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-serif mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
