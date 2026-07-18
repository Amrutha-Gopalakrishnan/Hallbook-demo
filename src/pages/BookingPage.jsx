import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingSection from '../components/BookingSection';
import { useEffect } from 'react';

const BookingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-zinc-50 min-h-screen ">
     <div className="container mx-auto pt-5 sticky top-0 z-50 w-full">
    <Navbar isInnerPage={true} isLight={true}/>
</div>
      <div className="container mx-auto pb-12 mt-10">
        <BookingSection />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
