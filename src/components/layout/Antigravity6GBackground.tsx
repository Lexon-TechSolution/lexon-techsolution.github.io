import React from 'react';

export const Antigravity6GBackground: React.FC = () => {
  return (
    <div 
      id="clean-stable-bg"
      className="fixed inset-0 -z-50 w-full h-full bg-[#f8fafc] pointer-events-none select-none"
    >
      {/* Subtle clean professional grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e3a8a 1px, transparent 1px),
            linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Soft warm corporate light radial gradients */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-gradient-to-b from-[#1e3a8a]/5 to-transparent rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-gradient-to-t from-gray-100 to-transparent rounded-full filter blur-[100px]" />
    </div>
  );
};
