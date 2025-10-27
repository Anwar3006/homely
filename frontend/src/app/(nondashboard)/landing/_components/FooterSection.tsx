import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const FooterSection = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Agents", href: "/agents" },
    { name: "Contact", href: "/contact-us" },
  ];

  const services = [
    { name: "Buy Property", href: "/buy" },
    { name: "Sell Property", href: "/sell" },
    { name: "Rent Property", href: "/rent" },
    { name: "Property Management", href: "/management" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <section className="relative z-20 w-screen min-h-dvh lg:h-dvh">
      <div className="flex items-center h-full">
        <div className="absolute inset-0">
          {/* Background Image */}
          <div className="relative size-full">
            <Image
              src="/footerImg.jpg"
              alt="Footer"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Footer Content Container */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="bg-linear-to-b from-transparent via-white/70 to-white/80 dark:via-black/90 dark:to-black/95 pt-16 pb-6 sm:pt-20 sm:pb-8">
              <div className="flex flex-col items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* CTA Section */}
                <div className="text-white px-2 mb-8 sm:mb-12 lg:mb-16">
                  <h1 className="font-chango text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                    Let&apos;s Plan your new home!{" "}
                    <Link
                      href={"/contact-us"}
                      className="underline cursor-pointer hover:text-white/80 duration-300 inline-block"
                    >
                      Contact us
                    </Link>
                  </h1>
                </div>

                {/* Footer Content Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 text-foreground">
                  {/* Company Info */}
                  <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold font-chango">
                      Homely
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      Your trusted partner in finding the perfect home. We make
                      real estate simple, transparent, and accessible.
                    </p>
                    <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook size={18} className="sm:w-5 sm:h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={18} className="sm:w-5 sm:h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter size={18} className="sm:w-5 sm:h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} className="sm:w-5 sm:h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Quick Links
                    </h3>
                    <ul className="space-y-2">
                      {quickLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services */}
                  <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Our Services
                    </h3>
                    <ul className="space-y-2">
                      {services.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Contact Us
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      <li className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground justify-center sm:justify-start">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 sm:w-[18px] sm:h-[18px]"
                        />
                        <span className="text-left">
                          123 Main Street, Accra, Ghana
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors justify-center sm:justify-start">
                        <Phone
                          size={16}
                          className="shrink-0 sm:w-[18px] sm:h-[18px]"
                        />
                        <a href="tel:+233123456789">+233 123 456 789</a>
                      </li>
                      <li className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors justify-center sm:justify-start">
                        <Mail
                          size={16}
                          className="shrink-0 sm:w-[18px] sm:h-[18px]"
                        />
                        <a href="mailto:info@homely.com" className="break-all">
                          info@homely.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full border-t border-border pt-4 sm:pt-6 mt-6 sm:mt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <p className="text-center md:text-left">
                      &copy; {new Date().getFullYear()} Homely. All rights
                      reserved.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 lg:gap-6">
                      {legal.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="hover:text-primary transition-colors whitespace-nowrap"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
