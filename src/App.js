import React, { useState } from "react";

import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format");
      return;
    }

    try {
      const response = await fetch("https://test.ezworks.ai/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 422) {
        setMessage("Email ending with @ez.works is not allowed");
      } else if (response.status === 200) {
        setMessage("Form Submitted");
        setEmail("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      
      <div className="w-full max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center md:gap-x-4">
            <img
              src="/logo.webp"
              alt="Works"
              className="w-16 mb-4 md:mb-0"
            />
            <div className="font-bold text-blue-400 text-4xl">Works</div>
          </div>
          <p className="text-lg text-black mt-4">A Suite of Business Support Services</p>
          <p className="text-gray-500 text-sm mt-4 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          </p>
        </div>

        {/* Services Section */}
        <div className="grid gap-2 md:gap-4 md:grid-cols-3">
          {[
            { title: "Presentation Design", icon: "📊" },
            { title: "Audio - Visual Production", icon: "🎥" },
            { title: "Translation Services", icon: "🌐" },
            { title: "Graphic Design", icon: "🎨" },
            { title: "Research & Analytics", icon: "📈" },
            { title: "Data Processing", icon: "💾" },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-blue-900 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center h-50 w-40 mx-auto"
            >
              <div className="text-xl mb-2">{service.icon}</div>
              <h3 className="text-lg font-semibold text-center">{service.title}</h3>
              <p className="text-sm text-center mt-2">
                Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
              </p>
            </div>
          ))}
        </div>

        {/* Subscription Section */}
        <div className="mt-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center md:flex-row md:justify-center md:gap-x-4"
          >
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md w-full md:w-64 text-gray-700 mb-4 md:mb-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 w-full md:w-auto"
            >
              Contact Me
            </button>
          </form>
          {message && (
            <p className="text-sm text-red-500 mt-4 text-center md:text-left">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
