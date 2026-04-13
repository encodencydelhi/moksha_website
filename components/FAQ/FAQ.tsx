"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

import { getAllFAQs } from "@/lib/apiClient";

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const response = await getAllFAQs();
      const data = response.data;

      if (data.success && data.data) {
        const faqData = data.data;
        setFaqs(faqData);

        const uniqueCategories = [
          "All",
          ...(Array.from(
            new Set(faqData.map((f: FAQ) => f.category)),
          ) as string[]),
        ];
        setCategories(uniqueCategories);
      } else {
        setFaqs([]);
      }
    } catch (err) {
      console.error("Error loading FAQs:", err);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFAQs = faqs.filter(
    (faq) => selectedCategory === "All" || faq.category === selectedCategory,
  );

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#FDF8F2] to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#5A4030]">Loading FAQs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#FDF8F2] to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C1810] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#5A4030] max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#8B6A3E] text-white"
                    : "bg-[#F5E9D9] text-[#8B6A3E] hover:bg-[#E8D9C5]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQs List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#7B5E47] text-lg">No FAQs available</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white rounded-lg shadow-md border border-[#E8D9C5] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === faq._id ? null : faq._id)
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-[#FDF8F2] transition-colors text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#2C1810] flex items-center gap-3">
                      {expandedId === faq._id ? (
                        <FiMinus
                          className="text-[#8B6A3E] flex-shrink-0"
                          size={20}
                        />
                      ) : (
                        <FiPlus
                          className="text-[#8B6A3E] flex-shrink-0"
                          size={20}
                        />
                      )}
                      {faq.question}
                    </h3>
                  </div>
                  <span
                    className={`text-[#8B6A3E] ml-4 transition-transform flex-shrink-0 ${
                      expandedId === faq._id ? "rotate-180" : ""
                    }`}
                  >
                    {expandedId === faq._id ? (
                      <FiMinus size={24} />
                    ) : (
                      <FiPlus size={24} />
                    )}
                  </span>
                </button>

                {/* Answer */}
                {expandedId === faq._id && (
                  <div className="px-6 pb-6 pt-0 border-t border-[#E8D9C5] bg-[#FDF8F2]/50">
                    <p className="text-[#5A4030] leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.category !== "General" && (
                      <div className="mt-4 pt-4 border-t border-[#E8D9C5]">
                        <span className="inline-block px-3 py-1 bg-[#8B6A3E]/10 text-[#8B6A3E] rounded-full text-xs font-medium">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#5A4030] mb-4">
            Didn't find your answer? Contact us for more information.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#8B6A3E] text-white rounded-lg hover:bg-[#6B5A3E] transition-colors font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
