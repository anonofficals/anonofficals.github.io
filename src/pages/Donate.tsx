import React, { useState } from 'react';
import { Heart, Sparkles, Users, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SupportModal from "@/components/SupportModal";

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container-responsive py-12 sm:py-20">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white">
            Support Open Source
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your support helps us build better tools, maintain our infrastructure, and empower the open-source community.
          </p>

          {/* Main Support Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-12 text-xl rounded-xl shadow-2xl hover:shadow-blue-900/50 transition-all hover:scale-105"
          >
            <Heart className="w-6 h-6 mr-3" />
            Support Us
          </Button>
        </motion.div>

        {/* Why Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 md:p-12 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Why Support Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-blue-400">Server Costs</h4>
              <p className="text-gray-400">Help us keep our servers running and our APIs free for everyone.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-purple-400">Development</h4>
              <p className="text-gray-400">Support the development of new features and open-source tools.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-green-400">Community</h4>
              <p className="text-gray-400">Fund community events, hackathons, and educational resources.</p>
            </div>
          </div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 md:p-12 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">Your Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 p-6 rounded-xl border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Every Contribution Matters</h3>
              </div>
              <p className="text-gray-400">
                Whether it's $5 or $100, every contribution helps us maintain and improve our open-source projects that thousands of developers rely on daily.
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <Heart className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">100% Transparent</h3>
              </div>
              <p className="text-gray-400">
                All funds go directly towards infrastructure, development, and community initiatives. We're committed to transparency in how we use your support.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <Heart className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
          <p className="text-lg text-gray-300">
            Every contribution, no matter the size, makes a difference.
          </p>
          <p className="text-sm text-gray-500">
            Thank you for supporting open source! 🚀
          </p>
        </motion.div>

      </div>

      {/* Support Modal */}
      <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Donate;
