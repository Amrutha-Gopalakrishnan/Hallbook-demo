"use client";
import React from "react";
import { PerspectiveCarousel } from "./ui/perspective-carousel";
import Gallery1 from "../assets/gallery1.png";
import Garden from "../assets/garden.png";
import Hero1 from "../assets/hero1.jpg";
import Hero2 from "../assets/hero2.jpg";
import Hero3 from "../assets/hero3.jpg";
import Dinning1 from "../assets/dinning1.png";

const items = [
  { src: Gallery1 },
  { src: Garden },
  { src: Hero1 },
  { src: Hero2 },
  { src: Hero3 },
  { src: Dinning1 }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-zinc-950" id="gallery">
      <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-amber-400"></div>
          <span className="tracking-widest uppercase text-sm font-semibold text-amber-500">Gallery</span>
          <div className="w-8 h-[1px] bg-amber-400"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Moments of <span className="italic text-amber-400">Serenity</span>
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <PerspectiveCarousel
          items={items}
          defaultActiveIndex={2}
          slideWidth={280}
          className="h-[560px] bg-zinc-900/50 text-zinc-100 rounded-3xl border border-zinc-800"
        />
      </div>
    </section>
  );
}

export { items };
