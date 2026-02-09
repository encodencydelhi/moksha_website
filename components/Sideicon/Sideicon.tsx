"use client";

import {
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const SocialSidebar = () => {
  const socialLinks = [
    {
      icon: <FaWhatsapp size={20} />,
      url: "https://wa.me/919310219283",
      color: "#25D366",
      label: "WhatsApp",
    },
    {
      icon: <FaTelegram size={20} />,
      url: "https://t.me/yourusername",
      color: "#0088cc",
      label: "Telegram",
    },
    {
      icon: <FaFacebook size={20} />,
      url: "https://facebook.com/yourpage",
      color: "#1877F2",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin size={20} />,
      url: "https://linkedin.com/in/yourprofile",
      color: "#0077B5",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube size={20} />,
      url: "https://youtube.com/yourchannel",
      color: "#FF0000",
      label: "YouTube",
    },
  ];

  return (
    <>
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

      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden flex flex-col gap-3 py-3 px-2 rounded-full  shadow-xl border border-gray-200">
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
    </>
  );
};

export default SocialSidebar;
