import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, InstagramIcon, Linkedin, UtensilsCrossed, CalendarCheck, Coffee, Crown,
  Star,
  Flame,
  Headset,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowDown,Mail,
  Loader2
 } from 'lucide-react';
import { FaWhatsapp,FaTwitter } from "react-icons/fa";
import heroImage from './images/herooo.jpeg';
import logoImageweb from './images/CURRICE LOGO FINAL - TRANSPARENT 9.png'; 
import logoimagemobile from './images/CURRICE LOGO FINAL - TRANSPARENT 3.png';
import expirence from './images/CURRICE_EXPERIENCE_LOGO_FINAL_-_TRANSPARENT_5 (1).png'

// Experience Section Images
import exp1 from './images/experience/exp6.jpeg';
import exp2 from './images/experience/exp2.jpeg';
import exp3 from './images/experience/exp3.jpeg';
import exp4 from './images/experience/exp4.jpeg';
import exp5 from './images/experience/exp5.jpeg';

// Partner Brands Images
import BDR from './images/partner_brands/ScreenshotBFR.png';
import Brownilicious from './images/partner_brands/Brownilicious - Logo.jpg';
import Dietbro from './images/partner_brands/Dietbro - Logo.jpg';
import Halims from './images/partner_brands/Halims Biryani - Logo.jpg';
import Ka17 from './images/partner_brands/KA-17 - Logo_.jpg';
import Milan from './images/partner_brands/Milan Caterer - Logo.png';
import MrMsCorn from './images/partner_brands/Mr & Ms Corn - Logo.jpg';
import RCB from './images/partner_brands/RCB -  Logo.png';
import Royalchai from './images/partner_brands/royal chai.png';
import SVA from './images/partner_brands/SVA - Logo.jpg';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const [bookForm, setBookForm] = useState({
    name: '',
    phone: '',
    eventType: '',
  });

  const [joinForm, setJoinForm] = useState({
    brandName: '',
    brandType: '',
    contactPerson: '',
    phone: '',
  });

  const [bookLoading, setBookLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  // Refs for modal close on outside click
  const bookModalRef = useRef<HTMLDivElement>(null);
  const joinModalRef = useRef<HTMLDivElement>(null);

  const sendBookEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookLoading(true);
    setBookSuccess(false);

    try {
      await emailjs.send(
        'service_675asfr',
        'template_ktxa6yd',
        {
          name: bookForm.name,
          phone: bookForm.phone,
          event_type: bookForm.eventType,
          to_email: 'connect@curricefoods.com',
        },
        '-gqKlCaXA0SvQedb2'
      );
      
      setBookSuccess(true);
      setTimeout(() => {
        setShowBookModal(false);
        setBookForm({ name: '', phone: '', eventType: '' });
        setBookSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send event request. Please try again.');
    } finally {
      setBookLoading(false);
    }
  };

  const sendJoinCollective = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinLoading(true);
    setJoinSuccess(false);

    try {
      await emailjs.send(
        'service_675asfr',
        'template_b157v2e',
        {
          brand_name: joinForm.brandName,
          brand_type: joinForm.brandType,
          contact_person: joinForm.contactPerson,
          phone: joinForm.phone,
          to_email: 'connect@curricefoods.com',
        },
        '-gqKlCaXA0SvQedb2'
      );
      
      setJoinSuccess(true);
      setTimeout(() => {
        setShowJoinModal(false);
        setJoinForm({ brandName: '', brandType: '', contactPerson: '', phone: '' });
        setJoinSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setJoinLoading(false);
    }
  };

  // Mobile menu ref for outside click detection
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Set scrolled state for navbar
      setScrolled(scrollY > 50);
      
      // Show WhatsApp button only after scrolling past hero section
      setShowWhatsApp(scrollY > heroHeight * 0.3);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Experience Section - Sliding Images
  const experienceImages = [exp1, exp4, exp5,exp2, exp3,];
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? experienceImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === experienceImages.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-slide
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === experienceImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Handle outside click for mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle outside click for modals
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Book modal
      if (showBookModal && bookModalRef.current && !bookModalRef.current.contains(event.target as Node)) {
        setShowBookModal(false);
        setBookSuccess(false);
        setBookLoading(false);
      }
      
      // Join modal
      if (showJoinModal && joinModalRef.current && !joinModalRef.current.contains(event.target as Node)) {
        setShowJoinModal(false);
        setJoinSuccess(false);
        setJoinLoading(false);
      }
    };

    if (showBookModal || showJoinModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBookModal, showJoinModal]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const whatsappNumber = '919353072525';

  // Generate default WhatsApp message (for Book Event buttons)
  const generateDefaultWhatsAppMessage = () => {
    const message = `Hi, I'm interested in booking an event with Currice Experience. Could you please share more details?`;
    return encodeURIComponent(message);
  };

  // Open WhatsApp with default message (for Book Event buttons)
  const openWhatsAppWithDefaultMessage = () => {
    const message = generateDefaultWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-neutral-50">
      {/* Book Event Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div 
            ref={bookModalRef}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
          >
            <button 
              onClick={() => {
                setShowBookModal(false);
                setBookSuccess(false);
                setBookLoading(false);
              }} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-serif text-amber-900 mb-6">Book Your Event</h3>

            {bookSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-800 mb-2">Request Sent Successfully!</p>
                <p className="text-gray-600">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={sendBookEvent} className="space-y-4">
                <input
                  required
                  placeholder="Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={bookForm.name}
                  onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                />

                <input
                  required
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={bookForm.phone}
                  onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                />

                <select
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={bookForm.eventType}
                  onChange={(e) => setBookForm({ ...bookForm, eventType: e.target.value })}
                >
                  <option value="">Select Event Type</option>
                  <option>Wedding</option>
                  <option>Reception</option>
                  <option>House Warming</option>
                  <option>Corporate Event</option>
                  <option>Others</option>
                </select>

                <button
                  type="submit"
                  disabled={bookLoading}
                  className="w-full bg-amber-700 text-white py-3 rounded-full hover:bg-amber-800 transition font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {bookLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Join Collective Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div 
            ref={joinModalRef}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
          >
            <button 
              onClick={() => {
                setShowJoinModal(false);
                setJoinSuccess(false);
                setJoinLoading(false);
              }} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-serif text-amber-900 mb-6">
              Join the Currice Collective
            </h3>

            {joinSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-xl font-medium text-gray-800 mb-2">Application Submitted!</p>
                <p className="text-gray-600">We'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={sendJoinCollective} className="space-y-4">
                <input
                  required
                  placeholder="Brand Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={joinForm.brandName}
                  onChange={(e) => setJoinForm({ ...joinForm, brandName: e.target.value })}
                />

                <select
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={joinForm.brandType}
                  onChange={(e) => setJoinForm({ ...joinForm, brandType: e.target.value })}
                >
                  <option value="">Type of Brand</option>
                  <option>Restaurant</option>
                  <option>Specialty Food Brand</option>
                  <option>Catering Company</option>
                  <option>Cloud Kitchen</option>
                  <option>Beverage / Dessert Brand</option>
                  <option>Other</option>
                </select>

                <input
                  required
                  placeholder="Contact Person Name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={joinForm.contactPerson}
                  onChange={(e) => setJoinForm({ ...joinForm, contactPerson: e.target.value })}
                />

                <input
                  required
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={joinForm.phone}
                  onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={joinLoading}
                  className="w-full bg-amber-700 text-white py-3 rounded-full hover:bg-amber-800 transition font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {joinLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Apply to Join'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#2C1810] backdrop-blur-md shadow-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex-1 flex justify-center lg:justify-start">
              {/* Mobile Logo */}
              <img
                src={logoimagemobile}
                alt="Currice Logo Mobile"
                className={`h-14 sm:h-16 w-auto lg:hidden transition-all duration-300 ${
                  scrolled ? 'opacity-100' : 'opacity-95 drop-shadow-lg'
                }`}
              />

              {/* Desktop Logo */}
              <img
                src={logoImageweb}
                alt="Currice Logo Desktop"
                className={`hidden lg:block h-16 w-auto transition-all duration-300 ${
                  scrolled ? 'opacity-100' : 'opacity-90 drop-shadow-lg'
                }`}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {[
                'Experience',
                'Why-Different',
                'Collective',
                'How-It-Works',
                'Vision',
                'About',
                'Verticals',
                'Contact',
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))
                  }
                  className="text-sm font-medium text-white/90 transition-colors hover:text-amber-400"
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div
              ref={mobileMenuRef}
              className="absolute top-0 right-0 left-0 bg-[#2C1810] rounded-b-3xl shadow-2xl px-6 pt-6 pb-10 animate-slideDown"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <img src={logoImageweb} alt="Currice Logo" className="h-10 w-auto" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col divide-y divide-white/10">
                {[
                  'Experience',
                  'Why Different',
                  'Collective',
                  'How It Works',
                  'Vision',
                  'About',
                  'Verticals',
                  'Contact',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))
                    }
                    className="flex items-center justify-between py-5 text-lg font-medium text-white hover:text-amber-400 transition"
                  >
                    {item}
                    <ChevronRight className="text-amber-400" size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Floating WhatsApp Button - Conditionally rendered */}
      {showWhatsApp && (
        <button
          onClick={openWhatsAppWithDefaultMessage}
          className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-3 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-110"
        >
          <FaWhatsapp size={24} />
        </button>
      )}

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translate3d(0, 0px, 0)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 opacity-70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto w-full mt-16 md:mt-24">
          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
            India's First Curated<br />Multi-Brand Food Experience
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-white/90 mb-6 font-light tracking-wide max-w-3xl mx-auto px-4 py-2 bg-black/40 rounded">
            Curated premium food-street experiences designed for large events, weddings, and celebrations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => setShowBookModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2 whitespace-nowrap text-base"
            >
              Book Your Event <ChevronRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection('experience')}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 sm:px-8 py-3 rounded-full font-medium border border-white/30 transition-all hover:scale-105 whitespace-nowrap w-full sm:w-auto text-center"
            >
              Explore Currice Experience
            </button>
          </div>

          {/* Supporting Line */}
          <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto w-full">
            <p className="text-xl md:text-2xl text-amber-300 mb-12 font-medium italic">
              More than catering. We curate unforgettable food journeys.
            </p>
          </div>
        </div>
      </section>

      {/* The Currice Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">

          {/* Experience Logo */}
          <div className="text-center mb-3 md:mb-5">
            <img
              src={expirence}
              alt="Currice Experience"
              className="
                mx-auto 
                h-24  /* smaller default height */
                sm:h-32
                md:h-40
                lg:h-48
                xl:h-56
                w-auto
              "
            />
          </div>

          {/* Text Content */}
          <div className="max-w-3xl mx-auto text-left space-y-6 mb-10">
            <p className="text-xl text-gray-700 leading-relaxed">
              Currice Experience is a next-generation food experience concept that reimagines
              how food is presented, served, and remembered at large events and weddings.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              Moving beyond traditional catering formats, Currice curates premium, specialist
              food brands into a seamless, high-quality food-street experience — complete with
              live counters, signature offerings, and thoughtful presentation.
            </p>

            <p className="text-xl text-gray-700 text-center leading-relaxed italic">
              Each event is designed to feel immersive, vibrant, and memorable — where guests
              don't just eat food, they experience it.
            </p>
          </div>

          {/* Image Slider */}
          <div
            className="relative max-w-xl mx-auto"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Slider Window */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {experienceImages.map((img, idx) => (
                  <div key={idx} className="min-w-full">
                    <img
                      src={img}
                      alt="Currice Experience"
                      className="w-full h-[260px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 -left-4 bg-white/90 hover:bg-white text-amber-800 rounded-full p-2 shadow-lg transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white/90 hover:bg-white text-amber-800 rounded-full p-2 shadow-lg transition"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {experienceImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === current ? 'bg-amber-700 scale-110' : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Currice Experience is Different */}
      <section id="why-different" className="py-24 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <h3 className="font-serif text-4xl md:text-5xl mb-14 text-center text-amber-900">
            Why Settle for Ordinary Traditional Catering?
          </h3>

          {/* Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            
            {/* Item 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <UtensilsCrossed className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Curated multi-brand food experience, not a single kitchen
              </p>
              <p className="text-gray-700">
                Guests enjoy multiple iconic food brands in one event.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <Star className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Specialist food brands known for doing one thing exceptionally well
              </p>
              <p className="text-gray-700">
                Every counter is an expert, not a compromise.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <Flame className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Premium food-street style layouts with live counters
              </p>
              <p className="text-gray-700">
                Visually engaging, interactive, and memorable.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <Headset className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Single point of contact for planning, execution & coordination
              </p>
              <p className="text-gray-700">
                One team. Zero confusion. Seamless delivery.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <Layers className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Seamless coordination across all food partners
              </p>
              <p className="text-gray-700">
                Smooth operations before, during, and after the event.
              </p>
            </div>

            {/* Item 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100">
              <Sparkles className="w-10 h-10 text-amber-600 mb-4" />
              <p className="font-semibold text-xl text-gray-900 mb-2">
                Designed for modern, experience-driven celebrations
              </p>
              <p className="text-gray-700">
                Perfect for weddings, receptions, housewarmings & private events.
              </p>
            </div>
          </div>

          {/* Closing Line */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-serif text-amber-900 italic">
              Traditional catering serves food.
              <br />
              Currice Experience creates moments.
            </p>
          </div>
        </div>
      </section>

      {/* Currice Collective */}
      <section id="collective" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="font-serif text-4xl md:text-5xl mb-6 text-center text-amber-900">
            Currice Collective
          </h3>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
              Currice Collective is a carefully curated and growing network of premium food brands and specialty vendors brought together to deliver elevated food experiences at events.
            </p>

            <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
              Each partner is selected for quality, consistency, and guest appeal — ensuring every counter adds value to the overall experience.
            </p>

            <p className="text-xl text-gray-700 text-center leading-relaxed italic">
              We are actively growing the Currice Collective, with more partner brands joining us and new collaborations being added continuously.
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="bg-white rounded-2xl shadow-md p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
              {[
                BDR,
                Brownilicious,
                Dietbro,
                Halims,
                Ka17,
                Milan,
                MrMsCorn,
                RCB,
                Royalchai,
                SVA,
              ].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={logo}
                    alt="Currice Partner Brand"
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Currice Experience Works */}
      <section
        id="how-it-works"
        className="py-24 bg-gradient-to-b from-white to-amber-50 text-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Heading */}
          <h3 className="font-serif text-4xl md:text-5xl mb-16 text-center text-amber-900">
            How the Currice Experience Works
          </h3>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {[
              {
                step: '01',
                title: 'Understanding Your Event',
                desc: 'We begin by learning your event details, guest profile, location, and expectations.',
              },
              {
                step: '02',
                title: 'Curated Experience Design',
                desc: 'Our team designs a premium food-street concept by selecting specialist food brands.',
              },
              {
                step: '03',
                title: 'Seamless Execution',
                desc: 'From counters to coordination, we manage every operational detail end-to-end.',
              },
              {
                step: '04',
                title: 'Unforgettable Guest Moments',
                desc: 'Your guests enjoy a thoughtfully curated food experience that elevates the celebration.',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                
                {/* Card */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all border border-amber-100 h-full">
                  <div className="text-amber-700 font-serif text-3xl mb-4">
                    {item.step}
                  </div>

                  <h4 className="text-xl font-semibold mb-3 text-gray-900">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                {index < 3 && (
                  <>
                    {/* Mobile Arrow (Down) */}
                    <div className="flex justify-center my-1 lg:hidden text-amber-400">
                      <ArrowDown size={28} strokeWidth={1.5} />
                    </div>

                    {/* Desktop Arrow (Right) */}
                    <div className="hidden lg:flex absolute top-1/2 -right-7 transform -translate-y-1/2 text-amber-400">
                      <ArrowRight size={32} strokeWidth={1.5} />
                    </div>
                  </>
                )}

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section id="vision" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-4xl md:text-5xl mb-8 text-amber-900">Our Vision</h3>
          <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
            To build India’s first curated, multi-brand food ecosystem for events, redefining Indian hospitality by evolving traditional Indian catering into a curated, experience-led food ecosystem that brings together exceptional food brands, thoughtful design, and seamless execution across every occasion.
          </p>
          <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
            Currice envisions a future where food is not just served, but experienced — whether it’s a wedding celebration, a corporate gathering, a daily meal solution, or an intimate premium event.
          </p>
          <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
            At the heart of this vision is Currice Experience, our flagship vertical, where iconic food brands come together under one seamless umbrella to create premium, multi-brand food-street experiences for modern celebrations.
          </p>
          <p className="text-xl text-gray-700 mb-10 text-left leading-relaxed">
            Across all our verticals, Currice is committed to elevating how food is planned, presented, and enjoyed — setting a new benchmark beyond traditional catering through memorable moments, meaningful partnerships, and experience-led dining.
          </p>
        </div>
      </section>

      {/* About Currice */}
      <section id="about" className="py-24 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="font-serif text-4xl md:text-5xl mb-6 text-center text-amber-900">
            About Currice
          </h3>

          <div className="max-w-3xl mx-auto">
           <div className="space-y-6 text-lg text-left text-gray-700">
              <p>
                Currice is India's first curated multi-brand food experience, bringing premium food brands together to create unforgettable food-street experiences for events and celebrations.
              </p>
              <p>
                Built on the belief that hospitality at events deserves a new standard, Currice represents a modern approach to how food is experienced in Indian celebrations.
              </p>
              
              <p>
                By bringing together premium food brands under one curated experience, Currice moves beyond traditional catering formats to deliver immersive, experience-led hospitality.
              </p>
              
              <p className="italic text-center">
                From weddings to corporate gatherings, Currice stands for quality, execution, and memorable food experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

    {/* Currice Verticals */}
    <section id="verticals" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="font-serif text-4xl md:text-5xl mb-16 text-center text-amber-900">
          Currice Verticals
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Currice Experience',
              desc: 'Curated multi-brand food experiences for weddings, celebrations, and large events.',
              icon: Sparkles,
            },
            {
              title: 'Currice Daily',
              desc: 'Curated daily meal solutions for offices, co-working spaces, and co-living properties.',
              icon: CalendarCheck,
            },
            {
              title: 'Currice Café',
              desc: 'Cafeteria solutions for corporate offices and co-working environments.',
              icon: Coffee,
            },
            {
              title: 'Currice Executive',
              desc: 'Premium dining experiences for leadership offsites and private executive gatherings.',
              icon: Crown,
            },
          ].map((model, idx) => {
            const Icon = model.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-amber-100"
              >
                {/* Icon */}
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                <h4 className="text-2xl font-serif font-semibold text-amber-900 mb-4">
                  {model.title}
                </h4>

                <p className="text-gray-600 leading-relaxed">
                  {model.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

      {/* Final CTA Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-neutral-50 to-amber-50 text-gray-900"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Heading */}
          <h3 className="font-serif text-4xl md:text-5xl mb-4 text-amber-900">
            Let's Curate Your Food Experience
          </h3>

          {/* Subtext */}
          <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-3xl mx-auto">
            Weddings, celebrations, corporate gatherings, or curated dining experiences —
            Currice brings premium food brands together to elevate your event.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 justify-center mb-14 flex-wrap">
            <button
              onClick={() => setShowBookModal(true)}
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Book Your Event <ChevronRight size={16} />
            </button>

            <button
              onClick={() => setShowJoinModal(true)}
              className="bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 px-6 sm:px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
            >
              Join the Currice Collective
            </button>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center gap-6 text-gray-700">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Phone / WhatsApp
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="text-xl font-medium hover:text-amber-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 93530 72525
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Email
              </p>
              <a
                href="mailto:connect@curricefoods.com"
                className="text-lg font-medium hover:text-amber-700 transition-colors"
              >
                connect@curricefoods.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C1810] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
            {/* Brand Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <img src={logoImageweb} alt="Currice Logo" className="h-12 w-auto mb-2" />
              <p className="text-white/80 text-sm">
                Curated Food Experiences | Events | Daily Meals | Cafeterias | Executive Dining
              </p>
              <p className="text-white/60 text-sm">
                RAINMAKERS WORKSPACE<br />
                SREE GURURAYA MANSION 759
                3RD FLOOR <br/> 8TH MAIN ROAD, Bengaluru, Karnataka 560078
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/currice_foods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              >
                <InstagramIcon size={18} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/curricefoods/"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              >
                <Linkedin size={18} className="text-white" />
              </a>
              {/* X (Twitter) */}
              <a
                href="https://x.com/currice_foods?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              >
                <FaTwitter size={18} className="text-white" />
              </a>

              {/* Email */}
              <a
                href="mailto:connect@curricefoods.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20"
              >
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © Currice Foods. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;