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
  GiFlowerPot,
  GiFlowerStar,
  GiIncense,
  GiCandleHolder,
  GiWoodPile,
  GiWoodenDoor,
  GiWoodenFence,
  GiWoodCabin,
  GiWoodStick,
  GiFireplace,
  GiFireBowl,
  GiFireFlower,
  GiFireAce,
  GiFire,
  GiFireRay,
  GiFlowerTwirl,
  GiFlowerHat,
  GiFlowerEmblem,
  GiPalisade,
  GiFlowers,
  GiPlantRoots,
  GiLeafSwirl,
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
  FaLeaf,
  FaTree,
  FaFire,
  FaWater,
  FaMountain,
  FaSun,
  FaMoon,
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
  MdLocalFlorist,
  MdLocalFireDepartment,
  MdOutlineLocalFlorist,
  MdAssuredWorkload,
  MdNature,
  MdOutdoorGrill,
  MdCampaign,
  MdDevicesOther,
} from "react-icons/md";
import { PiFlowerLotus, PiFlowerTulip, PiLeaf } from "react-icons/pi";
import {
  BsSuitHeartFill,
  BsChatDots,
  BsTelephone,
  BsTelephoneFill,
  BsDroplet,
  BsDropletHalf,
  BsDropletFill,
  BsFire,
  BsFlower1,
  BsFlower2,
  BsFlower3,
} from "react-icons/bs";
import {
  TbMessageCircle,
  TbPhoneCall,
  TbCrown,
  TbFlower,
  TbFlowerOff,
} from "react-icons/tb";
import { RiCustomerService2Fill, RiOilFill } from "react-icons/ri";
import { IoCall, IoFlower, IoWater } from "react-icons/io5";

