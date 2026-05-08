import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ImageIcon, Loader2 } from 'lucide-react';
import { fetchDriveImages, getDirectDriveUrl, DriveFile } from '../services/driveService';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface DynamicGalleryProps {
  tag: string | string[];
  className?: string;
}

export default function DynamicGallery({ tag, className }: DynamicGalleryProps) {
  const [images, setImages] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      const allFiles = await fetchDriveImages();
      
      // Filtering logic:
      // If tag is 'general', we take anything that doesn't match other known tags
      const tags = Array.isArray(tag) ? tag : [tag];
      const knownTags = ['financial-center', 'inventory', 'depreciation', 'bank-accounting', 'bank-reconciliation', 'bad-debts', 'financial-analysis', 'hospital-accounting'];
      
      const filtered = allFiles.filter(file => {
        const fileName = file.name.toLowerCase();
        if (tags.includes('general')) {
          return !knownTags.some(kt => fileName.includes(kt));
        }
        return tags.some(t => fileName.includes(t.toLowerCase()));
      });

      setImages(filtered);
      setLoading(false);
    }
    loadImages();
  }, [tag]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-gray-500 text-sm">{isRtl ? 'جاري تحميل الصور...' : 'Loading illustrations...'}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return null; // Don't show anything if no matching images
  }

  return (
    <div className={cn("space-y-8", className)}>
      {tag === 'general' && (
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {isRtl ? 'صور تعليمية' : 'Educational Resources'}
          </h3>
        </div>
      )}

      <div className={cn(
        "grid gap-6",
        images.length === 1 ? "grid-cols-1 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {images.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setZoomedImage(getDirectDriveUrl(img.id))}
          >
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-50">
              <img
                src={getDirectDriveUrl(img.id)}
                alt={img.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-4 px-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">
                {img.name.split('.')[0].replace(/-/g, ' ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
