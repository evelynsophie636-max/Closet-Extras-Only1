import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, Phone, Mail, MapPin, Instagram, Facebook, Star, ArrowRight, ShieldCheck, Truck, RefreshCw, Send, Check } from 'lucide-react';
import { initialProducts, calculateDiscountPercent } from './data/products';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ceo_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ceo_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('ceo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ceo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, selectedSize = null, selectedColor = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === (selectedSize || product.sizes?.[0]) && 
        item.selectedColor === (selectedColor || product.colors?.[0])
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, {
        ...product,
        quantity: 1,
        selectedSize: selectedSize || product.sizes?.[0] || 'Default',
        selectedColor: selectedColor || product.colors?.[0] || 'Default'
      }];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty > 0) {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-chocolate bg-ivory">
        {/* Announcement Bar */}
        <div className="bg-chocolate text-beige text-xs uppercase tracking-widest py-2 px-4 text-center font-medium">
          "Your Extras, Your Style, Your Confidence." — Free Delivery on Select Local Orders
        </div>

        {/* Navigation Header */}
        <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-beige/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden p-2 text-chocolate hover:text-taupe"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Brand Logo */}
              <Link to="/" className="text-center md:text-left">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider block text-chocolate">
                  CLOSET EXTRAS ONLY
                </span>
                <span className="text-[10px] uppercase tracking-widest text-taupe block -mt-1 font-sans">
                  Fashion • Beauty • Lifestyle
                </span>
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider font-medium">
                <Link to="/" className="hover:text-champagne transition-colors">Home</Link>
                <Link to="/shop" className="hover:text-champagne transition-colors">Shop All</Link>
                <Link to="/shop?category=fashion" className="hover:text-champagne transition-colors">Fashion</Link>
                <Link to="/shop?category=skincare" className="hover:text-champagne transition-colors">Skincare</Link>
                <Link to="/shop?category=beauty" className="hover:text-champagne transition-colors">Beauty</Link>
                <Link to="/about" className="hover:text-champagne transition-colors">About</Link>
                <Link to="/contact" className="hover:text-champagne transition-colors">Contact</Link>
              </nav>

              {/* Action Icons */}
              <div className="flex items-center space-x-5">
                <Link to="/wishlist" className="relative p-1 text-chocolate hover:text-champagne transition-colors">
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blush text-chocolate text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative p-1 text-chocolate hover:text-champagne transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-champagne text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMenuOpen && (
            <div className="md:hidden bg-ivory border-b border-beige px-6 py-4 space-y-3 font-medium text-sm tracking-wider uppercase">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2">Shop All</Link>
              <Link to="/shop?category=fashion" onClick={() => setIsMenuOpen(false)} className="block py-2">Fashion</Link>
              <Link to="/shop?category=skincare" onClick={() => setIsMenuOpen(false)} className="block py-2">Skincare</Link>
              <Link to="/shop?category=beauty" onClick={() => setIsMenuOpen(false)} className="block py-2">Beauty</Link>
              <Link to="/shop?category=wristwatches" onClick={() => setIsMenuOpen(false)} className="block py-2">Wristwatches</Link>
              <Link to="/shop?category=jewellery" onClick={() => setIsMenuOpen(false)} className="block py-2">Jewellery</Link>
              <Link to="/shop?category=bags" onClick={() => setIsMenuOpen(false)} className="block py-2">Bags & Purses</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2">About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2">Contact Us</Link>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/shop" element={<ShopView addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetailView addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/cart" element={<CartView cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<CheckoutView cart={cart} setCart={setCart} />} />
            <Route path="/wishlist" element={<WishlistView wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/faq" element={<FAQView />} />
          </Routes>
        </main>

        {/* Floating WhatsApp Widget */}
        <FloatingWhatsApp />

        {/* Footer */}
        <footer className="bg-chocolate text-ivory pt-16 pb-8 border-t border-taupe/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-serif text-xl font-bold tracking-wider mb-2">CLOSET EXTRAS ONLY</h3>
              <p className="text-xs text-taupe tracking-widest uppercase mb-4">"Your Extras, Your Style, Your Confidence."</p>
              <p className="text-sm text-beige/80 leading-relaxed">
                Modern feminine fashion, skincare, and lifestyle boutique based in Benin City, Nigeria. Expressing your elegance without spending a fortune.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-base font-semibold mb-4 text-beige">Quick Links</h4>
              <ul className="space-y-2 text-sm text-beige/80">
                <li><Link to="/shop" className="hover:text-champagne transition-colors">Shop All Catalogue</Link></li>
                <li><Link to="/shop?filter=offers" className="hover:text-champagne transition-colors">Special Offers</Link></li>
                <li><Link to="/about" className="hover:text-champagne transition-colors">Our Brand Story</Link></li>
                <li><Link to="/contact" className="hover:text-champagne transition-colors">Customer Support</Link></li>
                <li><Link to="/faq" className="hover:text-champagne transition-colors">FAQs & Enquiries</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-semibold mb-4 text-beige">Contact Us</h4>
              <ul className="space-y-3 text-sm text-beige/80">
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-champagne shrink-0" />
                  <span>Ugbowo, Benin City, Edo State, Nigeria</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-champagne shrink-0" />
                  <a href="tel:09161314677" className="hover:text-champagne">0916 131 4677</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-champagne shrink-0" />
                  <a href="mailto:nwachukwuchinazaekpere5@gmail.com" className="hover:text-champagne overflow-hidden text-ellipsis">nwachukwuchinazaekpere5@gmail.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-base font-semibold mb-4 text-beige">Join Our WhatsApp Community</h4>
              <p className="text-sm text-beige/80 mb-4">
                Get instant notifications on new arrivals, flash sales, and restocks directly on WhatsApp.
              </p>
              <a
                href="https://chat.whatsapp.com/Foeb1GvWGiz3Lof6ZmHse6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-champagne text-chocolate hover:bg-beige text-xs font-bold uppercase tracking-wider py-3 px-5 transition-colors"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-taupe/20 text-center text-xs text-taupe">
            © {new Date().getFullYear()} CLOSET EXTRAS ONLY. All Rights Reserved. Built for Luxury & Elegance.
          </div>
        </footer>
      </div>
    </Router>
  );
}

/* ==========================================================================
   HOMEPAGE VIEW
   ========================================================================== */
function HomeView({ addToCart, wishlist, toggleWishlist }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blush/30 py-24 md:py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-taupe">New Season Arrivals</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-chocolate leading-tight">
              YOUR STYLE.<br />YOUR BEAUTY.<br /><span className="text-champagne italic">YOUR EXTRAS.</span>
            </h1>
            <p className="text-base text-chocolate/80 max-w-lg leading-relaxed">
              Discover beautiful fashion, skincare essentials, and everyday accessories, thoughtfully selected to make every moment feel special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link to="/shop" className="bg-chocolate text-ivory hover:bg-champagne hover:text-chocolate font-medium uppercase tracking-wider text-xs px-8 py-4 transition-all text-center">
                Shop Collection
              </Link>
              <Link to="/shop?filter=offers" className="border border-chocolate text-chocolate hover:bg-chocolate hover:text-ivory font-medium uppercase tracking-wider text-xs px-8 py-4 transition-all text-center">
                Explore Offers
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000" 
              alt="Closet Extras Only Luxury Fashion" 
              className="w-full h-[500px] object-cover shadow-2xl border border-beige"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-chocolate mb-2">Featured Collection</h2>
          <p className="text-sm text-taupe uppercase tracking-widest">Handpicked Everyday Luxuries</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialProducts.slice(0, 4).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              isWishlisted={wishlist.some(w => w.id === product.id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* WhatsApp Community Banner */}
      <section className="bg-beige/40 py-16 px-4 sm:px-6 lg:px-8 border-y border-beige">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-serif font-bold text-chocolate">BE PART OF OUR PRETTY COMMUNITY</h2>
          <p className="text-sm text-chocolate/80 max-w-xl mx-auto leading-relaxed">
            Join our exclusive WhatsApp community to stay connected and discover instant updates, new releases, VIP restocks, and special promos.
          </p>
          <div className="pt-2">
            <a 
              href="https://chat.whatsapp.com/Foeb1GvWGiz3Lof6ZmHse6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-chocolate text-ivory hover:bg-champagne hover:text-chocolate px-8 py-4 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Join WhatsApp Community</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================================
   PRODUCT CARD COMPONENT
   ========================================================================== */
function ProductCard({ product, addToCart, isWishlisted, toggleWishlist }) {
  const discountPercent = calculateDiscountPercent(product.originalPrice, product.price);

  return (
    <div className="group relative bg-white border border-beige/60 p-4 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
      <div className="relative overflow-hidden mb-4 aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-chocolate text-beige text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            {discountPercent}% OFF
          </span>
        )}
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-chocolate transition-colors"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-taupe block font-semibold">{product.category}</span>
        <Link to={`/product/${product.id}`} className="font-serif text-base font-semibold text-chocolate hover:text-champagne transition-colors line-clamp-1 block">
          {product.name}
        </Link>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-chocolate">₦{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-taupe line-through">₦{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-beige/40 flex gap-2">
        <button 
          onClick={() => addToCart(product)}
          className="flex-1 bg-chocolate text-ivory hover:bg-champagne hover:text-chocolate py-2.5 text-xs uppercase font-bold tracking-wider transition-colors"
        >
          Add to Cart
        </button>
        <Link 
          to={`/product/${product.id}`}
          className="border border-beige hover:border-chocolate p-2.5 text-chocolate flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ==========================================================================
   SHOP VIEW
   ========================================================================== */
function ShopView({ addToCart, wishlist, toggleWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = initialProducts.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-chocolate mb-2">Boutique Catalogue</h1>
        <p className="text-xs uppercase tracking-widest text-taupe">Explore Fashion, Skincare & Lifestyle Accessories</p>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-beige gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {['all', 'fashion', 'skincare', 'beauty', 'wristwatches', 'jewellery', 'bags'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat 
                  ? 'bg-chocolate text-ivory font-bold' 
                  : 'bg-white border border-beige text-chocolate hover:border-chocolate'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-beige px-4 py-2 text-xs uppercase tracking-wider focus:outline-none"
        >
          <option value="default">Sort by: Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
            isWishlisted={wishlist.some(w => w.id === product.id)}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   PRODUCT DETAIL VIEW
   ========================================================================== */
function ProductDetailView({ addToCart, wishlist, toggleWishlist }) {
  const { id } = useLocation().pathname.split('/product/')[1] ? { id: useLocation().pathname.split('/product/')[1] } : { id: 1 };
  const product = initialProducts.find(p => p.id === parseInt(id)) || initialProducts[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const discountPercent = calculateDiscountPercent(product.originalPrice, product.price);

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Closet Extras Only! I am interested in inquiring about this product:\n\n*Product:* ${product.name}\n*Price:* ₦${product.price.toLocaleString()}\n*Category:* ${product.category}\n\nPlease confirm availability!`
    );
    window.open(`https://wa.me/2349161314677?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-beige p-2 bg-white">
          <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover" />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-taupe">{product.category}</span>
          <h1 className="text-3xl font-serif font-bold text-chocolate">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-chocolate">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-base text-taupe line-through">₦{product.originalPrice.toLocaleString()}</span>
            )}
            {discountPercent > 0 && (
              <span className="bg-chocolate text-beige text-xs font-bold px-2.5 py-1 uppercase tracking-wider">
                Save {discountPercent}%
              </span>
            )}
          </div>

          <p className="text-sm text-chocolate/80 leading-relaxed border-t border-b border-beige py-4">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs border ${
                      selectedColor === color ? 'border-chocolate bg-chocolate text-white' : 'border-beige text-chocolate'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-1.5 text-xs border ${
                      selectedSize === size ? 'border-chocolate bg-chocolate text-white' : 'border-beige text-chocolate'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              className="flex-1 bg-chocolate text-ivory hover:bg-champagne hover:text-chocolate py-4 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWhatsAppEnquiry}
              className="flex-1 bg-[#25D366] text-white hover:bg-emerald-600 py-4 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
            >
              <span>Enquire on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   CART VIEW
   ========================================================================== */
function CartView({ cart, removeFromCart, updateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif font-bold text-chocolate mb-4">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-taupe mb-8">Discover our beautiful collection of fashion and beauty extras.</p>
        <Link to="/shop" className="bg-chocolate text-ivory px-8 py-4 text-xs font-bold uppercase tracking-wider">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-chocolate mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 border border-beige bg-white items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-chocolate text-base">{item.name}</h3>
                <p className="text-xs text-taupe">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                <p className="font-bold text-chocolate text-sm mt-1">₦{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center space-x-2 border border-beige px-2 py-1">
                <button onClick={() => updateQuantity(index, -1)} className="px-2 font-bold">-</button>
                <span className="text-xs px-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)} className="px-2 font-bold">+</button>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-xs text-red-500 underline pl-4">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border border-beige p-6 bg-white space-y-4 h-fit">
          <h2 className="font-serif text-xl font-bold border-b border-beige pb-4">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-bold">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-taupe">
            <span>Estimated Delivery</span>
            <span>Calculated at Checkout</span>
          </div>
          <div className="border-t border-beige pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-chocolate text-ivory hover:bg-champagne hover:text-chocolate text-center py-4 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   CHECKOUT VIEW WITH WHATSAPP ORDERING ENGINE
   ========================================================================== */
function CheckoutView({ cart, setCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Benin City',
    state: 'Edo State',
    notes: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrderWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    let itemsList = cart.map((item, i) => (
      `${i + 1}. *${item.name}*\n   • Qty: ${item.quantity}\n   • Size: ${item.selectedSize}\n   • Color: ${item.selectedColor}\n   • Price: ₦${(item.price * item.quantity).toLocaleString()}`
    )).join('\n\n');

    const whatsappMsg = `🛍️ *NEW ORDER — CLOSET EXTRAS ONLY*\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `✉️ Email: ${formData.email || 'N/A'}\n` +
      `📍 Delivery Address: ${formData.address}, ${formData.city}, ${formData.state}\n` +
      `📝 Notes: ${formData.notes || 'None'}\n\n` +
      `*ORDER SUMMARY:*\n${itemsList}\n\n` +
      `💰 *TOTAL AMOUNT: ₦${subtotal.toLocaleString()}*\n\n` +
      `Please confirm my order and send payment/delivery instructions!`;

    const encodedMsg = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/2349161314677?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-chocolate mb-8 text-center">Checkout & WhatsApp Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handlePlaceOrderWhatsApp} className="space-y-4 border border-beige p-6 bg-white">
          <h2 className="font-serif text-xl font-bold mb-4">Delivery Information</h2>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Full Name *</label>
            <input 
              type="text" 
              required 
              className="w-full border border-beige p-3 text-sm focus:outline-none"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold mb-1">Phone Number *</label>
              <input 
                type="tel" 
                required 
                className="w-full border border-beige p-3 text-sm focus:outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold mb-1">Email Address</label>
              <input 
                type="email" 
                className="w-full border border-beige p-3 text-sm focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Delivery Address *</label>
            <textarea 
              required 
              rows={3} 
              className="w-full border border-beige p-3 text-sm focus:outline-none"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold mb-1">City</label>
              <input 
                type="text" 
                value={formData.city} 
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full border border-beige p-3 text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold mb-1">State</label>
              <input 
                type="text" 
                value={formData.state} 
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full border border-beige p-3 text-sm" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#25D366] text-white hover:bg-emerald-600 py-4 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 mt-6"
          >
            <span>PLACE ORDER ON WHATSAPP</span>
          </button>
        </form>

        {/* Order Summary */}
        <div className="border border-beige p-6 bg-white space-y-4">
          <h2 className="font-serif text-xl font-bold mb-4">Your Items ({cart.length})</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b border-beige pb-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-taupe">Qty: {item.quantity} | {item.selectedSize}</p>
              </div>
              <span className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="pt-4 flex justify-between font-bold text-xl">
            <span>Total Payable:</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   WISHLIST VIEW
   ========================================================================== */
function WishlistView({ wishlist, toggleWishlist, addToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-chocolate mb-8 text-center">Your Saved Extras</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-taupe text-sm">No saved items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              isWishlisted={true}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   ABOUT US VIEW
   ========================================================================== */
function AboutView() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-taupe font-bold">More Than Just The Extras</span>
        <h1 className="text-4xl font-serif font-bold text-chocolate">About Closet Extras Only</h1>
        <p className="text-sm uppercase tracking-widest text-champagne font-bold">"Your Extras, Your Style, Your Confidence."</p>
      </div>

      <div className="prose max-w-none text-chocolate/80 space-y-6 text-base leading-relaxed text-center md:text-left">
        <p>
          Closet Extras Only is a modern feminine fashion, beauty and lifestyle boutique dedicated to helping women express their beauty, confidence and personal style through carefully selected, stylish and affordable everyday essentials.
        </p>
        <p>
          Located in Ugbowo, Benin City, Edo State, our brand offers a beautiful selection of elegant clothing, skincare essentials, beauty products, fashionable wristwatches, jewellery, handbags and lifestyle accessories.
        </p>
        <p>
          Our mission is to make shopping for beautiful and stylish essentials convenient, enjoyable and affordable. We firmly believe that looking elegant and feeling confident should not require spending a fortune.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   CONTACT US VIEW WITH WHATSAPP FORM INTEGRATION
   ========================================================================== */
function ContactView() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });

  const handleContactWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `💬 *CUSTOMER SUPPORT ENQUIRY*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Subject:* ${form.subject}\n\n` +
      `*Message:* ${form.message}`
    );
    window.open(`https://wa.me/2349161314677?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-serif font-bold text-chocolate">Contact Closet Extras Only</h1>
          <p className="text-sm text-chocolate/80">We would love to hear from you. Reach out for order enquiries, product availability, or styling tips.</p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-champagne shrink-0 mt-1" />
              <div>
                <p className="font-bold text-xs uppercase">Location</p>
                <p className="text-sm text-chocolate/80">Ugbowo, Benin City, Edo State, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-champagne shrink-0 mt-1" />
              <div>
                <p className="font-bold text-xs uppercase">Telephone</p>
                <a href="tel:09161314677" className="text-sm text-chocolate/80 hover:underline">0916 131 4677</a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-champagne shrink-0 mt-1" />
              <div>
                <p className="font-bold text-xs uppercase">Email</p>
                <a href="mailto:nwachukwuchinazaekpere5@gmail.com" className="text-sm text-chocolate/80 hover:underline">nwachukwuchinazaekpere5@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleContactWhatsApp} className="border border-beige p-6 bg-white space-y-4">
          <h2 className="font-serif text-xl font-bold">Send Message on WhatsApp</h2>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Your Name *</label>
            <input required type="text" className="w-full border border-beige p-3 text-sm focus:outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Phone Number *</label>
            <input required type="tel" className="w-full border border-beige p-3 text-sm focus:outline-none" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Subject</label>
            <input type="text" className="w-full border border-beige p-3 text-sm focus:outline-none" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">Message *</label>
            <textarea required rows={4} className="w-full border border-beige p-3 text-sm focus:outline-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
          </div>
          <button type="submit" className="w-full bg-[#25D366] text-white hover:bg-emerald-600 py-4 font-bold text-xs uppercase tracking-wider transition-colors">
            SEND MESSAGE ON WHATSAPP
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   FAQ VIEW
   ========================================================================== */
function FAQView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-3xl font-serif font-bold text-chocolate text-center mb-8">Frequently Asked Questions</h1>
      <div className="border border-beige p-4 bg-white">
        <h3 className="font-serif font-bold text-lg">Where is Closet Extras Only located?</h3>
        <p className="text-sm text-chocolate/80 mt-1">We are based in Ugbowo, Benin City, Edo State, Nigeria.</p>
      </div>
      <div className="border border-beige p-4 bg-white">
        <h3 className="font-serif font-bold text-lg">How do I place an order?</h3>
        <p className="text-sm text-chocolate/80 mt-1">Add items to your cart, click checkout, and press "PLACE ORDER ON WHATSAPP". Our team will receive your items and confirm your order!</p>
      </div>
    </div>
  );
}