function FuneralDecorationServices() {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] =
    useState(null);

  const decorationServices = [
    {
      id: 1,
      name: "Flower Decoration (पुष्प सज्जा)",
      icon: GiFlowerHat,
      description:
        "Traditional flower decorations for the funeral pyre and surrounding area with fresh marigolds and roses.",
      longDescription:
        "Complete floral decoration setup for funeral ceremonies. Includes garlands, flower petals, and arrangements around the pyre. Fresh flowers delivered daily, arranged with respect and tradition.",
      location: "Local & Nearby",
      price: "2,499",
      rating: 4.9,
      reviews: 234,
      image:
        "https://images.pexels.com/photos/931170/pexels-photo-931170.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Fresh Flowers",
        "Traditional Design",
        "Full Coverage",
        "Same Day Setup",
      ],
      coordinatorName: "Phool Chandra",
      experience: "18+ years",
      responseTime: "2 hours",
      contactNumber: "+91 98765 43101",
      whatsappNumber: "+91 98765 43101",
      alternateNumber: "+91 99887 66401",
      includes: [
        "Marigold Garlands (50 pcs)",
        "Rose Petals (5 kg)",
        "Floral Mats",
        "Tulsi Leaves",
        "Decorative Torans",
      ],
      setupTime: "2-3 hours",
      coverage: "Complete pyre area",
    },
    {
      id: 2,
      name: "Pandal & Canopy Decoration (पंडाल सज्जा)",
      icon: GiFlowerTwirl,
      description:
        "Complete pandal decoration with traditional motifs, flowers, and sacred symbols for funeral gatherings.",
      longDescription:
        "Elaborate decoration for the funeral pandal including canopy setup, floral arrangements, traditional motifs, and seating arrangements. Creates a respectful atmosphere for mourners.",
      location: "Local & Nearby",
      price: "5,999",
      rating: 4.8,
      reviews: 156,
      image:
        "https://images.pexels.com/photos/6605287/pexels-photo-6605287.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Full Pandal Setup",
        "Traditional Motifs",
        "Seating Area",
        "Sacred Symbols",
      ],
      coordinatorName: "Ramesh Sahu",
      experience: "22+ years",
      responseTime: "4 hours",
      contactNumber: "+91 98765 43102",
      whatsappNumber: "+91 98765 43102",
      alternateNumber: "+91 99887 66402",
      includes: [
        "Canopy with Drapes",
        "Floral Torans",
        "Rangoli",
        "Sacred Symbol Decor",
        "Mourner Seating",
      ],
      setupTime: "4-5 hours",
      capacity: "50-100 people",
    },
    {
      id: 3,
      name: "Rangoli & Floor Decoration (रंगोली सज्जा)",
      icon: GiLeafSwirl,
      description:
        "Traditional rangoli designs using colored powders, flower petals, and sacred symbols for funeral ceremonies.",
      longDescription:
        "Intricate rangoli designs created at the entrance and around the pyre area. Uses natural colors, flower petals, and traditional patterns. Includes sacred symbols like Om, Swastik, and lotus.",
      location: "Local Only",
      price: "1,499",
      rating: 4.7,
      reviews: 98,
      image:
        "https://images.pexels.com/photos/5428007/pexels-photo-5428007.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Traditional Designs",
        "Natural Colors",
        "Flower Petals",
        "Sacred Symbols",
      ],
      coordinatorName: "Lakshmi Bai",
      experience: "15+ years",
      responseTime: "3 hours",
      contactNumber: "+91 98765 43103",
      whatsappNumber: "+91 98765 43103",
      alternateNumber: "+91 99887 66403",
      includes: [
        "Entrance Rangoli",
        "Pyre Area Design",
        "Sacred Symbols",
        "Color Powders",
        "Flower Petals",
      ],
      setupTime: "2 hours",
      size: "10x10 ft area",
    },
    {
      id: 4,
      name: "Diya & Lighting Decoration (दीप सज्जा)",
      icon: GiCandleHolder,
      description:
        "Traditional diya and lighting arrangements creating a serene atmosphere for funeral ceremonies.",
      longDescription:
        "Beautiful arrangement of clay diyas, lamps, and traditional lighting around the funeral area. Creates a peaceful and sacred ambiance. Includes placement around pyre, pathway, and pandal.",
      location: "Local & Nearby",
      price: "1,999",
      rating: 4.8,
      reviews: 167,
      image:
        "https://images.pexels.com/photos/4198105/pexels-photo-4198105.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Clay Diyas",
        "Traditional Lamps",
        "Pathway Lighting",
        "Pyre Surround",
      ],
      coordinatorName: "Deepak Yadav",
      experience: "12+ years",
      responseTime: "2 hours",
      contactNumber: "+91 98765 43104",
      whatsappNumber: "+91 98765 43104",
      alternateNumber: "+91 99887 66404",
      includes: [
        "Clay Diyas (100 pcs)",
        "Brass Lamps (5 pcs)",
        "Cotton Wicks",
        "Ghee for Lamps",
        "Decorative Holders",
      ],
      setupTime: "2-3 hours",
      duration: "Burns 4-6 hours",
    },
    {
      id: 5,
      name: "Floral Pyre Decoration (चिता पुष्प सज्जा)",
      icon: GiFlowerTwirl,
      description:
        "Specialized flower decoration specifically for the funeral pyre with sacred flowers and traditional patterns.",
      longDescription:
        "Exclusive floral decoration for the pyre itself. Using sacred flowers like marigold, roses, and chrysanthemums arranged in traditional patterns. Includes flower petals for offering and garlands for the departed.",
      location: "Local Only",
      price: "3,499",
      rating: 4.9,
      reviews: 189,
      image:
        "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Pyre Coverage",
        "Sacred Flowers",
        "Traditional Pattern",
        "Premium Garlands",
      ],
      coordinatorName: "Mohan Das",
      experience: "20+ years",
      responseTime: "3 hours",
      contactNumber: "+91 98765 43105",
      whatsappNumber: "+91 98765 43105",
      alternateNumber: "+91 99887 66405",
      includes: [
        "Pyre Floral Cover",
        "Premium Garlands (25)",
        "Flower Petals (10 kg)",
        "Sacred Leaves",
        "Floral Torans",
      ],
      setupTime: "2 hours",
      flowers: "Marigold, Rose, Chrysanthemum",
    },
    {
      id: 6,
      name: "Pathway & Entrance Decoration (प्रवेश द्वार सज्जा)",
      icon: GiFlowerEmblem,
      description:
        "Beautiful decoration for the pathway leading to the pyre and main entrance with flowers and traditional elements.",
      longDescription:
        "Complete decoration of the pathway from entrance to pyre area. Includes floral arches, ground decorations, and traditional welcome elements. Creates a respectful and sacred path for the final journey.",
      location: "Local & Nearby",
      price: "2,999",
      rating: 4.7,
      reviews: 123,
      image:
        "https://images.pexels.com/photos/6168364/pexels-photo-6168364.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Floral Arches",
        "Pathway Decor",
        "Entrance Setup",
        "Welcome Elements",
      ],
      coordinatorName: "Sita Devi",
      experience: "14+ years",
      responseTime: "3 hours",
      contactNumber: "+91 98765 43106",
      whatsappNumber: "+91 98765 43106",
      alternateNumber: "+91 99887 66406",
      includes: [
        "Floral Arches (2)",
        "Pathway Flowers",
        "Entrance Torans",
        "Decorative Pots",
        "Sacred Symbol Flags",
      ],
      setupTime: "3 hours",
      length: "50-100 ft pathway",
    },
    {
      id: 7,
      name: "Complete Funeral Decoration Package (संपूर्ण सज्जा पैकेज)",
      icon: GiFlowerStar,
      description:
        "All-in-one decoration package covering pyre, pandal, pathway, lighting, and complete ceremonial setup.",
      longDescription:
        "Comprehensive decoration package for funeral ceremonies. Includes everything from pyre decoration to pandal setup, pathway decoration, lighting arrangements, and all floral elements. Coordinated traditional design with sacred motifs.",
      location: "Local & Nearby",
      price: "12,999",
      rating: 4.9,
      reviews: 245,
      image:
        "https://images.pexels.com/photos/6605316/pexels-photo-6605316.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Complete Setup",
        "Premium Flowers",
        "Traditional Design",
        "Coordinated Theme",
      ],
      coordinatorName: "Vishnu Kanta",
      experience: "25+ years",
      responseTime: "2 hours",
      contactNumber: "+91 98765 43107",
      whatsappNumber: "+91 98765 43107",
      alternateNumber: "+91 99887 66407",
      includes: [
        "Pyre Decoration",
        "Pandal Setup",
        "Pathway Decor",
        "Lighting Arrangement",
        "Rangoli Design",
        "Floral Garlands (100)",
        "Flower Petals (25 kg)",
        "Decorative Torans (10)",
        "Sacred Symbol Decor",
        "Complete Coordination",
      ],
      setupTime: "5-6 hours",
      teamSize: "8-10 members",
    },
    {
      id: 8,
      name: "Sacred Symbol & Motif Decoration (प्रतीक सज्जा)",
      icon: GiFlowerEmblem,
      description:
        "Traditional sacred symbols and motifs decoration using flowers, colors, and traditional materials.",
      longDescription:
        "Specialized decoration featuring sacred Hindu symbols like Om, Swastik, Lotus, Trishul, and other motifs. Created using flowers, colored powders, and traditional materials at key locations.",
      location: "Local Only",
      price: "1,799",
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.pexels.com/photos/6588607/pexels-photo-6588607.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Sacred Symbols",
        "Traditional Motifs",
        "Floral Designs",
        "Multiple Locations",
      ],
      coordinatorName: "Gopal Shastri",
      experience: "16+ years",
      responseTime: "3 hours",
      contactNumber: "+91 98765 43108",
      whatsappNumber: "+91 98765 43108",
      alternateNumber: "+91 99887 66408",
      includes: [
        "Om Symbol (3 locations)",
        "Swastik Design",
        "Lotus Motifs",
        "Trishul Decoration",
        "Sacred Kalash Setup",
      ],
      setupTime: "2-3 hours",
      materials: "Flowers, Colors, Rice, Sandalwood",
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
            src="https://images.pexels.com/photos/931170/pexels-photo-931170.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Funeral Decoration"
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
              <GiFlowerHat className="text-2xl" />
              <span className="text-sm tracking-widest">
                ॐ FUNERAL DECORATION ॐ • अंतिम संस्कार सज्जा
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
              Funeral Decoration Services
              <span className="block text-xl md:text-2xl font-light text-[#F5E9D9] mt-3">
                Traditional Floral & Ceremonial Decor for Last Rites
              </span>
            </h1>

            <p className="text-base md:text-lg text-white mb-6 max-w-2xl mx-auto">
              Respectful and traditional decoration for funeral ceremonies.
              Fresh flowers, sacred symbols, and complete setup delivered with
              dignity.
            </p>

            {/* Emergency Contact */}
            <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <FaPhoneAlt className="text-white text-xl animate-pulse" />
              <span className="text-white font-bold text-xl">
                24/7 Emergency Decoration: +91 1800 123 4580
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6">
              <div>
                <div className="text-2xl text-white">5K+</div>
                <div className="text-sm text-[#F5E9D9]">
                  Ceremonies Decorated
                </div>
              </div>
              <div>
                <div className="text-2xl text-white">100%</div>
                <div className="text-sm text-[#F5E9D9]">Fresh Flowers</div>
              </div>
              <div>
                <div className="text-2xl text-white">24/7</div>
                <div className="text-sm text-[#F5E9D9]">Setup Available</div>
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

      {/* Decoration Services Section */}
      <section className="py-4 px-6 max-w-7xl mx-auto">
        {/* Section Header with Decorative Lines */}
        <div className="text-center mb-12 relative">
          {/* Decorative Elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 opacity-10">
            <GiFlowerHat className="w-full h-full text-[#8B5E3C]" />
          </div>

          <div className="relative">
            <span className="text-[#C89B6D] tracking-widest text-sm">
              ॐ FUNERAL DECORATION ॐ
            </span>

            <h2 className="text-3xl md:text-4xl font-serif text-[#5A3E2B] mt-3 mb-4">
              Traditional Decoration Packages
              <span className="block text-[#8B5E3C]">
                for Funeral Ceremonies
              </span>
            </h2>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-px bg-[#C89B6D]"></div>
              <GiStarSwirl className="text-xl text-[#C89B6D]" />
              <div className="w-10 h-px bg-[#C89B6D]"></div>
            </div>

            <p className="text-sm text-[#7B5E47] max-w-2xl mx-auto">
              Respectful and traditional decoration services using fresh
              flowers, sacred symbols, and traditional elements for funeral
              ceremonies.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {decorationServices.map((service) => {
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

                  {/* Setup Time Badge */}
                  <div className="absolute bottom-2 right-2 z-20 bg-[#8B5E3C]/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <span className="text-white text-[10px] font-medium">
                      {service.setupTime}
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

                  {/* Setup Time and Price */}
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

                  {/* Includes Preview */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.includes?.slice(0, 2).map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] px-1 py-0.5 bg-[#C89B6D]/10 text-[#8B5E3C] rounded"
                      >
                        {item}
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
              Why Choose Our Decoration Services?
            </h2>
            <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: MdVerified,
                title: "Fresh Flowers",
                desc: "Daily fresh flowers guaranteed",
              },
              {
                icon: FaClock,
                title: "24/7 Setup",
                desc: "Round-the-clock decoration service",
              },
              {
                icon: FaLeaf,
                title: "Eco-friendly",
                desc: "Natural & biodegradable materials",
              },
              {
                icon: MdDevicesOther,
                title: "Traditional Designs",
                desc: "Authentic sacred patterns",
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
            How to Book Decoration Services
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full mb-4"></div>
          <p className="text-sm text-[#7B5E47] max-w-2xl mx-auto">
            Simple process to arrange traditional funeral decoration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Contact Us",
              desc: "Call or WhatsApp our 24/7 helpline",
              icon: FaPhoneAlt,
            },
            {
              step: "02",
              title: "Choose Package",
              desc: "Select decoration type & requirements",
              icon: GiFlowerHat,
            },
            {
              step: "03",
              title: "Confirm Details",
              desc: "Share venue & timing preferences",
              icon: MdVerified,
            },
            {
              step: "04",
              title: "Complete Setup",
              desc: "We decorate before ceremony",
              icon: GiFlowerStar,
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

      {/* Decoration Elements Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-[#5A3E2B] mb-3">
            Traditional Decoration Elements
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: GiFlowerHat,
              name: "Flower Garlands",
              desc: "Marigold, Rose",
            },
            {
              icon: GiCandleHolder,
              name: "Diyas & Lamps",
              desc: "Clay & Brass",
            },
            {
              icon: GiFlowerEmblem,
              name: "Sacred Symbols",
              desc: "Om, Swastik",
            },
            {
              icon: GiFlowerEmblem,
              name: "Pandal Decor",
              desc: "Canopy Setup",
            },
            {
              icon: GiFlowerTwirl,
              name: "Pyre Flowers",
              desc: "Sacred Coverage",
            },
            {
              icon: GiFlowerStar,
              name: "Complete Setup",
              desc: "Full Package",
            },
            { icon: GiLeafSwirl, name: "Rangoli", desc: "Traditional Designs" },
            {
              icon: GiPlantRoots,
              name: "Natural Elements",
              desc: "Eco-friendly",
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
            What Families Say About Our Decoration
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B6D] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Priya Sharma",
              location: "Delhi",
              text: "The floral decoration was beautiful and respectful. Fresh flowers arranged traditionally. They understood our requirements perfectly.",
              rating: 5,
            },
            {
              name: "Vikram Singh",
              location: "Mumbai",
              text: "Complete pandal decoration with all sacred symbols. The rangoli and diya arrangement created a peaceful atmosphere. Thank you.",
              rating: 5,
            },
            {
              name: "Anita Desai",
              location: "Lucknow",
              text: "They decorated the pyre beautifully with marigolds. The pathway decoration with floral arches was very traditional. Highly recommended.",
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
          <GiFlowerHat className="text-5xl mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Need Funeral Decoration Immediately?
          </h2>
          <p className="text-base md:text-lg text-white mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            We understand the urgency. Our 24/7 decoration service ensures
            complete traditional setup whenever needed. Fresh flowers, sacred
            symbols, and respectful arrangements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleCallNow("+9118001234580")}
              className="px-8 py-3 bg-white text-[#8B5E3C] rounded-lg font-medium text-base hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <FaPhoneAlt />
              Call Decoration Helpline
            </button>
            <button
              onClick={() => handleWhatsApp("+919876543210")}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium text-base hover:bg-white hover:text-[#8B5E3C] transition-all duration-300 flex items-center gap-2"
            >
              <FaWhatsapp />
              WhatsApp Us
            </button>
          </div>

          {/* Emergency Contact Numbers */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">Delhi NCR</p>
              <p className="font-bold">+91 98765 43101</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">Mumbai</p>
              <p className="font-bold">+91 98765 43104</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-[#F5E9D9]">24/7 Helpline</p>
              <p className="font-bold">+91 1800 123 4580</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FuneralDecorationServices;
