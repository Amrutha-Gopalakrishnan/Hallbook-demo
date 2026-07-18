"use client";
import React from "react";
import DeluxeRoom from "../assets/ac.png";
import PremierSuite from "../assets/ac2.png";
import PresidentialSuite from "../assets/nonac.png";
import EventHall from "../assets/dinning2.png";

const Card = ({
	title,
	description,
	color,
	textColor,
	i,
	src,
	link,
	total,
}) => {
	const isLast = i === total - 1;
	return (
		<div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4" id="rooms">
			<a 
				href={isLast ? "/booking?type=room" : (link || "#")}
				className="relative flex flex-col h-[300px] w-[700px] py-12 px-10 md:px-12
				rotate-0 md:h-[400px] md:w-[600px] items-center justify-center mx-auto 
				shadow-md pr-3 pl-3 pt-3 pb-4 overflow-hidden rounded-3xl group block hover:scale-[1.02] transition-transform duration-300"
				style={{backgroundColor: color}}
			>
				<span className="font-bold relative text-5xl md:text-7xl mt-5 z-10">
					<span
						className="relative z-10 font-tiemposHeadline font-black tracking-tight"
						style={{color: textColor}}
					>
						{title}
					</span>
				</span>
				<div
					className="font-manrope text-lg md:text-2xl font-medium text-center mb-0 z-10 mt-2 lowercase tracking-wide"
					style={{lineHeight: 1.4, color: textColor}}
				>
					{description}
				</div>

				{isLast && (
					<div className="mt-5 z-5">
						<span 
							className="inline-block px-5 py-3 text-lg md:text-xl font-bold uppercase tracking-widest bg-amber-400 text-zinc-950 hover:bg-white hover:text-amber-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(245,158,11,0.3)] rounded-full"
						>
							Book Now
						</span>
					</div>
				)}

				<div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
					<img
						className="w-full h-full object-cover"
						src={src}
						alt={title}
					/>
				</div>
			</a>
		</div>
	);
};

const CardsParallax = ({items}) => {
	return (
		<div className="min-h-screen">
			{items.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} total={items.length} />;
			})}
		</div>
	);
};

const roomHallItems = [
	{
		title: "Deluxe AC Room",
		description: "comfortable guest accommodations featuring premium cooling and modern styling.",
		tag: "Room",
		src: DeluxeRoom,
		link: "/rooms",
		color: "#1e293b",
		textColor: "#fbbf24",
	},
	{
		title: "Majestic Event Hall",
		description: "soaring ceilings and elegant chandeliers for grand weddings and celebrations.",
		tag: "Hall",
		src: EventHall,
		link: "/booking?type=hall",
		color: "#312e81",
		textColor: "#fcd34d",
	},
	{
		title: "Premium AC Suite",
		description: "luxurious suites with expanded living space, perfect for families.",
		tag: "Room",
		src: PremierSuite,
		link: "/rooms",
		color: "#0f172a",
		textColor: "#fbcfe8",
	},
	{
		title: "Standard Non-AC Room",
		description: "affordable elegance with classic comfort and convenient amenities.",
		tag: "Room",
		src: PresidentialSuite,
		link: "/rooms",
		color: "#27272a",
		textColor: "#a7f3d0",
	}
];

export default function Rooms() {
	return (
		<section className="py-24 bg-zinc-950" id="rooms">
			<div className="container mx-auto px-4 md:px-8 mb-12 text-center">
				<div className="flex items-center justify-center gap-4 mb-4">
					<div className="w-8 h-[1px] bg-amber-400"></div>
					<span className="tracking-widest uppercase text-sm font-semibold text-amber-500">Our Spaces</span>
					<div className="w-8 h-[1px] bg-amber-400"></div>
				</div>
				<h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
					Refined <span className="italic text-amber-400">Living & Event</span> Spaces
				</h2>
			</div>
			<CardsParallax items={roomHallItems} />
		</section>
	);
}

export { CardsParallax };
