"use client";
import React, { useState, useEffect } from 'react';
import { Map, Users, Shield, ChevronDown, BarChart, Bell } from 'lucide-react';
import Image from 'next/image';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-500 py-4 px-6 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="E-Bandobast Logo" className='px-2'  width={60} height={60}  />
            <h1 className="text-3xl font-extrabold text-white">E-Bandobast</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-white hover:text-gray-200 transition duration-300">Home</a></li>
              <li><a href="#features" className="text-white hover:text-gray-200 transition duration-300">Features</a></li>
              <li><a href="#about" className="text-white hover:text-gray-200 transition duration-300">About</a></li>
              <li><a href="#contact" className="text-white hover:text-gray-200 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="pt-24 pb-20 bg-gradient-to-b from-blue-100 to-white">
          <div className="container mx-auto px-4 text-center">
            <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-6xl font-extrabold mb-6 text-gray-800">Revolutionize Police Deployment</h2>
              <p className="text-2xl mb-8 text-gray-600">Efficient. Intelligent. Secure.</p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>
            <div className="mt-12 flex justify-center">
              <ChevronDown size={48} className="text-blue-600 animate-bounce" />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold mb-12 text-center text-gray-800">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: <Shield size={48} />, title: "Create Bandobast", description: "Plan and organize police deployments with ease. Streamline the process of creating and managing bandobast operations." },
                { icon: <Map size={48} />, title: "Interactive Maps", description: "Visualize deployments with real-time mapping. Get a bird's-eye view of your operations and make informed decisions quickly." },
                { icon: <Users size={48} />, title: "Resource Management", description: "Efficiently allocate personnel and equipment. Optimize your resources to ensure maximum coverage and effectiveness." },
                { icon: <BarChart size={48} />, title: "Analytics Dashboard", description: "Gain insights from comprehensive analytics. Track performance metrics and identify areas for improvement." },
                { icon: <Bell size={48} />, title: "Real-time Alerts", description: "Stay informed with instant notifications. Receive critical updates and respond promptly to emerging situations." },
                { icon: <Shield size={48} />, title: "Secure Communication", description: "Ensure confidential information stays protected. Use our secure channels for sensitive communications." }
              ].map((feature, index) => (
                <div key={index} className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="text-indigo-600 mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold mb-8 text-center text-gray-800">About E-Bandobast</h3>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl mb-6 text-gray-700">
                E-Bandobast is a state-of-the-art application designed to revolutionize police deployment and management. Our platform combines cutting-edge technology with years of law enforcement expertise to provide a comprehensive solution for modern policing needs.
              </p>
              <p className="text-xl mb-6 text-gray-700">
                From small-scale operations to large-scale events, E-Bandobast empowers law enforcement agencies to plan, execute, and monitor their deployments with unprecedented efficiency and clarity. Our mission is to enhance public safety by equipping police forces with the tools they need to respond swiftly and effectively to any situation.
              </p>
              <p className="text-xl text-gray-700">
                Join the growing number of agencies that trust E-Bandobast to streamline their operations and improve their service to the community.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Contact Us</h3>
            <div className="max-w-md mx-auto">
              <form className="space-y-6">
                <input type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                <textarea placeholder="Message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 E-Bandobast. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-blue-200 hover:text-white mx-2">Privacy Policy</a>
            <a href="#" className="text-blue-200 hover:text-white mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page
