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
  return <>do something here!</>;
}
