import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-amber-50 flex flex-col items-center justify-center text-center px-6">
      {/* Animated Logo and Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="bg-amber-400 text-white p-5 rounded-full shadow-xl">
          <ShieldCheck size={50} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-amber-500">NaroStore</span> Admin Panel
        </h1>
        <p className="text-gray-600 text-lg max-w-lg">
          Manage your store effortlessly — monitor orders, track sales, and
          handle users from a single dashboard.
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-10"
      >
        <button
          onClick={() => navigate("/admin/login")}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all duration-300 hover:scale-105"
        >
          Go to Login
          <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* Footer Section */}
      <div className="absolute bottom-5 text-sm text-gray-500">
        © {new Date().getFullYear()} NaroStore | Admin Management Portal
      </div>
    </div>
  );
};

export default AdminHome;
