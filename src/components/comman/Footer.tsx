import type { FC } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer
      className="bg-gray-900 text-white py-12 mt-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(255,255,255,0.1)]"
      aria-label="Footer"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-4" itemProp="name">
              EMI Calculator
            </h2>
            <p className="text-sm text-gray-300" itemProp="description">
              Your trusted tool for calculating EMIs for home loans, car loans,
              and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <nav
              className="flex flex-col gap-2"
              aria-label="Footer navigation"
              itemScope
              itemType="http://schema.org/SiteNavigationElement"
            >
              <Link
                href="/about"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="About"
                itemProp="url"
              >
                <span itemProp="name">About</span>
              </Link>
              <Link
                href="/contact_us"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Contact Us"
                itemProp="url"
              >
                <span itemProp="name">Contact Us</span>
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Privacy Policy"
                itemProp="url"
              >
                <span itemProp="name">Privacy Policy</span>
              </Link>
              <Link
                href="/terms_of_use"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Terms of Use"
                itemProp="url"
              >
                <span itemProp="name">Terms of Use</span>
              </Link>
            </nav>
          </div>

          {/* Connect With Us */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:nerdnestt@gmail.com"
                className="flex items-center text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="Email"
                itemProp="email"
              >
                <Mail className="w-4 h-4 mr-2" />
                nerdnestt@gmail.com
              </a>
              <Link
                href="/emifaq"
                className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
                aria-label="FAQs"
                itemProp="url"
              >
                <span itemProp="name">FAQs</span>
              </Link>
              <div
                className="flex gap-4 justify-center md:justify-start mt-2"
                itemScope
                itemType="http://schema.org/Organization"
              ></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-300" itemProp="description">
            We do not save your data for your privacy.
          </p>
          <p className="text-sm text-gray-300 mt-2" itemProp="copyrightNotice">
            © {new Date().getFullYear()} EMI Calculator.Design and Content by{" "}
            <a href="https://md-faizan-ahmad.web.app/">Md Faizan Ahmad</a> All
            rights reserved.
          </p>
          {/* <div
            className="min-h-[90px] mt-4 bg-gray-700 rounded-md flex items-center justify-center text-sm text-gray-300"
            aria-label="Advertisement"
          >
            Google AdSense Ad Placeholder
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
