import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './CartContext';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addProducts: (products: Omit<Product, 'id'>[]) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateCategoryDiscount: (category: string, discount: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  { id: 1, productNumber: '001', name: 'Fancy Sparklers (10pcs)', price: 150, discount: 10, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600', category: 'Sparklers', description: 'Bright and long-lasting sparklers perfect for kids and families. Emits beautiful golden sparks.' },
  { id: 2, productNumber: '002', name: 'Colorful Flower Pots', price: 250, discount: 15, image: 'https://images.unsplash.com/photo-1498936178812-21172b485d3e?q=80&w=600', category: 'Flower Pots', description: 'Classic flower pots that emit a fountain of multi-colored sparks. High-quality and safe.' },
  { id: 3, productNumber: '003', name: 'Sky Shots (12 Shots)', price: 850, discount: 20, image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=600', category: 'Sky Shots', description: 'Spectacular aerial display with 12 consecutive shots of vibrant colors and patterns.' },
  { id: 4, productNumber: '004', name: 'Ground Chakras (Big)', price: 120, discount: 5, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600', category: 'Chakras', description: 'Fast-spinning ground wheels that create a mesmerizing circle of light and sound.' },
  { id: 5, productNumber: '005', name: 'Bijili Crackers (100pcs)', price: 80, discount: 0, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600', category: 'Crackers', description: 'Small but loud crackers that come in a pack of 100. A traditional favorite for all ages.' },
  { id: 6, productNumber: '006', name: 'Laxmi Bomb (Big)', price: 300, discount: 10, image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=600', category: 'Bombs', description: 'Powerful sound cracker with a classic design. Known for its deep and resonant blast.' },
  { id: 7, productNumber: '007', name: 'Peacock Fountain', price: 450, discount: 25, image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600', category: 'Flower Pots', description: 'A premium flower pot that mimics the beautiful spread of a peacock tail in sparks.' },
  { id: 8, productNumber: '008', name: 'Rocket (10pcs)', price: 200, discount: 10, image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?q=80&w=600', category: 'Rockets', description: 'High-flying rockets that soar into the sky before bursting into a shower of light.' },
  { id: 9, productNumber: '009', name: 'Magic Pencil', price: 100, discount: 0, image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=600', category: 'Sparklers', description: 'Handheld sparklers that can be used to "write" in the air with glowing trails.' },
  { id: 10, productNumber: '010', name: 'Double Sound Crackers', price: 180, discount: 5, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600', category: 'Crackers', description: 'Unique crackers that produce two distinct loud sounds in quick succession.' },
  { id: 11, productNumber: '011', name: 'Hydro Bomb', price: 500, discount: 30, image: 'https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=600', category: 'Bombs', description: 'One of the loudest bombs in our collection. Designed for maximum impact and sound.' },
  { id: 12, productNumber: '012', name: 'Multi Color Sky Shot', price: 1200, discount: 40, image: 'https://images.unsplash.com/photo-1533230898524-6565f3d53342?q=80&w=600', category: 'Sky Shots', description: 'A premium multi-shot aerial display featuring a variety of colors and crackling effects.' },
  { id: 13, productNumber: '013', name: '1000 Wala Garland', price: 1500, discount: 20, image: 'https://images.unsplash.com/photo-1590076215667-873d6f009088?q=80&w=600', category: 'Garlands', description: 'A long string of 1000 crackers that provides a continuous and grand sound display.' },
  { id: 14, productNumber: '014', name: '5000 Wala Garland', price: 4500, discount: 25, image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600', category: 'Garlands', description: 'The ultimate celebration garland with 5000 crackers for an unforgettable sound experience.' },
  { id: 15, productNumber: '015', name: 'Aerial Display Pipe (Big)', price: 950, discount: 15, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600', category: 'Aerial Display Pipes', description: 'Single pipe aerial display that shoots high and bursts into a massive palm tree effect.' },
  { id: 16, productNumber: '016', name: 'Twinkling Stars (10pcs)', price: 120, discount: 0, image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600', category: 'Twinkling Stars', description: 'Small handheld sticks that emit bright, twinkling white sparks like stars.' },
  { id: 17, productNumber: '017', name: 'Color Match Box (10pcs)', price: 60, discount: 0, image: 'https://images.unsplash.com/photo-1544924222-35298d69037e?q=80&w=600', category: 'Colour Matches', description: 'Special matchsticks that burn with different colored flames. Fun for evening celebrations.' },
  { id: 18, productNumber: '018', name: 'Diwali Special Gift Box', price: 2500, discount: 35, image: 'https://images.unsplash.com/photo-1513201099445-7253d4d09b62?q=80&w=600', category: 'Diwali New Arrival', description: 'A curated collection of our best-selling crackers, perfect for gifting or a complete family celebration.' },
  { id: 19, productNumber: '019', name: 'Family Combo Pack', price: 3500, discount: 40, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600', category: 'Combo Offers', description: 'The best value pack containing a mix of sparklers, flower pots, chakras, and sky shots.' },
  { id: 20, productNumber: '020', name: 'Digital Sky Shot (30 Shots)', price: 2800, discount: 20, image: 'https://images.unsplash.com/photo-1533230898524-6565f3d53342?q=80&w=600', category: 'Sky Shots', description: 'High-tech aerial display with 30 shots synchronized for a professional-grade firework show.' },
  { id: 21, productNumber: '021', name: 'Butterfly Chakra', price: 180, discount: 10, image: 'https://images.unsplash.com/photo-1577942171120-e2b260e0a5ea?q=80&w=600', category: 'Chakras', description: 'A unique ground chakra that changes colors and patterns as it spins, resembling a butterfly.' },
  { id: 22, productNumber: '022', name: 'Golden Fountain', price: 400, discount: 15, image: 'https://images.unsplash.com/photo-1498936178812-21172b485d3e?q=80&w=600', category: 'Flower Pots', description: 'A large flower pot that produces a tall, majestic fountain of pure golden sparks.' },
  { id: 23, productNumber: '023', name: 'Whistling Rocket', price: 250, discount: 5, image: 'https://images.unsplash.com/photo-1547623641-824a7687baf0?q=80&w=600', category: 'Rockets', description: 'Rockets that make a loud whistling sound as they ascend before bursting in the sky.' },
  { id: 24, productNumber: '024', name: 'Red & Green Sparklers', price: 160, discount: 10, image: 'https://images.unsplash.com/photo-1490750968218-8b9ed5605ad3?q=80&w=600', category: 'Sparklers', description: 'Double-colored sparklers that emit both red and green sparks simultaneously.' },
  { id: 25, productNumber: '025', name: 'Fancy Mountain (Small)', price: 350, discount: 15, image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600', category: 'Fancy Mountains', description: 'A beautiful mountain-shaped fountain that emits a steady flow of silver sparks.' },
  { id: 26, productNumber: '026', name: 'Elite Fancy Shot (12 Shots)', price: 1800, discount: 20, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600', category: 'Elite Fancy Series', description: 'Premium quality aerial shots with elite effects and vibrant color combinations.' },
  { id: 27, productNumber: '027', name: '28 Chorsa Continue', price: 450, discount: 10, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600', category: 'Continue Crackers', description: 'A continuous string of 28 chorsa crackers for a rhythmic and loud celebration.' },
  { id: 28, productNumber: '028', name: '56 Chorsa Continue', price: 850, discount: 15, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600', category: 'Continue Crackers', description: 'Double the fun with a 56 chorsa continuous cracker string.' },
  { id: 29, productNumber: '029', name: 'Electric Sparklers', price: 180, discount: 10, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600', category: 'Sparklers', description: 'High-intensity electric sparklers that create a brilliant white light effect.' },
  { id: 30, productNumber: '030', name: 'Rose Flower Pot', price: 350, discount: 10, image: 'https://images.unsplash.com/photo-1498936178812-21172b485d3e?q=80&w=600', category: 'Flower Pots', description: 'A beautiful fountain that emits red and pink sparks, resembling a blooming rose.' },
  { id: 31, productNumber: '031', name: 'Comet Sky Shot', price: 1500, discount: 20, image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=600', category: 'Sky Shots', description: 'A single, powerful shot that leaves a long trailing tail like a comet before bursting.' },
  { id: 32, productNumber: '032', name: 'Whistling Chakra', price: 220, discount: 5, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600', category: 'Chakras', description: 'A ground wheel that makes a sharp whistling sound while spinning at high speeds.' },
  { id: 33, productNumber: '033', name: 'Jumbo Ground Chakra', price: 280, discount: 10, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600', category: 'Chakras', description: 'Large-sized ground wheel for a longer-lasting and more powerful spinning display.' },
  { id: 34, productNumber: '034', name: 'Red Bijili (50pcs)', price: 45, discount: 0, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600', category: 'Crackers', description: 'Classic red bijili crackers, perfect for small celebrations and kids.' },
  { id: 35, productNumber: '035', name: 'Green Bijili (50pcs)', price: 45, discount: 0, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600', category: 'Crackers', description: 'Eco-friendly green bijili crackers with a crisp sound.' },
  { id: 36, productNumber: '036', name: 'Classic Atom Bomb', price: 400, discount: 10, image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=600', category: 'Bombs', description: 'The traditional atom bomb with a powerful blast and bright flash.' },
  { id: 37, productNumber: '037', name: 'King Kong Bomb', price: 650, discount: 15, image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=600', category: 'Bombs', description: 'Extra-large bomb for those who want the loudest celebration possible.' },
  { id: 38, productNumber: '038', name: 'Parachute Rocket', price: 350, discount: 10, image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?q=80&w=600', category: 'Rockets', description: 'A rocket that releases a small parachute with a glowing light after reaching its peak.' },
  { id: 39, productNumber: '039', name: 'Moon Rocket', price: 450, discount: 15, image: 'https://images.unsplash.com/photo-1547623641-824a7687baf0?q=80&w=600', category: 'Rockets', description: 'High-altitude rocket with a silver trailing effect and a loud burst.' },
  { id: 40, productNumber: '040', name: '28 Wala Garland', price: 150, discount: 5, image: 'https://images.unsplash.com/photo-1590076215667-873d6f009088?q=80&w=600', category: 'Garlands', description: 'A short string of 28 crackers for a quick and energetic burst of sound.' },
  { id: 41, productNumber: '041', name: '56 Wala Garland', price: 280, discount: 10, image: 'https://images.unsplash.com/photo-1590076215667-873d6f009088?q=80&w=600', category: 'Garlands', description: 'A medium-length garland of 56 crackers, perfect for small gatherings.' },
  { id: 42, productNumber: '042', name: 'Silver Display Pipe', price: 1100, discount: 15, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600', category: 'Aerial Display Pipes', description: 'Professional-grade display pipe that shoots a massive silver willow effect.' },
  { id: 43, productNumber: '043', name: 'Golden Display Pipe', price: 1100, discount: 15, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600', category: 'Aerial Display Pipes', description: 'Large display pipe with a majestic golden brocade burst.' },
  { id: 44, productNumber: '044', name: 'Crackling Display Pipe', price: 1250, discount: 20, image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600', category: 'Aerial Display Pipes', description: 'Aerial pipe that bursts into a huge cloud of crackling stars.' },
  { id: 45, productNumber: '045', name: 'Neon Twinkling Stars', price: 150, discount: 0, image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600', category: 'Twinkling Stars', description: 'Special sticks that emit vibrant neon-colored twinkling sparks.' },
  { id: 46, productNumber: '046', name: 'Giant Twinkling Stars', price: 250, discount: 10, image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600', category: 'Twinkling Stars', description: 'Extra-long sticks for a longer-lasting twinkling star effect.' },
  { id: 47, productNumber: '047', name: 'Magic Twinkling Stars', price: 180, discount: 5, image: 'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?q=80&w=600', category: 'Twinkling Stars', description: 'Handheld sticks that change colors while twinkling.' },
  { id: 48, productNumber: '048', name: 'Bengal Matches (Red)', price: 80, discount: 0, image: 'https://images.unsplash.com/photo-1544924222-35298d69037e?q=80&w=600', category: 'Colour Matches', description: 'Large matches that burn with a steady and bright red flame.' },
  { id: 49, productNumber: '049', name: 'Bengal Matches (Green)', price: 80, discount: 0, image: 'https://images.unsplash.com/photo-1544924222-35298d69037e?q=80&w=600', category: 'Colour Matches', description: 'Large matches that burn with a steady and bright green flame.' },
  { id: 50, productNumber: '050', name: 'Tri-Color Matches', price: 120, discount: 10, image: 'https://images.unsplash.com/photo-1544924222-35298d69037e?q=80&w=600', category: 'Colour Matches', description: 'Unique matches that burn through three different colors in sequence.' },
  { id: 51, productNumber: '051', name: 'Peacock Sky Shot', price: 2200, discount: 25, image: 'https://images.unsplash.com/photo-1513201099445-7253d4d09b62?q=80&w=600', category: 'Diwali New Arrival', description: 'New arrival! A sky shot that bursts into the shape of a peacock tail.' },
  { id: 52, productNumber: '052', name: 'Dragon Breath Fountain', price: 850, discount: 15, image: 'https://images.unsplash.com/photo-1498936178812-21172b485d3e?q=80&w=600', category: 'Diwali New Arrival', description: 'A powerful fountain that shoots multi-colored sparks with a roaring sound.' },
  { id: 53, productNumber: '053', name: 'Golden Rain Rocket', price: 600, discount: 10, image: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?q=80&w=600', category: 'Diwali New Arrival', description: 'A premium rocket that fills the sky with a rain of golden sparks.' },
  { id: 54, productNumber: '054', name: 'Budget Friendly Pack', price: 1200, discount: 20, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600', category: 'Combo Offers', description: 'A great value pack containing all the essentials for a small celebration.' },
  { id: 55, productNumber: '055', name: 'Kids Special Combo', price: 1800, discount: 25, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600', category: 'Combo Offers', description: 'A safe and fun combo pack specifically curated for children.' },
  { id: 56, productNumber: '056', name: 'Grand Celebration Pack', price: 7500, discount: 45, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600', category: 'Combo Offers', description: 'Our largest combo pack, including everything you need for a massive celebration.' },
  { id: 57, productNumber: '057', name: 'Fancy Mountain (Large)', price: 750, discount: 20, image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600', category: 'Fancy Mountains', description: 'A large mountain-shaped fountain with a spectacular multi-stage display.' },
  { id: 58, productNumber: '058', name: 'Volcano Mountain', price: 950, discount: 25, image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600', category: 'Fancy Mountains', description: 'A powerful fountain that mimics a volcanic eruption with red and orange sparks.' },
  { id: 59, productNumber: '059', name: 'Snowy Peak Mountain', price: 650, discount: 15, image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600', category: 'Fancy Mountains', description: 'A fountain that produces a beautiful white and silver sparkling effect.' },
  { id: 60, productNumber: '060', name: 'Elite Fancy Shot (25 Shots)', price: 3500, discount: 30, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600', category: 'Elite Fancy Series', description: 'Premium 25-shot aerial display with professional-grade effects.' },
  { id: 61, productNumber: '061', name: 'Elite Fancy Shot (50 Shots)', price: 6500, discount: 40, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600', category: 'Elite Fancy Series', description: 'Our most spectacular aerial display with 50 consecutive high-impact shots.' },
  { id: 62, productNumber: '062', name: 'Elite Fancy Shot (100 Shots)', price: 12000, discount: 50, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600', category: 'Elite Fancy Series', description: 'The ultimate fireworks show in a single box. 100 shots of pure magic.' },
  { id: 63, productNumber: '063', name: '100 Chorsa Continue', price: 1500, discount: 20, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600', category: 'Continue Crackers', description: 'A massive 100 chorsa continuous cracker string for a long-lasting sound display.' },
  { id: 64, productNumber: '064', name: '200 Chorsa Continue', price: 2800, discount: 25, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=600', category: 'Continue Crackers', description: 'Our longest continuous cracker string with 200 chorsa for the ultimate noise.' },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('adminProducts');
    if (!saved) return initialProducts;
    
    // Auto-migrate old picsum.photos URLs to stunning new Unsplash images
    const savedProducts: Product[] = JSON.parse(saved).map((p: Product) => {
      if (p.image && p.image.includes('picsum.photos')) {
        const initial = initialProducts.find(ip => ip.productNumber === p.productNumber);
        if (initial) {
          return { ...p, image: initial.image };
        }
      }
      return p;
    });
    
    // Merge logic: Add initial products that don't exist in saved products (by productNumber)
    const mergedProducts = [...savedProducts];
    
    // Find the current max ID to avoid collisions
    let maxId = Math.max(0, ...savedProducts.map(p => p.id));
    
    initialProducts.forEach(initial => {
      const exists = savedProducts.some(p => p.productNumber === initial.productNumber);
      if (!exists) {
        // If the ID already exists in savedProducts, assign a new one
        const idExists = savedProducts.some(p => p.id === initial.id);
        if (idExists) {
          maxId++;
          mergedProducts.push({ ...initial, id: maxId });
        } else {
          mergedProducts.push(initial);
          maxId = Math.max(maxId, initial.id);
        }
      }
    });
    
    // Final check for unique IDs in mergedProducts
    const uniqueMergedProducts: Product[] = [];
    const seenIds = new Set<number>();
    mergedProducts.forEach(p => {
      if (!seenIds.has(p.id)) {
        uniqueMergedProducts.push(p);
        seenIds.add(p.id);
      } else {
        // If ID is duplicate, assign a new one
        maxId++;
        uniqueMergedProducts.push({ ...p, id: maxId });
        seenIds.add(maxId);
      }
    });
    
    return uniqueMergedProducts;
  });

  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const maxId = Math.max(0, ...products.map(p => p.id));
    const newProduct = { ...product, id: Math.max(Date.now(), maxId + 1) };
    setProducts([...products, newProduct]);
  };

  const addProducts = (newProducts: Omit<Product, 'id'>[]) => {
    const maxId = Math.max(0, ...products.map(p => p.id));
    const baseId = Math.max(Date.now(), maxId + 1);
    const productsWithIds = newProducts.map((p, index) => ({
      ...p,
      id: baseId + index
    }));
    setProducts([...products, ...productsWithIds]);
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateCategoryDiscount = (category: string, discount: number) => {
    setProducts(products.map(p => p.category === category ? { ...p, discount } : p));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, addProducts, updateProduct, deleteProduct, updateCategoryDiscount }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
