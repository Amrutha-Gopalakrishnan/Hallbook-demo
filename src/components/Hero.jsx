"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import Hero1 from "../assets/hero1.jpg";
import Hero2 from "../assets/hero2.jpg";
import Hero3 from "../assets/hero3.jpg";

const slides = [Hero1, Hero2, Hero3];

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 bg-zinc-950"
      ref={containerRef}
      id="home"
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookClick = (tab) => {
    navigate(`/booking?type=${tab}`);
  };

  return (
    <>
      <ContainerScroll titleComponent={null}>
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
          {/* Background Image Slides */}
          <div className="absolute inset-0 z-0">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={slide} alt="Aurelian Reserve" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute inset-0 bg-zinc-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
          </div>

          {/* Text and buttons overlaid directly inside the image */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto py-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-serif mb-4 leading-tight">
              Aurelian Reserve <br/> 
              <span className="italic text-amber-400">Where Elegance Meets Tradition</span>
            </h1>
            
            <p className="text-zinc-200 tracking-widest uppercase text-[10px] md:text-xs max-w-xl mt-4 leading-relaxed mx-auto">
              Premium event spaces and comfortable accommodation for weddings, receptions, family gatherings, and special occasions.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <button
                onClick={() => handleBookClick('room')}
                className="group flex items-center justify-between gap-4 rounded-none border border-amber-400 bg-zinc-950/40 backdrop-blur-sm px-6 py-3.5 transition-all duration-300 hover:bg-amber-400 w-56 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="solar:bed-linear" className="text-xl text-amber-400 group-hover:text-zinc-950 transition-colors" />
                  <span className="font-serif text-base tracking-wide text-white group-hover:text-zinc-950 transition-colors">Book Room</span>
                </div>
                <Icon icon="solar:arrow-right-linear" className="text-lg text-amber-400 group-hover:text-zinc-950 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleBookClick('hall')}
                className="group flex items-center justify-between gap-4 rounded-none border border-amber-400 bg-amber-400 px-6 py-3.5 transition-all duration-300 hover:bg-white hover:border-white w-56 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="solar:buildings-2-linear" className="text-xl text-zinc-950 transition-colors" />
                  <span className="font-serif text-base tracking-wide text-zinc-950 transition-colors">Book Hall</span>
                </div>
                <Icon icon="solar:arrow-right-linear" className="text-lg text-zinc-950 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${index === currentSlide ? 'bg-amber-400 w-6' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </ContainerScroll>
    </>
  );
}