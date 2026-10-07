"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

import pagesData from '@/app/data/pages.json'
// Derive navigation links directly from the JSON — no fetch, no axios, no loading state
const serviceLinks = (pagesData as { title: string; slug: string }[]).map(
  (page) => ({
    title: page.title,
    slug: page.slug,
  })
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const sunIconRef = useRef<HTMLSpanElement>(null);
  const moonIconRef = useRef<HTMLSpanElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-services-dropdown]")) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  // Theme toggle
  const handleThemeToggle = () => {
    const newDark = !isDark;

    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");

    if (toggleBtnRef.current) {
      gsap.fromTo(
        toggleBtnRef.current,
        { scale: 0.8, rotate: -30 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: "back.out(2)",
        }
      );
    }

    const outIcon = newDark ? sunIconRef.current : moonIconRef.current;
    const inIcon = newDark ? moonIconRef.current : sunIconRef.current;

    if (outIcon && inIcon) {
      gsap.to(outIcon, {
        opacity: 0,
        scale: 0.5,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.fromTo(
        inIcon,
        { opacity: 0, scale: 0.5, rotate: 90 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.35,
          ease: "back.out(2)",
          delay: 0.15,
        }
      );
    }
  };

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.06] bg-white shadow-sm transition-colors duration-300 dark:border-white/[.08] dark:bg-gray-900">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary transition-colors duration-300 dark:text-secondary"
          >
            GEMBA THE WORKPLACE
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown — from JSON */}
            <div className="relative" data-services-dropdown>
              <button
                type="button"
                onClick={() => setIsServicesOpen((value) => !value)}
                aria-expanded={isServicesOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div
                  role="menu"
                  className="absolute left-1/2 top-full z-50 mt-4 w-80 -translate-x-1/2 rounded-xl border border-black/[.08] bg-white p-2 shadow-xl dark:border-white/[.1] dark:bg-gray-800"
                >
                  {serviceLinks.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No services found.
                    </p>
                  ) : (
                    <>
                      {serviceLinks.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/services/${page.slug}`}
                          role="menuitem"
                          onClick={() => setIsServicesOpen(false)}
                          className="block rounded-lg px-4 py-3 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        >
                          <span className="block text-sm font-medium text-gray-800 dark:text-gray-100">
                            {page.title}
                          </span>

                          <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                            View service details
                          </span>
                        </Link>
                      ))}

                      <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700">
                        <Link
                          href="/services"
                          onClick={() => setIsServicesOpen(false)}
                          className="block rounded-lg px-4 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                        >
                          View all services →
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
            >
              Contact
            </Link>
          </div>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              ref={toggleBtnRef}
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] bg-gray-100 text-gray-600 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-600 dark:border-white/[.1] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400"
            >
              <span
                ref={sunIconRef}
                className="absolute"
                style={{ opacity: isDark ? 1 : 0 }}
              >
                <Sun size={18} />
              </span>

              <span
                ref={moonIconRef}
                className="absolute"
                style={{ opacity: isDark ? 0 : 1 }}
              >
                <Moon size={18} />
              </span>
            </button>

            <Link
              href="/get-started"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleThemeToggle}
              aria-label="Toggle dark mode"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-gray-100 text-gray-600 transition-colors dark:border-white/[.1] dark:bg-gray-800 dark:text-gray-300"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="border-t border-gray-100 pb-4 pt-2 dark:border-gray-700 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
              >
                About
              </Link>

              {/* Mobile services — from JSON */}
              <div className="mt-1 rounded-lg bg-gray-50 p-2 dark:bg-gray-800/60">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Services
                </p>

                {serviceLinks.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/services/${page.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-white hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400"
                  >
                    {page.title}
                  </Link>
                ))}

                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400"
                >
                  View all services →
                </Link>
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
              >
                Contact
              </Link>

              <Link
                href="/get-started"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}