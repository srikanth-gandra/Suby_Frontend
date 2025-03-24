import React, { useState, useRef } from 'react';
import { itemData } from '../data';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ItemsDisplay = () => {
  const [displayItem] = useState(itemData);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      direction === 'left'
        ? scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        : scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="itemsDisplay p-4  w-4/5 mx-auto mt-25 relative">
      <h4 className="text-sm sm:text-xl font-bold mb-4 text-start sm:text-center">Items</h4>

      {/* Arrow Buttons on Image Top */}
      <div className="absolute top-1/8 right-6 flex space-x-2 transform -translate-y-1/2 z-10">
        <button
          onClick={() => scroll('left')}
          className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowLeft className='text-xl text-gray-600'/>
        </button>
        <button
          onClick={() => scroll('right')}
          className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
        >
          <FaArrowRight className='text-xl text-gray-600'/>
        </button>
      </div>

      {/* Image Carousel */}
      <div ref={scrollRef} className="flex space-x-4 overflow-hidden">
        {displayItem.map((item, index) => (
          <img
            key={index}
            src={item.item_img}
            alt={`Item ${index + 1}`}
            className="w-40 h-40 object-cover rounded-lg transition-transform hover:scale-105 hover:shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsDisplay;
