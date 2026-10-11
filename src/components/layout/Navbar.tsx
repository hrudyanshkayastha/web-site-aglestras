"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navigationItems = [
  { name: "Intelligence", href: "/#intelligence" },
  { name: "Capabilities", href: "/services" },
  { name: "Methodology", href: "/methodology" },
  { name: "Research", href: "/research" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#041F1B]/95 backdrop-blur-md py-3.5 border-b border-[#B7E4D5]/10 shadow-[0_4px_24px_rgba(3,23,20,0.5)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus:outline-none"
          aria-label="Agletras Home"
        >
          <div className="relative w-9 h-9 rounded-full bg-[#073B32] p-1 border border-[#B7E4D5]/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Agletras Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain filter contrast-125"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-xl font-semibold tracking-wide text-[#F4F2EA] group-hover:text-[#B7E4D5] transition-colors">
              AGLETRAS
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8DA99E] font-mono -mt-1 hidden sm:block">
              Research Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-8"
          aria-label="Main Navigation"
        >
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm tracking-wide transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-[#B7E4D5] font-medium"
                    : "text-[#C5D9D2] hover:text-[#FFFFFF]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#2FA885]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all duration-200 shadow-[0_2px_12px_rgba(47,168,133,0.2)] hover:shadow-[0_4px_20px_rgba(47,168,133,0.35)]"
          >
            <span>Discuss Engagement</span>
            <ArrowUpRight size={14} />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#C5D9D2] hover:text-[#FFFFFF] hover:bg-[#073B32]/50 border border-[#B7E4D5]/20 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[69px] bg-[#041F1B]/98 border-b border-[#B7E4D5]/20 backdrop-blur-xl px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-[#E2F4EE] hover:text-[#B7E4D5] py-2 border-b border-[#073B32]/60 flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="font-mono text-xs text-[#8DA99E]">→</span>
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5]"
              >
                <span>Discuss an Engagement</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
