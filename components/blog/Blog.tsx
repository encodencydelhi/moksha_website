"use client";
import React, { useState } from "react";
import Topbar from "@/components/topbar/Topbar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Mantra from "../Mantra/Mantra";
import Link from "next/link";
import {
  FiSearch,
  FiCalendar,
  FiArrowRight,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { BsEye, BsChat } from "react-icons/bs";

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt:
        "Explore the latest trends and technologies shaping the future of web development, from AI integration to WebAssembly.",
      author: "John Doe",
      date: "Mar 15, 2024",
      readTime: "6 min",
      category: "Technology",
      image: "/assets/two.jpg",
      views: 1250,
      comments: 24,
      featured: true,
    },
    {
      id: 2,
      title: "Mastering React Performance Optimization",
      excerpt:
        "Learn advanced techniques to optimize your React applications for better performance and user experience.",
      author: "Sarah Johnson",
      date: "Mar 10, 2024",
      readTime: "8 min",
      category: "Web Development",
      image: "/assets/one.jpg",
      views: 890,
      comments: 18,
      featured: true,
    },
    {
      id: 3,
      title: "Building Scalable APIs with Next.js",
      excerpt:
        "A comprehensive guide to creating robust and scalable APIs using Next.js API routes and best practices.",
      author: "Mike Chen",
      date: "Mar 5, 2024",
      readTime: "10 min",
      category: "Backend",
      image: "/assets/c.jpg",
      views: 750,
      comments: 12,
      featured: false,
    },
    {
      id: 4,
      title: "UI/UX Design Principles for Developers",
      excerpt:
        "Essential design principles that every developer should know to create better user interfaces and experiences.",
      author: "Emma Wilson",
      date: "Feb 28, 2024",
      readTime: "7 min",
      category: "Design",
      image: "/assets/two.jpg",
      views: 1100,
      comments: 31,
      featured: false,
    },
    {
      id: 5,
      title: "Getting Started with TypeScript in 2024",
      excerpt:
        "A beginner-friendly introduction to TypeScript and why it's becoming essential for modern web development.",
      author: "Alex Rivera",
      date: "Feb 22, 2024",
      readTime: "5 min",
      category: "Programming",
      image: "/assets/one.jpg",
      views: 950,
      comments: 15,
      featured: false,
    },
    {
      id: 6,
      title: "The Complete Guide to SEO for Single Page Applications",
      excerpt:
        "Learn how to optimize your SPAs for search engines with practical techniques and tools.",
      author: "David Kim",
      date: "Feb 18, 2024",
      readTime: "9 min",
      category: "SEO",
      image: "/assets/c.jpg",
      views: 680,
      comments: 9,
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Web Development",
    "Design",
    "Programming",
    "Backend",
    "SEO",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const themeColor = "#8B6A3E";
  const themeColorLight = "#F5E9D9";
  const themeColorDark = "#6B4F2E";

  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <Navbar />
      <Mantra />
      <section
        className="relative py-16 md:py-14"
        style={{ backgroundColor: themeColorLight }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Moksha Blog
            </h1>
            <p className="text-gray-600 mb-6">
              Discover the latest articles, tutorials, and insights on web
              development, design, technology, and more.
            </p>

            <div className="relative max-w-lg mx-auto mb-8">
              <div className="relative flex items-center">
                <FiSearch className="absolute left-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-[#8B6A3E] focus:ring-1 focus:ring-[#F5E9D9] outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="absolute right-1.5 text-white px-4 py-1.5 text-md rounded-md transition"
                  style={{
                    backgroundColor: themeColor,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = themeColorDark)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = themeColor)
                  }
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
                    selectedCategory === category
                      ? "text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  style={
                    selectedCategory === category
                      ? { backgroundColor: themeColor }
                      : {}
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 inline mr-2">
                {selectedCategory === "All" ? "All Articles" : selectedCategory}
              </h2>
              <span className="text-gray-500 text-sm">
                ({filteredPosts.length})
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Sort:{" "}
              <select
                className="bg-transparent border-none outline-none font-medium focus:ring-0 text-sm"
                style={{ color: themeColor }}
              >
                <option>Newest</option>
                <option>Popular</option>
              </select>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3" style={{ color: themeColor }}>
                📝
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Try a different search term or category
              </p>
              <button
                className="px-4 py-2 text-white text-sm rounded transition"
                style={{ backgroundColor: themeColor }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = themeColorDark)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = themeColor)
                }
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <div className="w-full h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e: any) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center p-4" style="background: linear-gradient(135deg, ${themeColorLight}, #e8d8c1); color: ${themeColorDark}">
                              <div class="text-2xl mb-1">📝</div>
                              <div class="font-bold text-sm text-center">${post.category}</div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-white px-2 py-0.5 rounded-full text-sm font-medium"
                        style={{ backgroundColor: themeColor }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiCalendar className="text-sm" /> {post.date}
                      </div>
                      <span
                        className="text-sm px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: themeColorLight,
                          color: themeColorDark,
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link
                        href={`/blog/${post.id}`}
                        className="hover:text-[#8B6A3E] transition"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: themeColor }}
                        >
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-0.5">
                          <BsEye className="text-sm" />{" "}
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <BsChat className="text-sm" /> {post.comments}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-sm font-medium flex items-center gap-1 transition"
                        style={{ color: themeColor }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = themeColorDark)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = themeColor)
                        }
                      >
                        Read <FiArrowRight className="text-sm" />
                      </Link>
                      <div className="flex gap-2">
                        <button
                          className="text-gray-400 hover:text-[#8B6A3E] transition p-1"
                          title="Share"
                          style={{ color: themeColor }}
                        >
                          <FiShare2 className="text-sm" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-[#8B6A3E] transition p-1"
                          title="Save"
                          style={{ color: themeColor }}
                        >
                          <FiBookmark className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition">
                  &laquo;
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md text-white text-sm transition"
                  style={{ backgroundColor: themeColor }}
                >
                  1
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = themeColorLight)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                >
                  2
                </button>
                <span className="px-1 text-sm" style={{ color: themeColor }}>
                  ...
                </span>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = themeColorLight)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                >
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition">
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Compact Newsletter */}
      <section
        className="py-8 text-white"
        style={{ backgroundColor: themeColor }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-xl font-bold mb-3">Stay Updated</h2>
            <p className="text-[#F5E9D9] text-sm mb-6">
              Subscribe to never miss new articles and tutorials.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 pl-9 text-sm rounded bg-white text-gray-900 placeholder-gray-500 border border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <button
                className="px-4 py-2 bg-white text-sm font-medium rounded hover:bg-gray-50 transition"
                style={{ color: themeColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColorLight;
                  e.currentTarget.style.color = themeColorDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = themeColor;
                }}
              >
                Subscribe
              </button>
            </div>

            <p className="text-sm text-[#F5E9D9] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Blog;
