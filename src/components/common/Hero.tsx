"use client"
import React from "react";
import { Button } from "../ui/button";
// import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import pict from "../img/image.png"

const Hero = () => {

  const router = useRouter();

    const handleNavigation = (): void => {
        router.push('/uploadForm'); 
    };
  return (<>
    <section className="flex bg-hero-img bg-cover flex-col items-center justify-center min-h-screen px-6 text-white">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-7xl text-left md:text-5xl font-extrabold leading-tight">
        <span className="text-black text-stroke-[1px] text-stroke-[#B85614] ">Unlock Your Learning</span>  <br /> Potential with TutorPal
        </h1>

        <p className="text-lg md:text-xl text-left max-w-2xl pl-2 py-4 bg-[#B85614]/60 border border-transparent rounded-lg">
          Empowering learners and educators through a secure, peer-to-peer
          platform. Share knowledge, earn rewards, and connect globally without
          intermediaries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* <Button className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 px-6 py-3 text-lg font-semibold rounded-md w-full sm:w-auto">
            <FaUserGraduate /> Explore as Learner
          </Button> */}
            <Link href="/courses">
              <Button className="text-white border-[1px] border-white hover:bg-[#B85614] ">Browse Courses</Button>
            </Link>

            <Link href="/courses/create">
              <Button className="text-white border-[1px] border-white hover:bg-[#B85614] ">Create a Course</Button>
            </Link>

          {/* <Button className="flex items-center gap-2 bg-pink-800 hover:bg-pink-700 px-6 py-3 text-lg font-semibold rounded-md w-full sm:w-auto">
            <FaChalkboardTeacher /> Join as Tutor
          </Button> */}

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
    <section className="min-h-screen  px-6 py-[120px] flex justify-evenly flex-wrap mx-auto">
      <div className="flex flex-col justify-between w-[45%] ">
        <h2 className="text-5xl text-left font-extrabold leading-[4rem]	">Unlock Your Potential with a Secured, Ownership-Driven Educational Resources</h2>
        <div>
        <p>Secure your learning with resources you truly own. Empower your growth and unlock your potential.</p>
        <br />
        <br />
        <p>Secure your learning with resources you truly own. Empower your growth and unlock your potential.</p>
        </div>
        <div className="flex ">
          <div>
            <img src="/Relume.svg" alt="" />
            <h3>Empower Learning</h3>
            <p>Access a wealth of knowledge with full ownership and security.</p>
          </div>
          <div>
            <img src="/Relume.svg" alt="" />
            <h3>Join Us</h3>
            <p>Become part of a community that values education and innovation.</p>
          </div>
        </div>
      </div>
      <div className="w-[45%]">
        <img src="/image.png" alt="" className="w-[90%] h-auto" />
      </div>
    </section>
    </>
  );
};

export default Hero;
