import React from "react";
import { useListings } from "../context/ListingsContext";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { FaList, FaHandshake, FaInbox, FaPlusCircle } from "react-icons/fa";
import BarterCard from "../components/BarterCard";

const Dashboard = () => {
  const { user: clerkUser } = useUser();
  const { listings } = useListings(); 

  const userName = clerkUser?.fullName || clerkUser?.firstName || clerkUser?.emailAddress;

  const recentOffers = [
    {
      id: 1,
      from: "Mike",
      listing: "Mountain Bike",
      message: "Interested in trading my skateboard for your bike!",
      date: "2025-07-07",
    },
    {
      id: 2,
      from: "Elena",
      listing: "Old Guitar",
      message: "Would you swap for a violin?",
      date: "2025-07-06",
    },
  ];

  const userListings = listings.filter(
    (l) => clerkUser && l.userId === clerkUser.id
  );

  // Get total listings count
  const totalListings = listings.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-indigo-600">{userName}</span>!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaList className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{userListings.length}</div>
          <div className="text-gray-500 text-sm">Your Listings</div>
        </div>
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaHandshake className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{totalListings}</div>
          <div className="text-gray-500 text-sm">Total Listings</div>
        </div>
        <div className="bg-white rounded shadow p-5 flex flex-col items-center">
          <FaInbox className="text-3xl text-indigo-500 mb-2" />
          <div className="text-lg font-semibold">{recentOffers.length}</div>
          <div className="text-gray-500 text-sm">Recent Offers</div>
        </div>
      </div>

      {/* Your Recent Listings */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold">Your Recent Listings</h3>
          <Link 
            to="/add-listing"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 text-sm"
          >
            <FaPlusCircle />
            Add New
          </Link>
        </div>
        {userListings.length === 0 ? (
          <div className="bg-white rounded shadow p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't posted any listings yet.</p>
            <Link 
              to="/add-listing"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
            >
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.slice(0, 3).map((listing) => (
              <BarterCard key={listing.id} {...listing} editable={false} />
            ))}
          </div>
        )}
        {userListings.length > 3 && (
          <div className="text-center mt-4">
            <Link 
              to="/my-listings"
              className="text-indigo-600 font-medium hover:underline"
            >
              View All Your Listings ({userListings.length})
            </Link>
          </div>
        )}
      </div>

      {/* Recent offers/messages */}
      <div>
        <h3 className="text-xl font-bold mb-3">Recent Offers</h3>
        {recentOffers.length === 0 ? (
          <div className="bg-white rounded shadow p-6 text-center text-gray-500">
            No offers yet. Keep checking back!
          </div>
        ) : (
          <div className="bg-white rounded shadow">
            <ul className="divide-y">
              {recentOffers.map((offer) => (
                <li key={offer.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="font-semibold">{offer.from}</span> offered on{" "}
                      <span className="text-indigo-600">{offer.listing}</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      "{offer.message}"
                    </div>
                    <div className="text-xs text-gray-400">
                      {offer.date}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;