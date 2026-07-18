import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const CustomSelect = ({ options, value, onChange, placeholder, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => typeof opt === 'string' ? opt === value : opt.value === value);
  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label) 
    : placeholder;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none transition-all duration-300 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 group hover:border-amber-500/50 ${isOpen ? 'border-amber-500 ring-4 ring-amber-500/10' : ''}`}
      >
        <span className={`block truncate ${!value ? 'text-zinc-400' : 'text-zinc-900 font-medium'}`}>
          {displayLabel}
        </span>
        <Icon 
          icon="solar:alt-arrow-down-linear" 
          className={`text-zinc-400 transition-all duration-300 group-hover:text-amber-500 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-zinc-100 rounded-xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] py-2 max-h-60 overflow-y-auto"
          >
            {options.map((opt, index) => {
              const optValue = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const isSelected = value === optValue;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange({ target: { value: optValue } });
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-amber-50/50 text-amber-700 font-medium' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && (
                    <Icon icon="solar:check-read-linear" className="text-amber-500 text-lg" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
