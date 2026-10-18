

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BRAND_PAGES_DATA } from '@/data/content'; // Path check kar lena

interface BrandsGridProps {
  onNavigate: (slug: string) => void;
}

export function BrandsGrid({ onNavigate }: BrandsGridProps) {
  const brandKeys = Object.keys(BRAND_PAGES_DATA);

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandKeys.map((key, index) => {
            const brand = BRAND_PAGES_DATA[key];
            return (
              <div
                key={brand.id}
                onClick={() => onNavigate(brand.slug)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Logo wala block yahan se hata diya gaya hai */}
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-blue-700">
                    {brand.name} Repair &amp; Service
                  </span>
                  <ChevronRight className="w-5 h-5 text-blue-700 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
