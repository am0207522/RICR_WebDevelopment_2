import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const slides = [
  { image: "/bgImage.jpg", alt: "image 1" },
  { image: "/bgImage2.jpg", alt: "image 2" },
  { image: "/bgImage3.jpg", alt: "image 3" },
  { image: "/bgImage4.jpg", alt: "image 4" },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // CHANGED: auto-advance logic, replacing Bootstrap's data-bs-ride="carousel"
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <>
      {/* Header navbar
      <header className="sticky top-0 z-[999] h-[65px] bg-[#c2410c] flex items-center justify-between flex-wrap px-6 md:px-12 py-1">
        {/* Logo */}
      {/* <div className="ms-1">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[86px] h-[55px] object-contain"
            />
          </Link>
        </div> */}

      {/* Login / Register */}
      {/* <div className="flex gap-2 items-center mt-2 md:mt-0">
          <Link
            to="/login"
            className="px-3.5 py-1.5 bg-[#c2410c] border border-transparent rounded-md text-white hover:border-[#f4f4f5] transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-white text-[#c2410c] rounded-md px-3 py-1 border border-transparent hover:bg-[#c2410c] hover:text-white hover:border-white transition-colors duration-300"
          >
            Register
          </Link>
        </div> */}
      {/* </header> */}

      {/* Carousel */}
      <div className="relative w-full h-150 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover brightness-[60%]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-12">
              <h1 className="font-bold text-[clamp(1.5rem,3vw,3.5rem)]">
                Your Favorite Food,
                <br />
                Delivered Fast
              </h1>
              <p className="text-[clamp(1rem,2.5vw,1.25rem)] mt-2 max-w-xl">
                Order from thousands of restaurants and get it delivered to your
                doorstep
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-md bg-[#c2410c] text-white hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/order-now"
                  className="px-5 py-2.5 rounded-md bg-white text-gray-900 hover:bg-gray-100 transition"
                >
                  Order Now
                </Link>
              </div>

              {/* Search bar */}
              <div className="w-4/5 mt-4 bg-white rounded-lg px-2 py-2.5 flex justify-center">
                <div className="w-full flex items-center rounded-lg px-2 text-[#2d1b10]">
                  <Search size={18} className="shrink-0" />
                  <input
                    type="text"
                    placeholder="Search restaurants or dishes..."
                    className="flex-1 bg-transparent outline-none px-2 py-1 text-base placeholder:text-[#c2410c]/50"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            ></button>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous"
          className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next"
          className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Featured Restaurants Section */}
      <section className="py-4 bg-gradient-to-b from-[#c2410c] to-white">
        <div className="container mx-auto px-3">
          <div className="text-center md:text-left mx-5 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary-content) mb-2">Featured Restaurants</h2>
            <p className="text-white/75">3 restaurants available</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-200">
              <img
                src="/topViewRestr.avif"
                alt="Under The Mango Tree"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-[#c2410c] text-white text-sm font-bold rounded-full px-3 py-1 flex items-center gap-1">
                <Star size={14} fill="currentColor" /> 3.6
              </span>
              <div className="p-4 flex flex-col flex-1">
                <h5 className="font-semibold text-lg mb-2">
                  Under The Mango Teree
                </h5>
                <p className="text-sm text-gray-600 flex-1">
                  Enjoy the thrill of grill and barbecue at Under The Mango Tree
                  restaurant at Jehan Numa Palace,
                  <br /> Bhopal Head here now!.
                </p>
                <div className="flex gap-2 flex-wrap my-3">
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Indian
                  </button>
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Chineese
                  </button>
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Italian
                  </button>
                </div>
                <div className="border-t border-[#e7d9c9] mb-3"></div>
                {/* CHANGED: href="#" -> Link to="#" (kept as placeholder, same as original) */}
                <Link
                  to="#"
                  className="bg-[#c2410c] text-white w-full text-center py-2 rounded-md hover:opacity-90 transition"
                >
                  Explore Menu
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-200">
              <img
                src="/restraimg.webp"
                alt="Raj Darbar"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-[#c2410c] text-white text-sm font-bold rounded-full px-3 py-1 flex items-center gap-1">
                <Star size={14} fill="currentColor" /> 4.8
              </span>
              <div className="p-4 flex flex-col flex-1">
                <h5 className="font-semibold text-lg mb-2">Raj Darbar</h5>
                <p className="text-sm text-gray-600 flex-1">
                  Raj Darbar is a one-of-a-kind Indian restaurant <br /> that
                  offers a unique dining experience for families <br /> and
                  friends with a dhaba-style theme.
                </p>
                <div className="flex gap-2 flex-wrap my-3">
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Indian
                  </button>
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Chineese
                  </button>
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Italian
                  </button>
                </div>
                <div className="border-t border-[#e7d9c9] mb-3"></div>
                <Link
                  to="#"
                  className="bg-[#c2410c] text-white w-full text-center py-2 rounded-md hover:opacity-90 transition"
                >
                  Explore Menu
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:scale-[1.03] transition-transform duration-200">
              <img
                src="/seatingplaceImg.webp"
                alt="Countryside Culture"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-[#c2410c] text-white text-sm font-bold rounded-full px-3 py-1 flex items-center gap-1">
                <Star size={14} fill="currentColor" /> 4.1
              </span>
              <div className="p-4 flex flex-col flex-1">
                <h5 className="font-semibold text-lg mb-2">
                  Countryside Culture
                </h5>
                <p className="text-sm text-gray-600 flex-1">
                  A hidden gem away from the city, offering lush <br /> green
                  meadows and peaceful walking paths for <br /> relaxation.
                </p>
                <div className="flex gap-2 flex-wrap my-3">
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Indian
                  </button>
                  <button className="bg-[#e7d9c9] text-xs px-2.5 py-1 rounded">
                    Chineese
                  </button>
                </div>
                <div className="border-t border-[#e7d9c9] mb-3"></div>
                <Link
                  to="#"
                  className="bg-[#c2410c] text-white w-full text-center py-2 rounded-md hover:opacity-90 transition"
                >
                  Explore Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cravings by the Numbers */}
      <section className="bg-[#fff8f1]">
        <div className="container mx-auto py-12 px-3">
          <h2 className="text-center text-3xl font-bold mb-3">
            Cravings by the Numbers
          </h2>
          <p className="text-center text-lg mb-10 text-gray-600">
            See why millions trust us for their daily food delivery needs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {/* Card 1 */}
            <div className="bg-white shadow-sm rounded-lg text-center w-full h-full py-8">
              <h3 className="text-[#c2410c] text-4xl font-bold mb-2">2.5M+</h3>
              <h5 className="font-semibold mb-1">Successful Deliveries</h5>
              <p className="text-gray-600 text-sm">
                Orders delivered with <br />
                care and precision
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-sm rounded-lg text-center w-full h-full py-8">
              <h3 className="text-[#D9468f] text-4xl font-bold mb-2">500K+</h3>
              <h5 className="font-semibold mb-1">Happy Customers</h5>
              <p className="text-gray-600 text-sm">
                Satisfied users enjoying <br />
                delicious food
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-sm rounded-lg text-center w-full h-full py-8">
              <h3 className="text-[#c2410c] text-4xl font-bold mb-2">5K+</h3>
              <h5 className="font-semibold mb-1">Partner Restaurants</h5>
              <p className="text-gray-600 text-sm">
                Restaurants serving <br />
                amazing cuisine
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white shadow-sm rounded-lg text-center w-full h-full py-8">
              <h3 className="text-[#D9468f] text-4xl font-bold mb-2">1K+</h3>
              <h5 className="font-semibold mb-1">Active Delivery Partners</h5>
              <p className="text-gray-600 text-sm">
                Riders ensuring quick and <br />
                safe delivery
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials (kept nested inside this section, same as your original) */}
        <div className="bg-white">
          <div className="container mx-auto py-12 px-3">
            <h2 className="text-center text-3xl font-bold mb-3">
              What Our Customers Say
            </h2>
            <p className="text-center text-lg mb-10 text-gray-600">
              Real feedback from real food lovers
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {/* Testimonial 1 */}
              <div className="shadow-sm rounded-2xl p-4 w-full h-full">
                <p className="text-yellow-400 text-2xl mb-2">★★★★★</p>
                <h5 className="font-semibold mb-2">Amazing Service!</h5>
                <p className="text-gray-600 text-sm">
                  "The food arrived hot and fresh. The delivery was incredibly
                  fast. Highly impressed with Cravings' service!"
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#c2410c] text-white font-bold flex items-center justify-center shadow">
                    AJ
                  </div>
                  <div>
                    <p className="font-bold mb-0">Arun J.</p>
                    <small className="text-gray-400">Verified Buyer</small>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="shadow-sm rounded-2xl p-4 w-full h-full">
                <p className="text-yellow-400 text-2xl mb-2">★★★★★</p>
                <h5 className="font-semibold mb-2">Best App Ever!</h5>
                <p className="text-gray-600 text-sm">
                  "Easy to use interface, wide variety of restaurants, and quick
                  delivery. I order from Cravings every week!"
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#D9468f] text-white font-bold flex items-center justify-center shadow">
                    SP
                  </div>
                  <div>
                    <p className="font-bold mb-0">Sneha P.</p>
                    <small className="text-gray-400">Verified Buyer</small>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="shadow-sm rounded-2xl p-4 w-full h-full">
                <p className="text-yellow-400 text-2xl mb-2">★★★★★</p>
                <h5 className="font-semibold mb-2">Excellent Choices</h5>
                <p className="text-gray-600 text-sm">
                  "Love the variety of restaurants available. Found my new
                  favorite spot through Cravings. Definitely worth it!"
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <div className="w-11 h-11 rounded-full bg-[#c2410c] text-white font-bold flex items-center justify-center shadow">
                    RK
                  </div>
                  <div>
                    <p className="font-bold mb-0">Raj Kumar</p>
                    <small className="text-gray-400">Verified Buyer</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Restaurant Partner */}
      <section className="bg-[#c2410c] py-16 px-4">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Become a Restaurant Partner
          </h2>
          <p className="text-lg w-full md:w-2/3 lg:w-2/2 mt-3 py-2">
            Grow your business with Cravings. Join thousands of restaurants
            already delivering with us.
          </p>
          {/* CHANGED: font-semibold add kiya, padding badhaya (px-8 py-3), 
        rounded-lg kiya — production screenshot se match karne ke liye */}
          <button className="bg-[#f4f4f5] text-[#c2410c] font-semibold mt-6 px-8 py-3 rounded-lg hover:opacity-90 transition">
            Partner With Us
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
