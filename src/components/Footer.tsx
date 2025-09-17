import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Facebook, 
  Linkedin, 
  Instagram,
  Mail, 
  MapPin, 
  Phone, 
} from "lucide-react";
import { easeOut } from "framer-motion";



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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut, 
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut }, // ✅
  },
};

const iconVariants = {
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

  return (
    <motion.footer
      ref={ref}
      className="relative bg-black text-white overflow-hidden"
      style={{ 
        minHeight: "20vh",
        fontFamily:
          "'Exo 2', 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="text-center md:text-left">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide mb-2">
                SYNC 2025
              </h2>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
                Follow us
              </h3>
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

          {/* Column 2 */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-cyan-300">Contact Us</h3>
            <div className="space-y-2 text-cyan-100">
              <div className="flex items-start gap-2">
                <Mail className="w-6 h-6 mt-0.5 text-cyan-300" />
                <div>
                  <div className="text-base md:text-lg uppercase tracking-wide text-cyan-200/80">Email</div>
                  <div className="font-semibold text-lg md:text-xl">chairman@abacus.org.in</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-6 h-6 mt-0.5 text-cyan-300" />
                <div className="space-y-1">
                  <div className="text-base md:text-lg uppercase tracking-wide text-cyan-200/80">Phone</div>
                  <div>
                    <div className="text-lg">Kamalesh N</div>
                    <div className="font-semibold text-lg md:text-xl">+91 86103 86055</div>
                  </div>
                  <div>
                    <div className="text-lg">Sulochana H</div>
                    <div className="font-semibold text-lg md:text-xl">+91 90251 93250</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-cyan-300">Location</h3>
            <div className="flex items-start gap-2 text-cyan-100">
              <MapPin className="w-6 h-6 mt-0.5 text-cyan-300" />
              <div className="text-lg md:text-xl">
                Department of CSE, CEG, Anna University
              </div>
            </div>
            <div
              className="relative w-full overflow-hidden rounded-lg border border-cyan-500/30 bg-gray-900/40"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.362437905573!2d80.23340887484216!3d13.012576387306542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52679f6aaaaaab%3A0x90dc1b9c54311d4b!2sDepartment%20Of%20Computer%20Science%20and%20Engineering!5e0!3m2!1sen!2sin!4v1758099584202!5m2!1sen!2sin"
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background floating elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-10 left-8 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-8 w-24 h-24 bg-purple-500/5 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </motion.footer>
  );
}
