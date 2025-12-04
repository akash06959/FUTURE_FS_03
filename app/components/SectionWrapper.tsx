import React from 'react';

interface Props {
  bgImage: string;
  children: React.ReactNode;
  opacity?: string;
  id?: string; // <--- Allows this component to have a name
}

export function SectionWrapper({ bgImage, children, opacity = "90", id }: Props) {
  const opacityValue = Number(opacity) / 100;

  return (
    <section 
      id={id} // <--- Attaches the name to the HTML tag
      className="relative min-h-[90vh] flex items-center justify-center bg-fixed bg-center bg-cover border-b border-gray-100"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      {/* White Overlay */}
      <div 
        className="absolute inset-0 bg-white"
        style={{ opacity: opacityValue }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        {children}
      </div>
    </section>
  );
}