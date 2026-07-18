import AboutMain from "../assets/hero1.jpg";
import AboutDetail from "../assets/hero2.jpg";

const About = () => {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src={AboutMain}
                alt="About Mandapam"
                className="w-[90%] aspect-[4/5] object-cover"
              />
              <img
                src={AboutDetail}
                alt="Mandapam detail"
                className="absolute bottom-10 right-0 w-[55%] aspect-square object-cover border-8 border-white shadow-xl"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-400"></div>
              <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">The Aurelian Reserve Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-zinc-950 leading-tight">
              A Legacy of <span className="italic text-amber-700">Excellence</span> in Event Hospitality
            </h2>
            <p className="text-zinc-600 mb-6 leading-relaxed">
              Nestled in the heart of the city, Aurelian Reserve stands as a premier destination for exquisite events and comfortable accommodations. Our commitment to impeccable service and timeless elegance has made us the preferred choice for discerning clientele seeking perfection in every detail.
            </p>
            <p className="text-zinc-600 mb-10 leading-relaxed">
              From majestic wedding ceremonies to corporate conferences, we specialize in creating memorable experiences that blend traditional grandeur with modern sophistication. Our experienced team ensures every event unfolds flawlessly, while our well-appointed guest rooms provide a tranquil retreat for visitors.
            </p>

            <button className="inline-block border-2 border-zinc-900 text-zinc-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 hover:text-white transition-all rounded-xl hover:shadow-lg border border-zinc-950 text-zinc-950 px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-zinc-950 hover:text-white transition-colors">
              Learn About Our Heritage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;