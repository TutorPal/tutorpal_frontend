"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import ConnectWalletButton from "./ConnectWalletButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          <Link href="/">DeKXP</Link>
        </div>

        <div className="hidden md:flex space-x-8">
          <Link href="#courses" className="hover:text-white">
            Courses
          </Link>
          <Link href="/consultations" className="hover:text-white">
            Consultations
          </Link>
          <Link href="#about" className="hover:text-white">
            About Us
          </Link>
          <Link href="#support" className="hover:text-white">
            Support
          </Link>
        </div>

        <div className="hidden md:block">
          <ConnectWalletButton />
        </div>

        <div className="md:hidden">
          <Popover open={isOpen} onOpenChange={toggleMenu}>
            <PopoverTrigger>
              <span className="focus:outline-none">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </span>
            </PopoverTrigger>

            <PopoverContent className="bg-gray-800 text-gray-300 w-full text-center">
              <Link
                href="#courses"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 hover:bg-gray-700"
              >
                Courses
              </Link>
              <Link
                href="#consultations"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 hover:bg-gray-700"
              >
                Consultations
              </Link>
              <Link
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 hover:bg-gray-700"
              >
                About Us
              </Link>
              <Link
                href="#support"
                onClick={() => setIsOpen(false)}
                className="block px-6 py-3 hover:bg-gray-700"
              >
                Support
              </Link>
              <ConnectWalletButton />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
