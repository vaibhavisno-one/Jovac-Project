import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/MyListings";
import AddListing from "./pages/AddListing";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";
import { SignIn, SignUp } from "@clerk/clerk-react";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Clerk Authentication Routes */}
          <Route 
            path="/sign-in/*" 
            element={
              <div className="flex items-center justify-center min-h-[70vh]">
                <SignIn 
                  routing="path" 
                  path="/sign-in" 
                  signUpUrl="/sign-up"
                  afterSignInUrl="/dashboard"
                />
              </div>
            } 
          />
          <Route 
            path="/sign-up/*" 
            element={
              <div className="flex items-center justify-center min-h-[70vh]">
                <SignUp 
                  routing="path" 
                  path="/sign-up" 
                  signInUrl="/sign-in"
                  afterSignUpUrl="/dashboard"
                />
              </div>
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-listing"
            element={
              <ProtectedRoute>
                <AddListing />
              </ProtectedRoute>
            }
          />
          
          {/* Public Routes */}
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;