import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Linkedin, 
  Instagram,
  Mail, 
  MapPin, 
  Phone, 
  ArrowUp, 
} from "lucide-react";

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
        minHeight: '10vh',
        fontFamily: "'Exo 2', 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif"
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-white hover:bg-gray-900 text-gray-950 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Contact Us */}
          <motion.div className="space-y-4" variants={itemVariants}>
            {/* shifted slightly left with pl-12 */}
            <h3 className="text-3xl font-bold text-cyan-300 text-center md:text-left pl-0 md:pl-56">Contact Us</h3>
            <div className="space-y-8 text-cyan-100">
              {/* 2-2 grid of contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {/* Kamalesh */}
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-white">Kamalesh N</div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="font-semibold text-lg">+91 86103 86055</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-base">chairperson@abacus.org.in</span>
                  </div>
                </div>

                {/* Sulochana */}
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-white">Sulochana H</div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="font-semibold text-lg">+91 90251 93250</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-base">chairperson@abacus.org.in</span>
                  </div>
                </div>

                {/* Hariharan */}
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-white">Hariharan A</div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="font-semibold text-lg">+91 90000 00001</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-base">vicechairperson@abacus.org.in</span>
                  </div>
                </div>

                {/* Ishwarya */}
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-white">Ishwarya D</div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="font-semibold text-lg">+91 9345214813</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-base">vicechairperson@abacus.org.in</span>
                  </div>
                </div>
              </div>

              {/* Madhubaalika */}
              <div className="flex justify-center md:justify-start pl-0 md:pl-56">
                <div className="text-center md:text-left w-full sm:w-auto">
                  <div className="text-xl font-semibold text-white ">Madhubaalika M</div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start ">
                    <Phone className="w-5 h-5 text-cyan-300" />
                    <span className="font-semibold text-lg ">+91 7305897553</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-cyan-300" />
                    <span className="text-base">generalsecretary@abacus.org.in</span> 
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Map + Socials (unchanged) */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-cyan-300 text-center md:text-left">Map</h3>
            <div className="flex items-start gap-2 text-cyan-100">
              <MapPin className="w-6 h-6 mt-0.5 text-cyan-300" />
              <div className="text-lg md:text-xl">Department of CSE, CEG, Anna University</div>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg border border-cyan-500/30 bg-gray-900/40 h-48 md:h-60">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.362437905573!2d80.23340887484216!3d13.012576387306542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52679f6aaaaaab%3A0x90dc1b9c54311d4b!2sDepartment%20Of%20Computer%20Science%20and%20Engineering!5e0!3m2!1sen!2sin!4v1758099584202!5m2!1sen!2sin"
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">Follow us</h3>
              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900/60 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-cyan-500/20 text-cyan-300 hover:text-cyan-200"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
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
