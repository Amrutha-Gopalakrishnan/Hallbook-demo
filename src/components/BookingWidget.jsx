import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const BookingWidget = () => {
  const scrollToRoomBooking = () => {
    document
      .getElementById("room-booking")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHallBooking = () => {
    document
      .getElementById("hall-booking")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute left-1/2 bottom-0 z-30 w-[92%] max-w-3xl -translate-x-1/2 translate-y-1/2">
      <div className="overflow-hidden rounded-xl border border-amber-300/50 bg-[#fbf8f2]/95 shadow-[0_25px_70px_rgba(0,0,0,0.25)] backdrop-blur-lg">

        {/* Header */}

        <div className="border-b border-amber-200 px-8 py-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-600 font-semibold">
            Reservation
          </p>

          <h2 className="mt-2 font-serif text-3xl text-zinc-900">
            Reserve Your Booking
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Select your preferred reservation type to continue.
          </p>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8">

          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToRoomBooking}
            className="group rounded-lg border border-amber-300 bg-white p-7 text-left transition-all hover:border-amber-500 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Icon
                      icon="solar:bed-linear"
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-zinc-900">
                      Book Room
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Comfortable accommodation for your stay.
                    </p>
                  </div>
                </div>
              </div>

              <Icon
                icon="solar:arrow-right-linear"
                className="text-2xl text-amber-500 transition-transform group-hover:translate-x-2"
              />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToHallBooking}
            className="group rounded-lg border border-amber-300 bg-white p-7 text-left transition-all hover:border-amber-500 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Icon
                      icon="solar:buildings-2-linear"
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-zinc-900">
                      Book Hall
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      Reserve our premium event hall for celebrations.
                    </p>
                  </div>
                </div>
              </div>

              <Icon
                icon="solar:arrow-right-linear"
                className="text-2xl text-amber-500 transition-transform group-hover:translate-x-2"
              />
            </div>
          </motion.button>

        </div>

      </div>
    </div>
  );
};

export default BookingWidget;