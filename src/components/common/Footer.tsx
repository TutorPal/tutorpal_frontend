import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">About DeKXP</h2>
          <p className="text-sm">
            DeKXP is a decentralized platform designed to connect learners and
            tutors globally, enabling direct knowledge exchange without
            intermediaries.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#courses" className="hover:text-white">
                Courses
              </a>
            </li>
            <li>
              <a href="#consultations" className="hover:text-white">
                Consultations
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#support" className="hover:text-white">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Subscribe</h2>
          <p className="text-sm mb-4">
            Get the latest updates on new courses and features.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-gray-300 outline-none"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-white font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DeKXP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
