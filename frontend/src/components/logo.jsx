import React from 'react';
import logo from '../assets/logo.svg'; // Adjust the path as necessary

function Logo() {
  return (
    <div className='flex justify-center items-center'>
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Logo;