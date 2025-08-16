import {
  Shield,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Mail
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-2xl font-bold">Contract Vault</span>
            </div>
            <p className="text-sm text-gray-200 mb-6 max-w-md">
              Secure, fair and transparent contract management with built-in escrow – built for freelancers and small teams.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition">
                <Github className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition">
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Start / Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li><a href="/role-selection" className="hover:text-white transition">Sign Up</a></li>
              <li><a href="/role-selection" className="hover:text-white transition">Login</a></li>
              <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-gray-300">
          <p>© 2024 Contract Vault. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
            <a href="#" className="hover:text-white transition">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
