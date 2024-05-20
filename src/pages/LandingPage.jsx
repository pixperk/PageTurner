import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-32 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:col-span-1">
              <h1 className="text-5xl font-bold mb-6">Welcome to PageTurner</h1>
              <p className="text-xl mb-8">Discover your next favorite book with PageTurner. Dive into a world of stories, knowledge, and imagination.</p>
              <div className="flex space-x-4">
                <Link to="/login" className="bg-white text-gray-900 py-3 px-6 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">Login</Link>
                <Link to="/register" className="bg-white text-gray-900 py-3 px-6 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300">Sign Up</Link>
              </div>
            </div>
            <div className="md:col-span-1">
              <img src="https://images.pexels.com/photos/2079451/pexels-photo-2079451.jpeg" alt="Hero" className="w-full rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white text-gray-900 py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:col-span-1">
              <img src="https://images.pexels.com/photos/2228557/pexels-photo-2228557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="About" className="w-full rounded-lg shadow-xl" />
            </div>
            <div className="md:col-span-1">
              <h2 className="text-4xl font-bold mb-6">About PageTurner</h2>
              <p className="text-xl mb-8">PageTurner is your go-to platform for finding, exploring, and sharing books. Whether you're a book lover, a casual reader, or just looking for something new, PageTurner has something for everyone.</p>
              <button className="bg-gray-900 text-white py-3 px-6 rounded-full font-semibold text-lg hover:bg-gray-800 transition duration-300">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
