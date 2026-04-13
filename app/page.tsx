"use client";

import Topbar from "../components/topbar/Topbar";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import CompassionSection from "../components/CompassionSection/CompassionSection";
import HowWeHelp from "../components/HowWeHelp/HowWeHelp";
import Serving from "../components/Serving/Serving";
import SacredJourney from "../components/SacredJourney/SacredJourney";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import Sideicon from "../components/Sideicon/Sideicon";
import { useEffect } from "react";
import { trackVisit } from "@/lib/apiClient";

export default function Page() {
  useEffect(() => {
    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("session_id") || ""
        : "";
    const sid =
      sessionId || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("session_id", sid);
    trackVisit({ page: "home", sessionId: sid }).catch(() => null);
  }, []);
  return (
    <div>
      <Sideicon />
      <Topbar />
      <Navbar />
      <Hero />
      <CompassionSection />
      <HowWeHelp />
      <Serving />
      <SacredJourney />
      <FAQ />
      <Footer />
    </div>
  );
}
