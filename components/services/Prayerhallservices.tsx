"use client";
import { useState } from "react";
import Topbar from "../topbar/Topbar";
import Navbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";
import Image from "next/image";
import {
  GiPhone,
  GiTalk,
  GiStarSwirl,
  GiGlobe,
  GiHearts,
  GiFamilyTree,
  GiConversation,
  GiSoundOn,
  GiSurfBoard,
  GiPrayer,
  GiPrayingMantis,
  GiTempleDoor,
  GiChurch,
  GiMeditation,
  GiCandleHolder,
  GiIncense,
  GiFlowerPot,
  GiFlowerStar,
} from "react-icons/gi";
import {
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaPhoneAlt,
  FaClock,
  FaShieldAlt,
  FaWhatsapp,
  FaVideo,
  FaEnvelope,
  FaUsers,
  FaUserFriends,
  FaHeart,
  FaPray,
  FaHands,
  FaPlaceOfWorship,
  FaMosque,
  FaChurch as FaChurchIcon,
  FaTemperatureLow,
} from "react-icons/fa";
import {
  MdVerified,
  MdSupportAgent,
  MdEmergency,
  MdLanguage,
  MdMessage,
  MdPhone,
  MdPhoneCallback,
  MdCall,
  MdCallEnd,
  MdMeetingRoom,
  MdChair,
  MdVolumeUp,
  MdWifi,
  MdAcUnit,
  MdKitchen,
} from "react-icons/md";
import { PiFlowerLotus } from "react-icons/pi";
import {
  BsSuitHeartFill,
  BsChatDots,
  BsTelephone,
  BsTelephoneFill,
  BsBuilding,
  BsDoorOpen,
} from "react-icons/bs";
import { TbMessageCircle, TbPhoneCall, TbCrown } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";

