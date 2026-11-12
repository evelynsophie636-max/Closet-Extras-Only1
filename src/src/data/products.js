export const initialProducts = [
  // 5 Quoted Real Fashion Products
  {
    id: 1,
    name: "Contrast Collar Sleeveless Skater Dress",
    category: "fashion",
    price: 8000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
    description: "A chic sleeveless skater dress with a sharp contrast collar for an effortless day-to-night look.",
    colors: ["Black/White", "Navy/White"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: 2,
    name: "Elegant Side-Ruched Maxi Dress",
    category: "fashion",
    price: 12000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    description: "Flattering silhouette featuring detailed side-ruching, made with soft breathable fabric.",
    colors: ["Emerald Green", "Burgundy", "Black"],
    sizes: ["S", "M", "L"],
    inStock: true
  },
  {
    id: 3,
    name: "Halter Neck Ruched Mermaid Maxi Gown",
    category: "fashion",
    price: 14000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    description: "Turn heads in this stunning halter neck gown designed to sculpt and accentuate your curves.",
    colors: ["Gold", "Champagne", "Wine"],
    sizes: ["M", "L"],
    inStock: true
  },
  {
    id: 4,
    name: "Polka Dot Tiered Ruffle Mini Dress",
    category: "fashion",
    price: 15000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
    description: "Playful feminine mini dress with playful polka dots and tiered ruffle skirt detailing.",
    colors: ["Black Dot", "Red Dot"],
    sizes: ["XS", "S", "M"],
    inStock: true
  },
  {
    id: 5,
    name: "Long Sleeve Graphic Print Bodycon Mini Dress",
    category: "fashion",
    price: 14000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&q=80&w=800",
    description: "Bold graphic prints combined with a comfortable bodycon fit, perfect for weekend outings.",
    colors: ["Multicolor"],
    sizes: ["S", "M", "L"],
    inStock: true
  },

  // Demonstration Catalogue Products showcasing Discount Engine
  {
    id: 6,
    name: "Hydrating Vitamin C Glow Serum",
    category: "skincare",
    price: 6500,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    description: "Brighten skin tone and boost collagen production with our lightweight Vitamin C formula.",
    colors: ["Standard"],
    sizes: ["30ml"],
    inStock: true
  },
  {
    id: 7,
    name: "Ultra-Gentle Foaming Cleanser",
    category: "skincare",
    price: 5000,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    description: "Deeply removes impurities without stripping your skin's essential moisture barrier.",
    colors: ["Standard"],
    sizes: ["150ml"],
    inStock: true
  },
  {
    id: 8,
    name: "High-Shine Plumping Lip Gloss",
    category: "beauty",
    price: 3500,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
    description: "Nourishing non-sticky gloss infused with jojoba oil for instant volume and sheen.",
    colors: ["Rose Gold", "Clear Quartz", "Blush Nude"],
    sizes: ["Standard"],
    inStock: true
  },
  {
    id: 9,
    name: "Minimalist Champagne Gold Watch",
    category: "wristwatches",
    price: 18500,
    originalPrice: 22000,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
    description: "Classic mesh strap timepiece engineered with Japanese quartz movement.",
    colors: ["Champagne Gold", "Rose Gold", "Silver"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: 10,
    name: "Structured Faux Leather Crossbody Bag",
    category: "bags",
    price: 16000,
    originalPrice: 20000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    description: "Compact luxury leatherette shoulder bag with adjustable chain strap and gold hardware.",
    colors: ["Nude Beige", "Classic Black", "Taupe"],
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: 11,
    name: "Layered Pearl & Gold Pendant Necklace",
    category: "jewellery",
    price: 4500,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Tarnish-resistant stainless steel layered necklace adorned with fresh water pearls.",
    colors: ["Gold"],
    sizes: ["Adjustable"],
    inStock: true
  }
];

export const calculateDiscountPercent = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};
