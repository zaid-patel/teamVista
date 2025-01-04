import React from 'react';

function Container({ children }) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-4 bg-gray-900 rounded-lg shadow-lg'>
      {children}
    </div>
  );
}

export default Container;