"use client";

import Link from "next/link";
import { type Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Music, BarChart2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedHomePageProps {
  session: Session | null;
}

export default function AnimatedHomePage({ session }: AnimatedHomePageProps) {
  return (
    <div className="flex flex-col items-center">

      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="90%">
              <stop offset="0%" stopColor="#ff7eb3" />
              <stop offset="100%" stopColor="#e3faec" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gradient)" />
        </svg>
      </motion.div>


      {/* BODY */}
      <section className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-green-50 to-gray-50 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-5xl lg:text-6xl">
            meow meow meow
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            let's look at your spotify stats!!
          </p>
          <div className="mt-8">
            <Link href="/login">
              <button className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium shadow-md">

                :3

              </button>
            </Link>
          </div>





        </div>



      </section>


      {/* FEATURE SECTION */}
      <section className="w-full bg-gray-50 py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl">
            Explore your stats
          </h2>
          <p className="mt-4 text-center text-gray-600 sm:text-lg">
            See insights onto what you're listening to
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Music size={40} />}
              title="Top Tracks"
              description="your fav songs"
            />
            <FeatureCard
              icon={<BarChart2 size={40} />}
              title="Top Artists"
              description="who you're listening to right now"
            />
            <FeatureCard
              icon={<Clock size={40} />}
              title="Listening  History"
              description="everything"
            />
          </div>
        </div>
      </section>


      {/* BREAKS TO MAKE IT LOOK NICE */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* CALL TO ACTION */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
          Call to Action
        </h2>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          Some text will go here
        </p>
        <div className="mt-8">
          <Link href="/login">
            <button className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium shadow-md">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-green-500 mb-4">
        {icon} {/* Icon element */}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}