/**
 * Footer Component
 *
 * Footer with organized link sections, branding, and copyright information.
 * Responsive layout: single column on mobile, multi-column on desktop.
 *
 * Usage:
 * <Footer />
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" },
      { label: "Status", href: "/status" },
      { label: "Report Bug", href: "/report-bug" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@todoapp.com", label: "Email" },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white mt-auto">
      <div className="container mx-auto px-6 py-12 md:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-purple-100">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="inline-block text-sm text-purple-200 transition-colors hover:text-white"
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-purple-500/30" />

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Branding & Copyright */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <span className="text-sm text-purple-200">
              &copy; {currentYear} Todo App. All rights reserved.
            </span>
            <span className="hidden text-purple-400 md:inline">•</span>
            <div className="flex items-center space-x-1 text-sm text-purple-200">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-current text-red-400" />
              <span className="text-white">
                by{" "}
                <Link
                  href="https://www.linkedin.com/in/ashna-ghazanfar-b268522b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  Ashna Ghazanfar
                </Link>
              </span>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center",
                      "rounded-full bg-white/10 text-purple-100",
                      "transition-colors hover:bg-white/20 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
