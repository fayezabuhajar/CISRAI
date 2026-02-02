import { motion } from 'motion/react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface DomeTrackCardProps {
  trackNumber: number;
  title: string;
  description: string;
  onClick: () => void;
  isRtl: boolean;
  readMoreText: string;
}

export function DomeTrackCard({ trackNumber, title, description, onClick, isRtl, readMoreText }: DomeTrackCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative flex flex-col h-full bg-[#F5F0E6] rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Gold Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-[#D4AF37]/30 z-20" />
      
      {/* Decorative Hexagonal Background */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-[#E6D8AD]/40 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full opacity-15 text-[#D4AF37]" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M0,200 L0,100 C0,44.77 89.54,0 200,0 C310.46,0 400,44.77 400,100 L400,200 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Track Number Badge */}
        <div className="w-12 h-12 bg-[#D4AF37] text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {trackNumber}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#333333] mb-4 leading-snug min-h-[56px] line-clamp-2">
          {title}
        </h3>

        {/* Short Excerpt */}
        <p className="text-[#555555] leading-relaxed text-sm mb-8 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Gold Button with Rounded Corners */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full py-3 bg-[#D4AF37] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#C5A059] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <span>{readMoreText}</span>
          <ChevronRight size={16} className={`${isRtl ? 'rotate-180' : ''} transition-transform group-hover:translate-x-1 ${isRtl ? 'group-hover:-translate-x-1' : ''}`} />
        </button>
      </div>
      
      {/* Subtle Hexagonal Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-300">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`hex-pattern-${trackNumber}`} x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#hex-pattern-${trackNumber})`} />
        </svg>
      </div>
    </motion.div>
  );
}