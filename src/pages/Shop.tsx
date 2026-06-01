import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, X, ArrowRight, ShieldCheck, Truck, ChevronLeft } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [location.search]);

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Get categories in order (using the predefined list if possible, or just keys)
  const displayCategories = Object.keys(groupedProducts).sort();

  const handleOrderNow = (product: Product) => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            {selectedCategory && (
              <button 
                onClick={() => navigate('/shop')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {selectedCategory ? selectedCategory : 'Quick Order'}
              </h1>
              <p className="text-gray-600">
                {selectedCategory 
                  ? `Explore our premium collection of ${selectedCategory}.` 
                  : 'Select your favorite crackers and order instantly.'}
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-16">
          {displayCategories.length > 0 ? (
            displayCategories.map((category) => (
              <section key={category} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">{category}</h2>
                  <div className="h-px flex-grow bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{groupedProducts[category].length} Items</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {groupedProducts[category].map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image || null}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Details
                          </span>
                        </div>
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          {product.productNumber ? `#${product.productNumber}` : product.category}
                        </div>
                        {product.discount && product.discount > 0 && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col">
                            {product.productNumber && (
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">#{product.productNumber}</span>
                            )}
                            <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                              {product.name}
                            </h3>
                          </div>
                          <div className="flex items-center text-yellow-500 text-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-1 font-bold">4.8</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-6 mt-auto">
                          <p className="text-red-600 font-bold text-xl">₹{product.price}</p>
                          {product.discount && product.discount > 0 && (
                            <p className="text-gray-400 line-through text-sm">
                              ₹{Math.round(product.price / (1 - product.discount / 100))}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="text-gray-400 mb-4 flex justify-center">
                <Search className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search to find what you're looking for.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 text-red-600 font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
              className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <img
                  src={selectedProduct.image || null}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  {selectedProduct.productNumber ? `#${selectedProduct.productNumber} - ${selectedProduct.category}` : selectedProduct.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <p className="text-3xl font-bold text-red-600">₹{selectedProduct.price}</p>
                      {selectedProduct.discount && selectedProduct.discount > 0 && (
                        <p className="text-xl text-gray-400 line-through">
                          ₹{Math.round(selectedProduct.price / (1 - selectedProduct.discount / 100))}
                        </p>
                      )}
                    </div>
                    {selectedProduct.discount && selectedProduct.discount > 0 && (
                      <p className="text-green-600 font-bold text-sm mt-1">You save {selectedProduct.discount}%!</p>
                    )}
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    In Stock
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedProduct.description || 'Experience the magic of celebrations with our premium quality crackers. Safe, vibrant, and designed to make your moments unforgettable.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-gray-900" />
                      </div>
                      Quality Tested
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Truck className="w-5 h-5 text-gray-900" />
                      </div>
                      Fast Delivery
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleOrderNow(selectedProduct)}
                    className="flex-grow bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                  >
                    Order Now <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-grow bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
