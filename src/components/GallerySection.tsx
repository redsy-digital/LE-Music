import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'shows' | 'bastidores' | 'estudio' | 'photoshoot';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g_1',
    url: '/src/assets/images/le_artist_portrait_1785091126579.jpg',
    title: 'Show Turnê Neon Horizons SP',
    category: 'shows'
  },
  {
    id: 'g_2',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    title: 'Cyber Stage Performance',
    category: 'shows'
  },
  {
    id: 'g_3',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    title: 'Gravação de Sintetizadores Analógicos',
    category: 'estudio'
  },
  {
    id: 'g_4',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    title: 'Bastidores CyberFest SP',
    category: 'bastidores'
  },
  {
    id: 'g_5',
    url: '/src/assets/images/le_album_cover_1785091126579.jpg',
    title: 'Ensaio Fotográfico Neon',
    category: 'photoshoot'
  },
  {
    id: 'g_6',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    title: 'Estúdio Futurista em São Paulo',
    category: 'estudio'
  }
];

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'shows' | 'bastidores' | 'estudio' | 'photoshoot'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <section id="galeria" className="py-24 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Galeria de Fotos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            REGISTROS <span className="text-[#00D4FF]">VISUAIS</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Todas as Fotos' },
            { id: 'shows', label: 'Shows & Palcos' },
            { id: 'estudio', label: 'Sessões de Estúdio' },
            { id: 'bastidores', label: 'Bastidores' },
            { id: 'photoshoot', label: 'Photoshoots' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'bg-[#0A1020] text-slate-300 border border-slate-800 hover:border-[#00D4FF]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Masonry Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setActivePhoto(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0A1020] border border-slate-800 hover:border-[#00D4FF] cursor-pointer shadow-xl"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold text-white truncate">
                    {item.title}
                  </span>
                  <div className="p-2 rounded-full bg-[#00D4FF] text-[#050505] shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#00D4FF]"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl border border-[#00D4FF]/40 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="text-center text-sm font-bold text-white mt-4 font-mono">
                {activePhoto.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
