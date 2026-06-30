import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  CreditCard,
  Shield,
  Gift,
  Plane,
  Utensils,
  ArrowRight,
  Star,
  CheckCircle,
  Ban,
  ArrowUp,
  Menu,
  X,
  Headphones,
  Lock,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#96144c] shadow-lg"
            : "bg-gradient-to-b from-[#96144c] to-[#6a0c35]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3">
          <Link to="/" className="flex items-center gap-2">
  <img src="/logo-white.png" alt="Axis Bank" className="h-8 sm:h-10 w-auto" />
</Link>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              Features
            </a>
            <a href="#apply" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              Apply Card
            </a>
            <a href="#limit" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              Limit Increase
            </a>
            <a href="#block" className="text-white/90 hover:text-white font-medium text-sm transition-colors">
              Block Card
            </a>
            <Link
              to="/apply"
              className="bg-white text-[#96144c] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
            >
              Apply Now
            </Link>
          </div>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col p-4 gap-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium py-2">
                Features
              </a>
              <a href="#apply" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium py-2">
                Apply Card
              </a>
              <a href="#limit" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium py-2">
                Limit Increase
              </a>
              <a href="#block" onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium py-2">
                Block Card
              </a>
              <Link
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#96144c] text-white px-5 py-3 rounded-lg font-semibold text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-b from-[#96144c] via-[#96144c] to-[#96144c] min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest">
                Trusted by Millions of Indians
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Get Your Dream <br />
              <span className="text-gray-900">Credit Card</span>
            </h1>
            <p className="text-white/90 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              Experience the power of seamless payments. Apply in minutes, enjoy
              exclusive benefits, and access premium services designed for the
              modern Indian lifestyle.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <Gift size={16} />, text: "500+ Reward Points" },
                { icon: <TrendingUp size={16} />, text: "Cashback Offers" },
                { icon: <Plane size={16} />, text: "Lounge Access" },
                { icon: <Star size={16} />, text: "Movie Offers" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg border-l-4 border-gray-900"
                >
                  <span className="text-[#96144c]">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 bg-white text-[#96144c] px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-lg"
              >
                Apply Now <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-[#96144c] transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full absolute -top-8 -left-8" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl w-80">
                <div className="bg-gradient-to-r from-[#96144c] to-[#b81d5e] rounded-2xl p-5 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-bold text-lg tracking-wider">AXIS BANK</span>
                    <CreditCard size={28} />
                  </div>
                  <div className="text-sm opacity-90 mb-1">Platinum Credit Card</div>
                  <div className="font-mono text-lg tracking-widest mb-4">
                    4XXX XXXX XXXX 8XXX
                  </div>
                  <div className="flex justify-between text-xs opacity-90">
                    <div>
                      <div className="opacity-70">CARD HOLDER</div>
                      <div className="font-medium">RAHUL SHARMA</div>
                    </div>
                    <div>
                      <div className="opacity-70">EXPIRES</div>
                      <div className="font-medium">12/28</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">2X</div>
                    <div className="text-white/60 text-[10px]">Rewards</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">5%</div>
                    <div className="text-white/60 text-[10px]">Cashback</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="text-white font-bold text-sm">0%</div>
                    <div className="text-white/60 text-[10px]">Joining Fee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Turn Spending Into Rewards
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
              Here's the deal - use your Credit Card, earn points, get awesome
              stuff. Start with bonus points just for activating your card.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Gift size={28} />, title: "500 Points", desc: "On Activation" },
              { icon: <ShoppingCart size={28} />, title: "2X Points", desc: "On Online Shopping" },
              { icon: <Utensils size={28} />, title: "Dining Deals", desc: "At Partner Restaurants" },
              { icon: <Plane size={28} />, title: "Travel Perks", desc: "Airport Lounge Access" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-3 transition-all group"
              >
                <div className="w-16 h-16 bg-[#96144c] rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-[#96144c] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Start Earning Points <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-[#005B75] to-[#003D4F] text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready for a New Card?
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-8">
              Getting a new Credit Card has never been this easy. Just fill up a
              simple form, verify yourself, and you're all set!
            </p>
            <div className="flex flex-col gap-5 mb-8">
              {[
                { num: "1", title: "Fill Form", desc: "Complete the online application" },
                { num: "2", title: "Verify KYC", desc: "Quick digital verification" },
                { num: "3", title: "Get Card", desc: "Delivered to your doorstep" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#96144c] rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{step.title}</h4>
                    <p className="text-white/70 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-white text-[#96144c] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Apply Now <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-6xl font-extrabold text-white/20 mb-2">3</div>
              <div className="text-xl font-bold mb-1">Easy Steps</div>
              <div className="text-white/70 text-sm mb-4">To get your card</div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-400" />
                <span>100% Digital Process</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limit Section */}
      <section id="limit" className="py-20 px-4 sm:px-6 lg:px-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl text-center shadow-sm border-t-4 border-[#96144c]">
                <h3 className="text-3xl font-extrabold text-[#96144c] mb-1">2L</h3>
                <p className="text-gray-500 text-sm font-semibold">Current Limit</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center shadow-sm border-t-4 border-[#96144c]">
                <h3 className="text-3xl font-extrabold text-[#96144c] mb-1">5L+</h3>
                <p className="text-gray-500 text-sm font-semibold">Possible Increase</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Need More Spending Power?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-6">
              Running out of limit? Check your eligibility and get your credit
              card limit increased instantly.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Check eligibility in seconds",
                "Get answer within 24 hours",
                "Totally free - no hidden charges",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold text-gray-800">
                  <CheckCircle size={20} className="text-[#96144c] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 bg-[#96144c] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              <ArrowUp size={18} /> Request Increase
            </Link>
          </div>
        </div>
      </section>

      {/* Block Section */}
      <section id="block" className="py-20 px-4 sm:px-6 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Lost Your Card? Block It Now
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-8">
              Don't panic! If your card is lost or stolen, block it instantly.
              One click and no one can use it.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: <Shield size={22} />, title: "Block in Seconds", desc: "Immediate protection via iMobile or Net Banking" },
                { icon: <Lock size={22} />, title: "Zero Fraud Liability", desc: "Your money is safe with our fraud protection" },
                { icon: <Headphones size={22} />, title: "24/7 Support", desc: "Call us anytime at 1800 1080" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border-l-4 border-[#96144c] hover:bg-white/10 hover:translate-x-1 transition-all"
                >
                  <span className="text-[#96144c] mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/block"
              className="inline-flex items-center gap-2 bg-[#96144c] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              <Ban size={18} /> Block Card Now
            </Link>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="bg-white/5 rounded-3xl p-8 text-center">
              <Shield size={64} className="mx-auto mb-4 text-[#96144c]" />
              <div className="text-lg font-bold mb-2">Instant Protection</div>
              <p className="text-white/60 text-sm mb-4">
                Block your card in under 30 seconds
              </p>
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white border-t-4 border-[#96144c]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Banking That Actually Works For You
          </h2>
          <p className="text-gray-500 mb-12">
            We've been serving India since 1994. Millions trust us.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "5000+", label: "Branches across India" },
              { num: "10M+", label: "Happy Customers" },
              { num: "24/7", label: "Customer Support" },
              { num: "99.9%", label: "Uptime Guaranteed" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-2xl hover:-translate-y-2 hover:shadow-lg transition-all border-b-4 border-[#96144c]"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#96144c] mb-1">
                  {stat.num}
                </h3>
                <p className="text-gray-500 text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Loved by Millions
            </h2>
            <p className="text-gray-500">Here's what real customers say.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Got my Credit Card in just 3 days! The rewards on dining and movies are amazing. Highly recommended!",
                name: "Rahul Sharma",
                city: "Delhi",
                stars: 5,
              },
              {
                text: "The airport lounge access is a game changer. Best banking experience ever! Smooth process from start to finish.",
                name: "Priya Patel",
                city: "Mumbai",
                stars: 5,
              },
              {
                text: "I lost my card while traveling and blocked it instantly via the app. Got a replacement within 48 hours!",
                name: "Amit Verma",
                city: "Bangalore",
                stars: 4,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border-t-4 border-[#96144c]"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={
                        j < review.stars
                          ? "text-[#96144c] fill-[#96144c]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#96144c] to-[#6a0c35] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <p className="text-gray-400 text-xs">{review.city}, India</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-12 border-t-4 border-[#96144c]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold tracking-wider">AXIS BANK</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
            {["Privacy Policy", "Terms of Service", "Contact Us", "Careers"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/70 hover:text-[#96144c] font-medium text-sm transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
          <p className="text-white/40 text-sm pt-6 border-t border-white/10">
            &copy; 2026 Axis Bank Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ShoppingCart(props: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
