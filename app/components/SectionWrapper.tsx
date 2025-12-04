import React from 'react';

interface Props {
  bgImage: string;
  children: React.ReactNode;
  opacity?: string;
}

export function SectionWrapper({ bgImage, children, opacity = "90" }: Props) {
  // Convert the string "90" to the number 0.9
  const opacityValue = Number(opacity) / 100;

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center bg-fixed bg-center bg-cover border-b border-gray-100"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* 👇 FIXED: We use style={{ opacity }} instead of a class name */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: opacityValue }}
      ></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        {children}
      </div>
    </section>
  );
}