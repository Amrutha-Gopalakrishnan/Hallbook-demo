import Offer1 from "../assets/hero1.jpg";
import Offer2 from "../assets/hero1.jpg";

const offers = [
  {
    title: "Romantic Getaway",
    desc: "Experience an unforgettable weekend with complimentary champagne and a couple's spa treatment.",
    image: Offer1,
    tag: "Specials"
  },
  {
    title: "Extended Stay",
    desc: "Stay longer and save. Enjoy 20% off when you book for 5 nights or more.",
    image: Offer2,
    tag: "Discount"
  }
];

const Offers = () => {
  return (
    <section className="py-24 bg-white" id="offers">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-amber-400"></div>
            <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">Exclusive</span>
            <div className="w-8 h-[1px] bg-amber-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-950 mb-6">
            Special <span className="italic text-amber-700">Offers</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {offers.map((offer, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-amber-400 text-zinc-950 px-3 py-1 text-xs tracking-widest uppercase font-semibold">
                  {offer.tag}
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-3 text-zinc-950 group-hover:text-amber-700 transition-colors">{offer.title}</h3>
              <p className="text-zinc-600 mb-4">{offer.desc}</p>
              <span className="text-sm uppercase tracking-widest font-semibold border-b border-amber-400 pb-1 text-zinc-950">
                View Details
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
