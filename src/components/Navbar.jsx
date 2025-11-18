import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { FaExchangeAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <FaExchangeAlt className="text-indigo-500" />
          Bartrly
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:inline-block hover:text-indigo-600">
            Home
          </Link>
          <Link to="/contact" className="hidden md:inline-block hover:text-indigo-600">
            Contact
          </Link>

          <SignedIn>
            <Link to="/dashboard" className="hover:text-indigo-600">
              Dashboard
            </Link>
            <Link to="/my-listings" className="hover:text-indigo-600">
              My Listings
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link to="/sign-in" className="hover:text-indigo-600">
              Login
            </Link>
            <Link 
              to="/sign-up"
              className="px-4 py-1 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              Register
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;