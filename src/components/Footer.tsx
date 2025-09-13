import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Linkedin, 
  Instagram,
  Mail, 
  MapPin, 
  Phone, 
  Users, 
  Award,
  Heart,
  ArrowUp
} from "lucide-react";

interface ContactPerson {
  name: string;
  position: string;
  phone?: string;
  email?: string;
}

const contactPersons: ContactPerson[] = [
  { name: "Kamalesh", position: "Chairperson", phone: "+91 98765 43210", email: "chairperson@abacus.org.in" },
  { name: "Sulochana", position: "Chairperson", phone: "+91 90251 93250", email: "chairperson@abacus.org.in" },
  { name: "Hariharan", position: "Vice Chairperson", phone: "+91 98765 43212", email: "vicechairperson@abacus.org.in" },
  { name: "Ishwarya", position: "Vice Chairperson", phone: "+91 93452 14813", email: "vicechairperson@abacus.org.in" },
  {name: "Madhubaalika", position: "General Secretary", phone: "+91 73058 97553", email: "generalsecretary@abacus.org.in" }
];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/csea.ceg",
    icon: Facebook,
    color: "hover:text-blue-600"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/csea_ceg/",
    icon: Instagram,
    color: "hover:text-pink-500"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/csea-ceg/posts/?feedView=all",
    icon: Linkedin,
    color: "hover:text-blue-700"
  }
];

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer 
      className="relative bg-black text-white overflow-hidden"
      style={{ 
        minHeight: '30vh',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif"
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Section - Contact Details */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            {/* CSEA Header */}
            <motion.div 
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-wide">
                CSEA
              </h2>
              <p className="text-cyan-100 text-xl font-medium mb-2">
                Computer Science & Engineering Association
              </p>
              <p className="text-cyan-200 text-lg">
                College of Engineering, Guindy
              </p>
            </motion.div>

            {/* Contact Persons */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold flex items-center gap-2 text-cyan-300">
                <Users className="w-6 h-6" />
                Contact Information
              </h3>
              
              <div className="space-y-3">
                {contactPersons.slice(0, 2).map((person, index) => (
                  <motion.div
                    key={person.name}
                    className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/20"
                    whileHover={{ scale: 1.01, y: -1 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-cyan-300 text-xl mb-1">{person.name}</h4>
                        <p className="text-cyan-100 text-base mb-2 font-medium">{person.position}</p>
                        {person.phone && (
                          <div className="flex items-center gap-2 text-cyan-200 text-base mb-1">
                            <Phone className="w-5 h-5" />
                            <span className="font-medium">{person.phone}</span>
                          </div>
                        )}
                        {person.email && (
                          <div className="flex items-center gap-2 text-cyan-200 text-base">
                            <Mail className="w-5 h-5" />
                            <span className="truncate font-medium">{person.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-cyan-300">Follow Us</h3>
              <div className="flex gap-3 justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900/60 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/20 text-cyan-300 hover:text-cyan-200"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Contact Details Extended */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            {/* Additional Contact Persons */}
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold flex items-center gap-2 text-cyan-300">
                <Users className="w-6 h-6" />
                Additional Contact Information
              </h3>
              
              <div className="space-y-3">
                {contactPersons.slice(2).map((person, index) => (
                  <motion.div
                    key={person.name}
                    className="bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/20"
                    whileHover={{ scale: 1.01, y: -1 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-cyan-300 text-xl mb-1">{person.name}</h4>
                        <p className="text-cyan-100 text-base mb-2 font-medium">{person.position}</p>
                        {person.phone && (
                          <div className="flex items-center gap-2 text-cyan-200 text-base mb-1">
                            <Phone className="w-5 h-5" />
                            <span className="font-medium">{person.phone}</span>
                          </div>
                        )}
                        {person.email && (
                          <div className="flex items-center gap-2 text-cyan-200 text-base">
                            <Mail className="w-5 h-5" />
                            <span className="truncate font-medium">{person.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-cyan-300">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Events", href: "#events" },
                  { name: "About Us", href: "#about" },
                  { name: "Gallery", href: "#gallery" },
                  { name: "Contact", href: "#contact" }
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="p-3 bg-gray-900/60 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/20 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-cyan-200 hover:text-cyan-100 transition-colors text-base font-medium">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Location Section - Simple Text */}
        <motion.div 
          className="mt-6 pt-4 border-t border-cyan-500/30 text-center"
          variants={itemVariants}
        >
          <motion.a
            href="https://www.google.com/maps/place/Department+Of+Computer+Science+and+Engineering/@13.0125764,80.2346963,18z/data=!3m1!4b1!4m6!3m5!1s0x3a52679f6aaaaaab:0x90dc1b9c54311d4b!8m2!3d13.0125764!4d80.2359838!16s%2Fg%2F11b7jfdnj0?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">📌</span>
            <span className="text-xl font-medium">Department of CSE, CEG, Anna University, Chennai</span>
          </motion.a>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-4 pt-3 border-t border-cyan-500/30"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-cyan-200 text-base font-medium">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Made with passion by CSEA Team</span>
            </div>
            
            <div className="flex items-center gap-4 text-cyan-200 text-base">
              <span className="font-medium">© {currentYear} CSEA CEG. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-300" />
                <span className="font-medium">Excellence in Engineering</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-10 left-8 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-8 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.footer>
  );
}
