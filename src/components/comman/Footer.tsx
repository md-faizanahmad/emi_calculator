import type { FC } from "react";
import { Mail, Rss, Github, Twitter } from "lucide-react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer
      className="bg-white text-gray-900 py-12 mt-auto bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-blue-50/50 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_30px_rgba(0,0,0,0.05)]"
      aria-label="Footer"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      {/* Welcome Section with White BG & Dark Text */}
      <div className="bg-white py-6 mb-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome to NerdNest
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Your premier destination for tech insights, financial tools, and
            digital wisdom.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2
              className="text-2xl font-bold text-blue-600 mb-4"
              itemProp="name"
            >
              NerdNest Blog
            </h2>
            <p className="text-sm text-gray-600" itemProp="description">
              Bridging the gap between complex technology and everyday financial
              decisions.
            </p>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/category/tech"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Technology
              </Link>
              <Link
                href="/category/finance"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Finance
              </Link>
              <Link
                href="/category/guides"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                How-to Guides
              </Link>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Company
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:nerdnestt@gmail.com"
                className="flex items-center justify-center md:justify-start text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                nerdnestt@gmail.com
              </a>
              <div className="flex gap-4 justify-center md:justify-start mt-2">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Github className="w-5 h-5 text-gray-400 hover:text-gray-900 cursor-pointer" />
                <Rss className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500" itemProp="copyrightNotice">
            © {new Date().getFullYear()} NerdNest Blog. Designed by{" "}
            <a
              href="https://md-faizan-ahmad.web.app/"
              className="font-medium text-blue-600 hover:underline"
            >
              Md Faizan Ahmad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
