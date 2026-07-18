import { useState } from 'react';

const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section className="py-24 bg-zinc-50" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-400"></div>
              <span className="tracking-widest uppercase text-sm font-semibold text-amber-700">Enquiries</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-zinc-950 leading-tight">
              Get in <span className="italic text-amber-700">Touch</span>
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border-b border-zinc-300 py-3 bg-transparent outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border-b border-zinc-300 py-3 bg-transparent outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  className="w-full border-b border-zinc-300 py-3 bg-transparent outline-none focus:border-amber-400 transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="inline-block border-2 border-zinc-900 text-white-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-zinc-900 hover:text-white transition-all rounded-xl hover:shadow-lg bg-zinc-950 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-400 hover:text-zinc-950 transition-colors">
                {isSent ? "Message Sent Successfully!" : "Send Message"}
              </button>
            </form>
          </div>
          
          <div className="w-full lg:w-1/2 h-[400px] lg:h-auto bg-zinc-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528000654!2d-74.14448744570077!3d40.69763123330691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
