import React from 'react';

const Heading = ({ children }) => {
  return (
    <div className="text-center mb-10">
      <h1 className="font-poppins text-5xl font-bold text-white tracking-wide" style={{ textShadow: '0 14px 15px rgba(0, 0, 0, 0.82)' }}>
        {children}
      </h1>
      <div className="mt-4 w-32 h-1.5 bg-primary mx-auto rounded-full"></div>
    </div>
  );
};

export default Heading;