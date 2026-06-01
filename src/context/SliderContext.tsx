import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeStorage } from '../services/storageService';

export interface Slide {
  id: number;
  title: string;
  highlight: string;
  offer: string;
  bg: string;
  url: string;
  type: 'image' | 'video';
}

interface SliderContextType {
  slides: Slide[];
  addSlide: (slide: Omit<Slide, 'id'>) => void;
  updateSlide: (id: number, slide: Partial<Slide>) => void;
  deleteSlide: (id: number) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Celebrate Diwali",
    highlight: "SALE",
    offer: "UP TO 70% OFF",
    bg: "bg-[#B91C1C]",
    url: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1200",
    type: 'image'
  },
  {
    id: 2,
    title: "Light Up Your Night",
    highlight: "MEGA",
    offer: "BEST QUALITY CRACKERS",
    bg: "bg-[#991B1B]",
    url: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=1200",
    type: 'image'
  },
  {
    id: 3,
    title: "Festival of Lights",
    highlight: "OFFER",
    offer: "FREE HOME DELIVERY",
    bg: "bg-[#7F1D1D]",
    url: "https://images.unsplash.com/photo-1533230898524-6565f3d53342?q=80&w=1200",
    type: 'image'
  }
];

export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slides, setSlides] = useState<Slide[]>(() => {
    const saved = safeStorage.getItem('home_slides');
    if (!saved) return defaultSlides;
    
    // Auto-migrate old picsum.photos URLs to stunning new Unsplash images
    const savedSlides: Slide[] = JSON.parse(saved).map((s: Slide) => {
      if (s.url && s.url.includes('picsum.photos')) {
        const def = defaultSlides.find(ds => ds.id === s.id);
        if (def) {
          return { ...s, url: def.url };
        }
      }
      return s;
    });
    return savedSlides;
  });

  useEffect(() => {
    safeStorage.setItem('home_slides', JSON.stringify(slides));
  }, [slides]);

  const addSlide = (slide: Omit<Slide, 'id'>) => {
    const newSlide = { ...slide, id: Date.now() };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (id: number, updatedFields: Partial<Slide>) => {
    setSlides(slides.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteSlide = (id: number) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  return (
    <SliderContext.Provider value={{ slides, addSlide, updateSlide, deleteSlide }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (context === undefined) {
    throw new Error('useSlider must be used within a SliderProvider');
  }
  return context;
};