function PrayerHallServices() {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] =
    useState(null);

  const prayerHallServices = [
    {
      id: 1,
      name: "Community Prayer Hall",
      icon: GiTempleDoor,
      description:
        "Spacious prayer hall for community gatherings, daily prayers, and religious ceremonies.",
      longDescription:
        "Large community prayer hall with separate sections for men and women. Ideal for daily prayers, Friday gatherings, and community events. Complete with ablution facilities and sound system.",
      location: "City Center",
      price: "2,999/day",
      rating: 4.9,
      reviews: 234,
      image:
        "https://images.pexels.com/photos/3618557/pexels-photo-3618557.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Separate Sections",
        "AC Hall",
        "Sound System",
        "Ablution Area",
      ],
      coordinatorName: "Mohammad Ali",
      experience: "12+ years",
      responseTime: "2 hours",
      contactNumber: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      alternateNumber: "+91 99887 66554",

      capacity: "500 people",
      amenities: ["Parking", "Wheelchair Access", "CCTV", "Library"],
    },
    {
      id: 2,
      name: "Wedding Prayer Hall",
      icon: GiHearts,
      description:
        "Elegant prayer hall for wedding ceremonies and religious celebrations.",
      longDescription:
        "Beautifully decorated prayer hall perfect for wedding ceremonies, nikah, and other religious celebrations. Includes stage area, bride's room, and catering space.",
      location: "Central Location",
      price: "4,999/day",
      rating: 4.8,
      reviews: 189,
      image:
        "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Stage Area", "Bride Room", "Catering Space", "Decoration"],
      coordinatorName: "Abdul Rahman",
      experience: "15+ years",
      responseTime: "4 hours",
      contactNumber: "+91 98765 43211",
      whatsappNumber: "+91 98765 43211",
      alternateNumber: "+91 99887 66553",

      capacity: "300 people",
      amenities: ["Parking", "Generator", "Catering Kitchen", "Changing Rooms"],
    },
    {
      id: 3,
      name: "Funeral Prayer Hall",
      icon: GiFamilyTree,
      description:
        "Dignified prayer hall for funeral prayers and last rites ceremonies.",
      longDescription:
        "Peaceful and dignified space for funeral prayers (Janazah) and last rites ceremonies. Separate area for family members and facilities for ritual washing.",
      location: "Near Cemetery",
      price: "1,999",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.pexels.com/photos/6605287/pexels-photo-6605287.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Washing Facility",
        "Family Area",
        "Cemetery Access",
        "Parking",
      ],
      coordinatorName: "Qari Mohammad",
      experience: "20+ years",
      responseTime: "1 hour",
      contactNumber: "+91 98765 43212",
      whatsappNumber: "+91 98765 43212",
      alternateNumber: "+91 99887 66552",

      capacity: "200 people",
      amenities: ["Wudu Area", "Parking", "Waiting Area", "CCTV"],
    },
    {
      id: 4,
      name: "Ramadan Special Hall",
      icon: GiStarSwirl,
      description:
        "Special prayer hall for Taraweeh prayers and Iftar gatherings during Ramadan.",
      longDescription:
        "Dedicated hall for Ramadan prayers including Taraweeh, Qiyam-ul-lail, and Iftar gatherings. Complete with kitchen for Iftar preparation and AC for comfort.",
      location: "Multiple Locations",
      price: "3,999/month",
      rating: 4.9,
      reviews: 278,
      image:
        "https://images.pexels.com/photos/4650705/pexels-photo-4650705.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Iftar Kitchen", "AC Hall", "Quran Copies", "Parking"],
      coordinatorName: "Hafiz Usman",
      experience: "10+ years",
      responseTime: "12 hours",
      contactNumber: "+91 98765 43213",
      whatsappNumber: "+91 98765 43213",
      alternateNumber: "+91 99887 66551",

      capacity: "400 people",
      amenities: ["Kitchen", "Dining Area", "Wudu Area", "Projector"],
    },
    {
      id: 5,
      name: "Women's Prayer Hall",
      icon: FaHeart,
      description: "Private and comfortable prayer hall exclusively for women.",
      longDescription:
        "Safe and comfortable prayer space exclusively for women. Includes separate entrance, childcare area, and female instructors for Quran classes.",
      location: "Residential Area",
      price: "1,999/day",
      rating: 4.8,
      reviews: 145,
      image:
        "https://images.pexels.com/photos/4492129/pexels-photo-4492129.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Private Entrance", "Childcare", "Female Staff", "Library"],
      coordinatorName: "Aisha Begum",
      experience: "8+ years",
      responseTime: "3 hours",
      contactNumber: "+91 98765 43214",
      whatsappNumber: "+91 98765 43214",
      alternateNumber: "+91 99887 66550",

      capacity: "150 women",
      amenities: ["Child Room", "Parking", "AC", "Kitchen"],
    },
    {
      id: 6,
      name: "Eid Prayer Ground",
      icon: FaUsers,
      description:
        "Large open prayer ground for Eid-ul-Fitr and Eid-ul-Adha prayers.",
      longDescription:
        "Spacious open ground for Eid prayers accommodating thousands of worshippers. Includes stage for Imam, sound system, and separate areas for women.",
      location: "Open Ground",
      price: "5,999/event",
      rating: 4.7,
      reviews: 98,
      image:
        "https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Open Ground", "Sound System", "Shade Available", "Parking"],
      coordinatorName: "Maulana Saeed",
      experience: "18+ years",
      responseTime: "24 hours",
      contactNumber: "+91 98765 43215",
      whatsappNumber: "+91 98765 43215",
      alternateNumber: "+91 99887 66549",

      capacity: "2000+ people",
      amenities: ["Parking", "Water Facility", "First Aid", "Security"],
    },
    {
      id: 7,
      name: "Islamic Learning Center",
      icon: GiPrayer,
      description:
        "Prayer hall combined with classrooms for Quran and Islamic studies.",
      longDescription:
        "Multi-purpose facility with prayer hall and separate classrooms for Quran teaching, Islamic studies, and Arabic language classes.",
      location: "Educational Hub",
      price: "3,499/day",
      rating: 4.8,
      reviews: 112,
      image:
        "https://images.pexels.com/photos/5428010/pexels-photo-5428010.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Classrooms", "Library", "Prayer Hall", "Teacher Rooms"],
      coordinatorName: "Dr. Zakir Hussain",
      experience: "15+ years",
      responseTime: "6 hours",
      contactNumber: "+91 98765 43216",
      whatsappNumber: "+91 98765 43216",
      alternateNumber: "+91 99887 66548",

      capacity: "250 people",
      amenities: ["Library", "Projector", "AC", "Cafeteria"],
    },
    {
      id: 8,
      name: "24/7 Open Prayer Room",
      icon: GiCandleHolder,
      description:
        "Round-the-clock prayer room for individual worship and meditation.",
      longDescription:
        "Always open prayer room for those who wish to pray at any time. Quiet, clean, and peaceful environment with ablution facilities available 24/7.",
      location: "Multiple Locations",
      price: "499/visit",
      rating: 4.9,
      reviews: 345,
      image:
        "https://images.pexels.com/photos/3618557/pexels-photo-3618557.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["24/7 Access", "Clean Facility", "Wudu Area", "Security"],
      coordinatorName: "Security Team",
      experience: "Always Available",
      responseTime: "Immediate",
      contactNumber: "+91 98765 43217",
      whatsappNumber: "+91 98765 43217",
      alternateNumber: "+91 99887 66547",
      languages: " ",
      capacity: "50 people",
      amenities: ["CCTV", "AC", "Prayer Mats", "Quran Copies"],
    },
  ];

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCallNow = (contactNumber: string) => {
    window.location.href = `tel:${contactNumber}`;
  };

  const handleWhatsApp = (whatsappNumber: string) => {
    window.open(
      `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      "_blank",
    );
  };

  const handleBookNow = (service: any) => {
    setSelectedServiceForBooking(service);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Topbar />
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3618557/pexels-photo-3618557.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Prayer Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B5E3C]/80 to-[#5A3E2B]/90"></div>
        </div>

        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C89B6D] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Mandala Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-white rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Sacred Symbol */}
            <div className="flex items-center justify-center gap-2 text-[#F5E9D9] mb-4">
              <GiPrayer className="text-2xl" />
              <span className="text-sm tracking-widest">
                नमाज़ • PRAYER • نماز
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              Prayer Hall Services
              <span className="block text-xl md:text-2xl font-light text-[#F5E9D9] mt-3">
                Sacred Spaces for Worship and Community Gatherings
              </span>
            </h1>

            <p className="text-base md:text-lg text-white mb-6 max-w-2xl mx-auto">
              Well-maintained prayer halls for daily prayers, special occasions,
              and community events. Clean, peaceful, and spiritually uplifting
              environments.
            </p>

            {/* Emergency Contact */}
            <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <FaPhoneAlt className="text-white text-xl animate-pulse" />
              <span className="text-white font-bold text-xl">
                24/7 Booking: +91 1800 123 4567
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6">
              <div>
                <div className="text-2xl text-white">50+</div>
                <div className="text-sm text-[#F5E9D9]">Prayer Halls</div>
              </div>
              <div>
                <div className="text-2xl text-white">100K+</div>
                <div className="text-sm text-[#F5E9D9]">Worshippers Served</div>
              </div>
              <div>
                <div className="text-2xl text-white">24/7</div>
                <div className="text-sm text-[#F5E9D9]">Open Facilities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#FDF8F2"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-4 px-6 max-w-7xl mx-auto">
        {/* Section Header with Decorative Lines */}
        <div className="text-center mb-12 relative">
          {/* Decorative Elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 opacity-10">
            <GiTempleDoor className="w-full h-full text-[#8B5E3C]" />
          </div>

          <div className="relative">
            <span className="text-[#C89B6D] tracking-widest text-sm">
              ॐ PRAYER HALL SERVICES ॐ
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-[#5A3E2B] mt-3 mb-4">
              Sacred Spaces for Worship
              <span className="block text-[#8B5E3C]">for Every Occasion</span>
            </h2>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#C89B6D]"></div>
              <GiStarSwirl className="text-xl text-[#C89B6D]" />
              <div className="w-10 h-px bg-[#C89B6D]"></div>
            </div>

            <p className="text-sm text-[#7B5E47] max-w-2xl mx-auto">
              From daily prayers to special occasions, our prayer halls provide
              peaceful and dignified spaces for worship and community
              gatherings.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {prayerHallServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Container with Actual Image */}
                <div className="relative h-36 overflow-hidden">
                  {/* Actual Image */}
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5A3E2B] via-transparent to-transparent z-10"></div>

                  {/* Service Icon as Overlay */}
                  <div className="absolute top-2 left-2 z-20 bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                    <Icon className="text-white text-lg" />
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <FaStar className="text-yellow-500 text-[10px]" />
                    <span className="text-[11px] text-[#5A3E2B]">
                      {service.rating}
                    </span>
                    <span className="text-[9px] text-[#7B5E47]">
                      ({service.reviews})
                    </span>
                  </div>

                  {/* Capacity Badge */}
                  <div className="absolute bottom-2 right-2 z-20 bg-[#8B5E3C]/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <span className="text-white text-[10px] font-medium">
                      {service.capacity}
                    </span>
                  </div>

                  {/* Service Name on Image */}
                  <div className="absolute bottom-2 left-2 z-20">
                    <h3 className="text-base font-serif text-white drop-shadow-lg">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2.5">
                  {/* Description */}
                  <p className="text-sm text-[#7B5E47] mb-1.5 line-clamp-2 text-center leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-1.5 py-0.5 bg-[#F5E9D9] text-[#8B5E3C] rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#F5E9D9] text-[#8B5E3C] rounded-full">
                      +{service.features.length - 2}
                    </span>
                  </div>

                  {/* Coordinator Info */}
                  <div className="flex items-center gap-1.5 mb-2 p-1.5 bg-[#FDF8F2] rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-[#C89B6D] flex items-center justify-center flex-shrink-0">
                      <RiCustomerService2Fill className="text-white text-sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#5A3E2B] truncate">
                        {service.coordinatorName}
                      </p>
                      <p className="text-[10px] text-[#7B5E47]">
                        {service.experience}
                      </p>
                    </div>
                    <MdVerified className="text-[#C89B6D] text-sm flex-shrink-0" />
                  </div>

                  {/* Contact Numbers */}
                  <div className="mb-2 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] text-[#7B5E47]">
                      <MdCall className="text-[#C89B6D] text-[10px]" />
                      <span className="truncate">{service.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#7B5E47]">
                      <FaWhatsapp className="text-[#25D366] text-[10px]" />
                      <span className="truncate">{service.whatsappNumber}</span>
                    </div>
                  </div>

                  {/* Location and Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-[10px] text-[#7B5E47]">
                      <FaClock className="text-[#C89B6D] text-[10px]" />
                      <span className="truncate max-w-[90px]">
                        {service.responseTime}
                      </span>
                    </div>
                    <div className="text-sm text-[#8B5E3C]">
                      ₹{service.price}
                      <span className="text-[9px] text-[#7B5E47] ml-0.5">
                        onwards
                      </span>
                    </div>
                  </div>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.amenities.slice(0, 2).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] px-1 py-0.5 bg-[#C89B6D]/10 text-[#8B5E3C] rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleViewDetails(service)}
                      className="flex-1 px-1.5 py-1.5 border border-[#C89B6D] text-[#8B5E3C] rounded-lg text-[10px] hover:bg-[#F5E9D9] transition"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleWhatsApp(service.whatsappNumber)}
                      className="flex-1 px-1.5 py-1.5 bg-[#25D366] text-white rounded-lg text-[10px] hover:shadow-sm transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <FaWhatsapp className="text-[8px]" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleCallNow(service.contactNumber)}
                      className="flex-1 px-1.5 py-1.5 bg-gradient-to-r from-[#8B5E3C] to-[#A9744F] text-white rounded-lg text-[10px] hover:shadow-sm transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <FaPhoneAlt className="text-[8px]" />
                      Call
                    </button>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C89B6D]/20 to-transparent rounded-bl-lg"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-[#F5E9D9] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#C89B6D] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8B5E3C] rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
              Why Choose Our Prayer Halls?
            </h2>
            <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MdVerified,
                title: "Clean & Pure",
                desc: "Always clean and well-maintained",
              },
              {
                icon: FaClock,
                title: "Flexible Timing",
                desc: "Open for all prayer times",
              },
              {
                icon: MdLanguage,
                title: "Multi-Language",
                desc: "Imams available in multiple languages",
              },
              {
                icon: FaHeart,
                title: "Peaceful Environment",
                desc: "Calm and spiritual atmosphere",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm hover:bg-white transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#8B5E3C] flex items-center justify-center">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg text-[#5A3E2B] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#7B5E47]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
            How to Book a Prayer Hall
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full mb-4"></div>
          <p className="text-sm text-[#7B5E47] max-w-2xl mx-auto">
            Simple process to reserve a prayer hall for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Select Hall",
              desc: "Choose prayer hall type and location",
              icon: GiTempleDoor,
            },
            {
              step: "02",
              title: "Check Availability",
              desc: "Verify date and time slots",
              icon: FaClock,
            },
            {
              step: "03",
              title: "Make Booking",
              desc: "Confirm reservation with payment",
              icon: FaPhoneAlt,
            },
            {
              step: "04",
              title: "Visit & Pray",
              desc: "Use the facility at scheduled time",
              icon: GiPrayer,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#C89B6D] flex items-center justify-center">
                    <Icon className="text-white text-xl" />
                  </div>
                  <span className="text-sm text-[#C89B6D] font-medium">
                    {item.step}
                  </span>
                  <h3 className="text-lg text-[#5A3E2B] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#7B5E47]">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 text-[#C89B6D] text-xl">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
            Facilities We Provide
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: MdAcUnit,
              name: "Air Conditioning",
              desc: "Comfortable environment",
            },
            { icon: MdWifi, name: "Free WiFi", desc: "Stay connected" },
            { icon: MdVolumeUp, name: "Sound System", desc: "Clear audio" },
            { icon: MdKitchen, name: "Kitchen", desc: "Food preparation" },
            { icon: FaUsers, name: "Separate Sections", desc: "Men & Women" },
            { icon: MdChair, name: "Seating", desc: "Comfortable chairs" },
            { icon: FaMapMarkerAlt, name: "Parking", desc: "Ample space" },
            {
              icon: MdMeetingRoom,
              name: "Meeting Rooms",
              desc: "Community gatherings",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center p-3">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#F5E9D9] flex items-center justify-center">
                  <Icon className="text-[#8B5E3C] text-xl" />
                </div>
                <h3 className="text-sm text-[#5A3E2B]">{item.name}</h3>
                <p className="text-xs text-[#7B5E47]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
            What Worshippers Say
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Mohammad Farooq",
              location: "Delhi",
              text: "Beautiful prayer hall with peaceful atmosphere. Very clean and well-maintained. The separate sections for women are excellent.",
              rating: 5,
            },
            {
              name: "Fatima Begum",
              location: "Mumbai",
              text: "Used the women's prayer hall for our Quran classes. Very safe and comfortable environment. Highly recommended.",
              rating: 5,
            },
            {
              name: "Abdullah Khan",
              location: "Hyderabad",
              text: "The Eid prayer ground was perfect for our community. Excellent arrangements and sound system.",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="relative bg-white p-5 rounded-lg shadow-sm"
            >
              <FaQuoteLeft className="absolute top-3 right-3 text-2xl text-[#C89B6D] opacity-20" />
              <div className="flex gap-1 text-yellow-500 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-sm" />
                ))}
              </div>
              <p className="text-[#7B5E47] mb-3 italic text-sm">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-[#5A3E2B] text-sm">{testimonial.name}</p>
                <p className="text-sm text-[#7B5E47]">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#8B5E3C] to-[#5A3E2B] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <GiPrayer className="text-5xl mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Need a Prayer Hall?
          </h2>
          <p className="text-base md:text-lg text-white mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Whether for daily prayers, special occasions, or community events,
            we have the perfect prayer hall for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleCallNow("+9118001234567")}
              className="px-8 py-3 bg-white text-[#8B5E3C] rounded-lg font-medium text-base hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <FaPhoneAlt />
              Book Now
            </button>
            <button
              onClick={() => handleWhatsApp("+919876543210")}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium text-base hover:bg-white hover:text-[#8B5E3C] transition-all duration-300 flex items-center gap-2"
            >
              <FaWhatsapp />
              WhatsApp Us
            </button>
          </div>

          {/* Contact Numbers */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">North Delhi</p>
              <p className="font-bold">+91 98765 43210</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">South Delhi</p>
              <p className="font-bold">+91 98765 43213</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">Emergency</p>
              <p className="font-bold">+91 1800 123 4567</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PrayerHallServices;
