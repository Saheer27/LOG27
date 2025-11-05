"use client";

import React, { useEffect, useState } from "react";
import { generateDummyData } from "../constants/dummyData/generateDummyData.js";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const isDemo = localStorage.getItem("isDemo");
    if (isDemo === "false" || isDemo === "true") {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 1000);
    }
  }, []);

  const handleSlideChange = (mode: string) => {
    if (mode === "demo") {
      localStorage.setItem("isDemo", "true");
      localStorage.setItem("newLog", JSON.stringify(generateDummyData));
    } else {
      localStorage.setItem("isDemo", "false");
    }
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              LOG<span className="text-indigo-600">27</span>
            </h2>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-200"></div>
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
              </div>
            </div>
            <p className="text-gray-600 animate-pulse">
              Please wait, redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <div
        className={`transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              LOG<span className="text-indigo-600">27</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your personal expense tracker. Simple, elegant, and powerful.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Try Demo
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore with sample data and see how LOG27 works without
                  creating an account.
                </p>
                <button
                  onClick={() => handleSlideChange("demo")}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Start Demo
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Start Fresh
                </h3>
                <p className="text-gray-600 mb-6">
                  Begin tracking your real expenses and income with a clean
                  slate.
                </p>
                <button
                  onClick={() => handleSlideChange("real")}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
