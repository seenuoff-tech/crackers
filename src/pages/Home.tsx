import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, ArrowRight, Star, ShieldCheck, Zap, Gift, ThumbsUp, ShoppingCart, Sparkles, Shield, Tag, Heart, ChevronLeft, ChevronRight, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, Product } from '../context/CartContext';
import { useSlider } from '../context/SliderContext';

const shopCategories = [
  { id: 1, name: 'Sparklers', image: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e2b?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Flower Pots', image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Sky Shots', image: 'https://images.unsplash.com/photo-1533230898524-6565f3d53342?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Chakras', image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Crackers', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Bombs', image: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'Rockets', image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Garlands', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'Aerial Display Pipes', image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=400&q=80' },
  { id: 10, name: 'Twinkling Stars', image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=400&q=80' },
  { id: 11, name: 'Colour Matches', image: 'https://images.unsplash.com/photo-1544924222-35298d69037e?auto=format&fit=crop&w=400&q=80' },
  { id: 12, name: 'Diwali New Arrival', image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=400&q=80' },
  { id: 13, name: 'Combo Offers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80' },
  { id: 14, name: 'Fancy Mountains', image: 'https://images.unsplash.com/photo-1498936178812-21172b485d3e?auto=format&fit=crop&w=400&q=80' },
  { id: 15, name: 'Elite Fancy Series', image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?auto=format&fit=crop&w=400&q=80' },
  { id: 16, name: 'Continue Crackers', image: 'https://images.unsplash.com/photo-1590076215667-873d6f009088?auto=format&fit=crop&w=400&q=80' },
];

const featuredProducts: Product[] = [
  { 
    id: 1, 
    productNumber: '004',
    name: 'CHAKKARS', 
    price: 150, 
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80', 
    category: 'Chakras',
    description: 'Traditional ground spinning fireworks that create a beautiful circle of sparks. Safe and fun for all ages.'
  },
  { 
    id: 2, 
    productNumber: '002',
    name: 'FLOWER POTS', 
    price: 250, 
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=400&q=80', 
    category: 'Flower Pots',
    description: 'Classic fountain-style fireworks that emit a steady stream of colorful sparks, resembling a glowing flower pot.'
  },
  { 
    id: 3, 
    productNumber: '018',
    name: 'DIWALI GIFT BOX', 
    price: 2500, 
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80', 
    category: 'Diwali New Arrival',
    description: 'A curated collection of our best-selling crackers, perfect for gifting or a complete family celebration.'
  },
  { 
    id: 4, 
    productNumber: '013',
    name: '1000 WALA GARLAND', 
    price: 1500, 
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&q=80', 
    category: 'Garlands',
    description: 'Traditional red string of crackers that produce a rhythmic series of sounds. Perfect for grand celebrations.'
  },
  { 
    id: 5, 
    productNumber: '008',
    name: 'ROCKETS', 
    price: 200, 
    image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=400&q=80', 
    category: 'Rockets',
    description: 'Spectacular rockets that soar high into the sky and burst into beautiful patterns of light and color.'
  },
  { 
    id: 6, 
    productNumber: '011',
    name: 'HYDRO BOMB', 
    price: 500, 
    image: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&w=400&q=80', 
    category: 'Bombs',
    description: 'Powerful sound crackers that produce a loud bang. Recommended for outdoor use by adults.'
  },
  { 
    id: 7, 
    productNumber: '020',
    name: 'DIGITAL SKY SHOTS', 
    price: 2800, 
    image: 'https://images.unsplash.com/photo-1533230898524-6565f3d53342?auto=format&fit=crop&w=400&q=80', 
    category: 'Sky Shots',
    description: 'Amazing multi-color sky shots that burst high in the air with multiple effects. A true visual treat.'
  },
  { 
    id: 8, 
    productNumber: '019',
    name: 'FAMILY COMBO', 
    price: 3500, 
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80', 
    category: 'Combo Offers',
    description: 'The best value pack containing a mix of sparklers, flower pots, chakras, and sky shots.'
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Naveen Jothi',
    location: 'Chennai',
    text: 'Got my package in just 2 days, great site and having lot of discount comparing to offline, Much recommended!!!!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    location: 'Mumbai',
    text: 'Amazing quality crackers! The sky shots were spectacular. Delivery was on time and packaging was very safe.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
  },
  {
    id: 3,
    name: 'Priya Patel',
    location: 'Ahmedabad',
    text: 'Best place to buy crackers online. The variety is huge and prices are very genuine. Highly satisfied with the service.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
  },
  {
    id: 4,
    name: 'Amit Kumar',
    location: 'Bangalore',
    text: 'Very easy to order. The website is user-friendly and the customer support is excellent. Will definitely buy again next year.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150'
  }
];


const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { slides: heroSlides } = useSlider();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (heroSlides.length > 0 && currentSlide >= heroSlides.length) {
      setCurrentSlide(0);
    }
  }, [heroSlides, currentSlide]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      clearInterval(slideTimer);
      clearInterval(testimonialTimer);
    };
  }, [heroSlides.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAddToCart = (product: Product) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    navigate('/checkout');
  };

  if (!heroSlides || heroSlides.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 ${heroSlides[currentSlide].bg} flex items-center`}
          >
            {/* Background Media (Image or Video) */}
            <div className="absolute inset-0 pointer-events-none">
              {heroSlides[currentSlide].type === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-40"
                >
                  <source src={heroSlides[currentSlide].url} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={heroSlides[currentSlide].url || null} 
                  alt={heroSlides[currentSlide].title} 
                  className="w-full h-full object-cover opacity-20"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              
              {/* Left Side: Circular Logo Area (Matching Image) */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden md:flex relative w-[450px] h-[450px] bg-white rounded-full border-[12px] border-red-500/30 items-center justify-center overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100" />
                <div className="relative z-10 text-center p-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-red-600 p-3 rounded-xl mb-4 shadow-lg">
                      <ShoppingCart className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-red-600 font-black text-6xl tracking-tighter italic uppercase leading-none">
                      Crackers
                    </div>
                    <div className="mt-6 flex gap-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-100" />
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements inside circle */}
                <div className="absolute top-10 left-10 w-4 h-4 bg-red-400 rounded-full blur-sm" />
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-red-400 rounded-full blur-sm" />
              </motion.div>

              {/* Right Side: Sale Content (Matching Image) */}
              <div className="flex-1 text-center md:text-left text-white">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <p className="text-2xl md:text-4xl font-serif italic text-yellow-400 mb-2">
                    {heroSlides[currentSlide].title}
                  </p>
                  <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-4 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    {heroSlides[currentSlide].highlight}
                  </h1>
                  <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
                    <div className="text-3xl md:text-5xl font-bold uppercase tracking-widest border-y-2 border-white/30 py-4 px-8">
                      {heroSlides[currentSlide].offer}
                    </div>
                    <Link
                      to="/shop"
                      className="bg-yellow-400 text-red-700 px-10 py-5 rounded-full text-xl font-black hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3"
                    >
                      QUICK ORDER <ArrowRight className="w-6 h-6" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Floating Crackers Illustration (Right Side) */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hidden lg:block relative w-64 h-64"
              >
                <div className="absolute top-0 right-0 w-32 h-48 bg-yellow-400 rounded-2xl rotate-12 shadow-2xl flex flex-col items-center justify-center p-4 border-4 border-white/20">
                  <div className="w-full h-full border-2 border-dashed border-red-600/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-48 bg-blue-600 rounded-2xl -rotate-12 shadow-2xl flex flex-col items-center justify-center p-4 border-4 border-white/20">
                  <div className="w-full h-full border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === i ? 'bg-yellow-400 w-10' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Festival Offer Section */}
      <section className="bg-red-600 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-bold text-xl mx-8 flex items-center gap-2 uppercase tracking-widest">
              <Gift className="w-6 h-6" /> Diwali Special Offer: Get 20% Off on All Orders Above ₹2000! <Gift className="w-6 h-6" />
            </span>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background Sparkle Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img 
            src="https://picsum.photos/seed/sparkle-bg/1920/1080?blur=10" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-red-800 mb-6">Why Choose Us</h2>
            <p className="text-gray-700 leading-relaxed max-w-5xl text-lg">
              We provide all top branded deepavali crackers & other occasional Fire crackers retails and wholesale. 
              We build your surprising occasion with lighting and sensational Gift box with our inspiring crackers. 
              We provide all top branded deepavali crackers & other occasional Fire crackers retails and wholesale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { 
                icon: <ThumbsUp className="w-8 h-8" />, 
                title: 'Attractive', 
                desc: 'Secure and innovative packaging of Crackers.' 
              },
              { 
                icon: <ShoppingCart className="w-8 h-8" />, 
                title: 'Manufacturing', 
                desc: 'It is made from the finest raw materials.' 
              },
              { 
                icon: <Sparkles className="w-8 h-8" />, 
                title: 'Colourful', 
                desc: 'Our Crackers produce more colour and less smoke.' 
              },
              { 
                icon: <Shield className="w-8 h-8" />, 
                title: 'Safety', 
                desc: '100% safe Crackers for childrens to use.' 
              },
              { 
                icon: <Tag className="w-8 h-8" />, 
                title: 'Genuine Price', 
                desc: 'we can supply crackers at genuine price.' 
              },
              { 
                icon: <Heart className="w-8 h-8" />, 
                title: 'Satisfication', 
                desc: 'We Guarantee you that your full hearted pure satisfaction.' 
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center text-red-500 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Signature from image */}
          <div className="mt-16 flex justify-end">
            <div className="text-right">
              <div className="inline-block p-2 bg-blue-900 rounded-lg mb-2">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-red-600 font-bold text-xl">Crackers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Product Section - Redesigned for professional ecommerce look */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Shop by Category</h2>
              <p className="text-gray-600 text-lg">Explore our wide range of premium Diwali fireworks, from traditional sparklers to spectacular aerial displays.</p>
            </div>
            <Link to="/shop" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {shopCategories.map((category) => (
              <Link 
                key={category.id}
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative flex flex-col items-center"
              >
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-gray-900 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border-4 border-white">
                  {/* Dark Night Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
                  
                  <img
                    src={category.image || null}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                  
                  {/* Centered Icon/Focus (Visual only, since we use Picsum) */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                      <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                    {category.name}
                  </h3>
                  <div className="w-8 h-1 bg-red-600 mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Product Image */}
              <div className="md:w-1/2 bg-gray-50 p-12 flex items-center justify-center">
                <img 
                  src={selectedProduct.image || null} 
                  alt={selectedProduct.name} 
                  className="max-w-full max-h-[400px] object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div className="md:w-1/2 p-10 sm:p-12 flex flex-col">
                <div className="mb-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                    {selectedProduct.productNumber ? `#${selectedProduct.productNumber} - ${selectedProduct.category}` : selectedProduct.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.price}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {selectedProduct.description || 'Premium quality fireworks for your special celebrations. Safe, vibrant, and long-lasting effects that will light up your night sky.'}
                </p>

                <div className="mt-auto space-y-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Quantity</span>
                    <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-white rounded-xl transition-all text-gray-600"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-white rounded-xl transition-all text-gray-600"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                    <button 
                      onClick={() => handleBuyNow(selectedProduct)}
                      className="flex items-center justify-center gap-3 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                    >
                      <ShoppingBag className="w-5 h-5" /> Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customer Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Customer Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Buying Diwali crackers online has never been easier. Crackers' wide selection and fast shipping from Sivakasi made our celebration truly special.
          </p>

          <div className="max-w-4xl mx-auto relative px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-10 shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="absolute left-10 top-10 opacity-10">
                    <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.8 0C7.52 0 0 7.52 0 16.8V45H24V16.8H9.6C9.6 12.8 12.8 9.6 16.8 9.6V0ZM52.8 0C43.52 0 36 7.52 36 16.8V45H60V16.8H45.6C45.6 12.8 48.8 9.6 52.8 9.6V0Z" />
                    </svg>
                  </div>
                  
                  <p className="text-xl text-gray-700 font-medium mb-10 relative z-10">
                    {testimonials[currentTestimonial].text}
                  </p>

                  <div className="flex flex-col items-center">
                    <img 
                      src={testimonials[currentTestimonial].image || null} 
                      alt={testimonials[currentTestimonial].name} 
                      className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-red-100"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-gray-500 font-medium">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-gray-400 hover:text-red-600 transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-gray-400 hover:text-red-600 transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentTestimonial === i ? 'bg-red-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to make some noise?</h2>
          <p className="text-gray-400 text-lg mb-10">Don't wait until the last minute. Order your favorite crackers today and get them delivered safely to your home.</p>
          <Link
            to="/shop"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-all shadow-2xl"
          >
            Order Now
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
