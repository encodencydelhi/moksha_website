"use client";

import {
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const SocialSidebar = () => {
  const socialLinks = [
    {
      icon: <FaTelegram size={20} />,
      url: "https://t.me/9310219283",
      color: "#0088cc",
      label: "Telegram",
    },
    {
      icon: <FaFacebook size={20} />,
      url: "https://www.facebook.com/",
      color: "#1877F2",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/",
      color: "#0077B5",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube size={20} />,
      url: "https://www.youtube.com/",
      color: "#FF0000",
      label: "YouTube",
    },
  ];

  const whatsappLink = {
    icon: <FaWhatsapp size={20} />,
    url: "https://wa.me/919310219283?text=Hello%20I%20need%20information",
    color: "#25D366",
    label: "WhatsApp",
  };

  const phoneLink = {
    icon: <FaPhone size={20} />,
    url: "tel:+919310219283",
    color: "#4CAF50",
    label: "Call Us",
  };

  return (
    <>
      {/* Right Side - Social Icons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
              style={{ color: social.color }}
            >
              {social.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Left Side - Enquiry and Emergency stacked with gap */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {/* Enquiry Button */}
        <div
          className="px-1 py-4 rounded flex items-center justify-center shadow-xl border border-gray-200"
          style={{
            color: "white",
            backgroundColor: "#dc2626",
            borderLeft: "none",
          }}
        >
          <span
            className="font-semibold text-md tracking-wide flex items-center gap-2"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            ENQUIRY
            <FaEnvelope size={14} />
          </span>
        </div>

        {/* Emergency Button */}
        <a href="tel:+919310219283">
          <div
            className="px-1 py-4 rounded flex items-center justify-center shadow-xl border border-red-300 hover:bg-red-700 transition-all duration-300 cursor-pointer"
            style={{
              color: "white",
              backgroundColor: "#dc2626",
              borderLeft: "none",
            }}
          >
            <span
              className="font-semibold text-md tracking-wide flex items-center gap-2"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              EMERGENCY
              <FaPhone size={14} />
            </span>
          </div>
        </a>
      </div>

      {/* Bottom Left - WhatsApp Icon */}
      <div className="fixed left-4 bottom-4 z-50 hidden md:flex flex-col gap-2">
        <a
          href={whatsappLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLink.label}
          className="group"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{ color: whatsappLink.color }}
          >
            {whatsappLink.icon}
          </div>
        </a>
      </div>

      {/* Bottom Right - Phone Icon */}
      <div className="fixed right-4 bottom-4 z-50 hidden md:flex flex-col gap-2">
        <a href={phoneLink.url} aria-label={phoneLink.label} className="group">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl animate-bounce"
            style={{ color: phoneLink.color }}
          >
            {phoneLink.icon}
          </div>
        </a>
      </div>

      {/* Mobile View */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden flex flex-col gap-3 py-3 px-2 rounded-full shadow-xl border border-gray-200 bg-white">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
              style={{ color: social.color }}
            >
              {social.icon}
            </div>
          </a>
        ))}

        <a
          href={whatsappLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappLink.label}
          className="group"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{ color: whatsappLink.color }}
          >
            {whatsappLink.icon}
          </div>
        </a>

        <a href={phoneLink.url} aria-label={phoneLink.label} className="group">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{ color: phoneLink.color }}
          >
            {phoneLink.icon}
          </div>
        </a>
      </div>
    </>
  );
};

export default SocialSidebar;
