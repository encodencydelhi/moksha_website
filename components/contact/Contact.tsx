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
      <div className="bg-[#8B6A3E] py-12 md:py-16">
        <div className="w-full px-3 sm:px-4 md:px-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2 tracking-tight">
            Contact Us
          </h1>
          <div className="w-12 h-0.5 bg-white mx-auto mb-3"></div>
          <p className="text-white text-center text-sm md:text-base max-w-xl mx-auto">
            We'd love to hear from you. Reach out for queries, partnerships, or
            participation details.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-10 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-3 md:gap-4">
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 group min-h-0">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8B6A3E]/10 group-hover:bg-[#8B6A3E]/15 transition-all duration-300">
                <FaBuilding className="text-[#8B6A3E] text-lg" />
              </div>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-[#8B6A3E]/5 text-[#8B6A3E] border border-[#8B6A3E]/10">
                Main
              </span>
            </div>
            <h3 className="font-medium text-base text-gray-800 mb-1.5 group-hover:text-[#8B6A3E] transition-colors duration-300">
              Head Office
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs leading-relaxed">
                12/52 Sunrise Industrial Area, Mohan Nagar, Ghaziabad, Uttar
                Pradesh
              </p>
              <div className="pt-1.5 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-normal">
                  Pin Code: 201007
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 group min-h-0">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8B6A3E]/10 group-hover:bg-[#8B6A3E]/15 transition-all duration-300 mb-3">
              <FaBuilding className="text-[#8B6A3E] text-lg" />
            </div>
            <h3 className="font-medium text-base text-gray-800 mb-1.5 group-hover:text-[#8B6A3E] transition-colors duration-300">
              Branch Office
            </h3>
            <p className="text-gray-600 text-xs font-normal mb-1">Ghaziabad</p>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs leading-relaxed">
                KK-1, Surdas Marg, Sector 17A, Kavi Nagar Industrial Area,
                Ghaziabad
              </p>
              <div className="pt-1.5 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-normal">
                  Pin Code: 201001
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 group min-h-0">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8B6A3E]/10 group-hover:bg-[#8B6A3E]/15 transition-all duration-300 mb-3">
              <FaBuilding className="text-[#8B6A3E] text-lg" />
            </div>
            <h3 className="font-medium text-base text-gray-800 mb-1.5 group-hover:text-[#8B6A3E] transition-colors duration-300">
              Branch Office
            </h3>
            <p className="text-gray-600 text-xs font-normal mb-1">Delhi</p>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs leading-relaxed">
                Ground Floor, Main Market, E-1, opposite KFC, Kalkaji
              </p>
              <div className="pt-1.5 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-normal">
                  Pin Code: 110019
                </p>
              </div>
            </div>
          </div>

          {/* Mumbai Branch */}
          <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 group min-h-0">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8B6A3E]/10 group-hover:bg-[#8B6A3E]/15 transition-all duration-300 mb-3">
              <FaBuilding className="text-[#8B6A3E] text-lg" />
            </div>
            <h3 className="font-medium text-base text-gray-800 mb-1.5 group-hover:text-[#8B6A3E] transition-colors duration-300">
              Branch Office
            </h3>
            <p className="text-gray-600 text-xs font-normal mb-1">Mumbai</p>
            <div className="space-y-2">
              <p className="text-gray-700 text-xs leading-relaxed">
                212 Bussa Industrial Estate, Lower Parel, Mumbai
              </p>
              <div className="pt-1.5 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-normal">
                  Pin Code: 400013
                </p>
                <p className="text-gray-500 text-xs mt-0.5">Maharashtra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl px-3 sm:px-4 md:px-10 py-8 md:py-12 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 tracking-tight">
              Get in touch
            </h2>
            <p className="text-gray-600 text-sm mb-6 md:mb-8">
              Our team will respond within 1-2 business days.
            </p>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#8B6A3E]/10 p-2 md:p-3 rounded-full shrink-0">
                  <FaBuilding className="text-[#8B6A3E] text-lg md:text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-base md:text-lg text-gray-800 mb-1.5 md:mb-2">
                    Venue
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Hall No. 11, Bharat Mandapam (Pragati Maidan)
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#8B6A3E]/10 p-2 md:p-3 rounded-full shrink-0">
                  <FaMapMarkerAlt className="text-[#8B6A3E] text-lg md:text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-base md:text-lg text-gray-800 mb-1.5 md:mb-2">
                    Location
                  </h3>
                  <p className="text-gray-600 text-sm">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#8B6A3E]/10 p-2 md:p-3 rounded-full shrink-0">
                  <FaPhoneAlt className="text-[#8B6A3E] text-lg md:text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-base md:text-lg text-gray-800 mb-1.5 md:mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-600 text-sm">+91-9654900525</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-[#8B6A3E]/10 p-2 md:p-3 rounded-full shrink-0">
                  <FaEnvelope className="text-[#8B6A3E] text-lg md:text-xl" />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-base md:text-lg text-gray-800 mb-1 md:mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4">
                    info@organicexpo.in
                  </p>

                  <div className="flex items-center gap-3 md:gap-4 pt-1.5 md:pt-2 border-t border-gray-200">
                    {[FaFacebook, FaTwitter, FaLinkedin, FaYoutube].map(
                      (Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#8B6A3E] hover:text-white text-gray-600 transition-all duration-300 text-sm"
                        >
                          <Icon />
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 md:p-6 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 tracking-tight">
              Send us a message
            </h3>

            <form className="space-y-3 md:space-y-4">
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
                />
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
              />
              <input
                type="text"
                required
                placeholder="Subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
              />

              <textarea
                rows={3}
                required
                placeholder="Your Message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#8B6A3E] text-sm"
              />

              <button
                type="submit"
                className="w-full bg-[#8B6A3E] hover:bg-[#755732] text-white font-medium py-2.5 px-5 rounded-md transition duration-200 flex items-center justify-center gap-1.5 text-sm"
              >
                <FaPaperPlane size={12} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.534949739743!2d77.24169897530307!3d28.635675075660614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4ef652492d%3A0x30a0a03d7b1764f5!2sBharat%20Mandapam%20(Pragati%20Maidan)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="w-full"
          title="Bharat Mandapam Location"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
