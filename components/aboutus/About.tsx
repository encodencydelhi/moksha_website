"use client";
import React from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {" "}
      <Topbar /> <Navbar />
      <div className="bg-[#8B6A3E] py-16">
        <div className="w-full px-4 md:px-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-3">
            Contact Us
          </h1>
          <p className="text-white text-center text-lg md:text-xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out for queries, partnerships, or
            participation details.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
