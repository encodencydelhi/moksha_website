"use client";
import React from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  Compass,
  Target,
  Globe,
  Award,
  Users2,
  MapPin,
  Heart,
  Mountain,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

function About() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <Navbar />

      <section
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5E9D9" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            About <span className="text-[#8B6A3E]">Moksha Voyage</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            "Journey to Enlightenment: Transforming Souls Through Spiritual
            Travel"
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Welcome to <span className="text-[#8B6A3E]">Moksha Voyage</span>
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-sm md:text-base">
                  Step into a world where travel meets transformation at{" "}
                  <strong className="text-[#8B6A3E]">Moksha Voyage</strong> –
                  India's Premier Spiritual & Wellness Travel Company.
                </p>
                <p className="text-sm md:text-base">
                  We bring together spiritual seekers, yoga enthusiasts,
                  meditation practitioners, and wellness travelers to experience
                  sacred journeys that nourish the soul.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center bg-[#8B6A3E]/10 px-3 py-2 rounded-lg border border-[#8B6A3E]/20">
                  <div className="w-6 h-6 bg-[#8B6A3E] rounded-full flex items-center justify-center mr-2">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    Sacred Journeys
                  </span>
                </div>
                <div className="flex items-center bg-[#8B6A3E]/10 px-3 py-2 rounded-lg border border-[#8B6A3E]/20">
                  <div className="w-6 h-6 bg-[#8B6A3E] rounded-full flex items-center justify-center mr-2">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800">
                    Soul Transformations
                  </span>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/old.png"
                alt="Welcome to Moksha Voyage"
                width={400}
                height={250}
                className="w-full h-[40vh] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Our <span className="text-[#8B6A3E]">Purpose</span>
            </h2>
            <p className="text-gray-600">
              Guiding souls towards inner peace and spiritual awakening
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Our Mission",
                description:
                  "To facilitate transformative spiritual journeys that connect individuals with ancient wisdom, sacred spaces, and inner peace.",
                bgColor: "bg-[#8B6A3E]",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Our Vision",
                description:
                  "To become the world's most trusted spiritual travel companion, making sacred journeys accessible to every seeker.",
                bgColor: "bg-[#8B6A3E]/90",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
                <div
                  className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Our <span className="text-[#8B6A3E]">Story</span>
              </h2>
              <div className="space-y-3 text-gray-700 mb-4">
                <p className="text-sm md:text-base">
                  Founded in 2015 by spiritual seekers turned travel
                  enthusiasts, Moksha Voyage began as a small group organizing
                  trips to Himalayan meditation centers.
                </p>
                <p className="text-sm md:text-base">
                  What started as personal spiritual quests evolved into a
                  mission to help others find their path to enlightenment
                  through authentic travel experiences.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "8+", label: "Years of Service" },
                  { value: "200+", label: "Spiritual Guides" },
                  { value: "15+", label: "Countries Served" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-[#8B6A3E]/10 rounded-lg border border-[#8B6A3E]/20"
                  >
                    <div className="text-lg font-bold text-[#8B6A3E] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-700 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/assets/girl.jpg"
                alt="Our Story"
                width={400}
                height={250}
                className="w-full h-[40vh] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Journey <span className="text-[#8B6A3E]">Highlights</span>
            </h2>
            <p className="text-gray-600">
              Transforming lives through sacred travel experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <MapPin className="w-5 h-5" />,
                value: "50+",
                label: "Sacred Destinations",
              },
              {
                icon: <Users2 className="w-5 h-5" />,
                value: "5,000+",
                label: "Happy Travelers",
              },
              {
                icon: <Mountain className="w-5 h-5" />,
                value: "100+",
                label: "Retreats Conducted",
              },
              {
                icon: <Award className="w-5 h-5" />,
                value: "98%",
                label: "Satisfaction Rate",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg p-4 text-center bg-white shadow-sm border border-gray-100"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-[#8B6A3E]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-[#8B6A3E]">{stat.icon}</div>
                  </div>
                  <div className="text-xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Our Spiritual <span className="text-[#8B6A3E]">Guides</span>
            </h2>
            <p className="text-gray-600">
              Experienced mentors who illuminate your spiritual path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ravi Shankar",
                role: "Founder & Spiritual Director",
                description:
                  "25+ years of meditation practice, studied under Himalayan masters",
                expertise: ["Vedanta", "Meditation", "Yoga Philosophy"],
                image: "/assets/man1.jpg",
              },
              {
                name: "Priya Sharma",
                role: "Head of Wellness Journeys",
                description: "Certified Ayurvedic doctor & yoga therapist",
                expertise: ["Ayurveda", "Yoga Therapy", "Holistic Healing"],
                image: "/assets/man2.avif",
              },
              {
                name: "Arjun Patel",
                role: "Pilgrimage Expert",
                description:
                  "Guided 500+ pilgrims across sacred sites of India",
                expertise: ["Temple History", "Rituals", "Sacred Geography"],
                image: "/assets/girl.jpg",
              },
            ].map((guide, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-top"
                    priority={index === 0}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                <div className="p-5 text-center">
                  <div className="relative -mt-10 mb-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8B6A3E] rounded-xl border-4 border-white shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {guide.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {guide.name}
                    </h3>
                    <p className="text-[#8B6A3E] text-sm font-medium mb-3">
                      {guide.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {guide.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-full text-xs font-medium border border-[#8B6A3E]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Begin Your <span className="text-[#8B6A3E]">Spiritual Journey</span>
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto text-sm md:text-base">
            Discover inner peace, find your purpose, and transform your soul
            with our curated spiritual journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-2 bg-[#8B6A3E] text-white font-medium rounded-lg hover:bg-[#8B6A3E]/90 transition-colors duration-300">
              Explore Journeys
            </button>
            <button className="px-6 py-2 bg-white border border-[#8B6A3E] text-[#8B6A3E] font-medium rounded-lg hover:bg-[#8B6A3E]/10 transition-colors duration-300">
              Book a Consultation
            </button>
          </div>
          <p className="text-[#8B6A3E] mt-4 text-xs">
            Free spiritual guidance session with our experts
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
