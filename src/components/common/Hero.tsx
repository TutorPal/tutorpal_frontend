"use client"
import React from "react";
import { Button } from "../ui/button";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const Hero = () => {
  const router = useRouter();

  const handleNavigation = (): void => {
      router.push('/uploadForm');
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Decentralized Knowledge Exchange Platform
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Empowering learners and educators through a secure, peer-to-peer
          platform. Share knowledge, earn rewards, and connect globally without
          intermediaries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 px-6 py-3 text-lg font-semibold rounded-md w-full sm:w-auto">
            <FaUserGraduate /> Explore as Learner
          </Button>
          <Button className="flex items-center gap-2 bg-pink-800 hover:bg-pink-700 px-6 py-3 text-lg font-semibold rounded-md w-full sm:w-auto">
            <FaChalkboardTeacher /> Join as Tutor
          </Button>
         <button
            type="button"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleNavigation}
        >
            Upload course
        </button>

        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-10 justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-sm">Courses Available</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-sm">Certified Tutors</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold">2000+</h3>
            <p className="text-sm">Happy Learners</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
