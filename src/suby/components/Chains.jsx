import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URI } from '../Api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    // Fetch vendor data
    const fetchVendors = async () => {
        try {
            const response = await fetch(`${API_URI}/vendor/all-vendors`);
            const newData = await response.json();
            setVendorData(newData?.vendors || []);
        } catch (error) {
            alert('Failed to fetch data');
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    // Scroll handler
    const handleScroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
        }
    };

    // Navigate to product details page
    const handleNavigate = (firmId, firmName) => {
        navigate(`/products/${firmId}/${firmName}`);
    };

    return (
        <section className="p-8 w-4/5 max-w-7xl mx-auto relative">
            {/* Header and Navigation Buttons */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm sm:text-xl font-bold text-gray-800">Top Restaurants</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleScroll('left')}
                        className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
                    >
                        <FaArrowLeft className="text-xl text-gray-600" />
                    </button>
                    <button
                        onClick={() => handleScroll('right')}
                        className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition"
                    >
                        <FaArrowRight className="text-xl text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Scrollable Vendor List */}
            <div
                ref={scrollRef}
                className="flex space-x-8 overflow-x-scroll no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {vendorData.length > 0 ? (
                    vendorData.map((vendor, vendorIndex) =>
                        vendor.firm.map((item, itemIndex) => (
                            <div
                                key={`${vendorIndex}-${itemIndex}`}
                                className="min-w-[300px] rounded-lg overflow-hidden shadow-lg bg-white transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                                onClick={() => handleNavigate(item._id, item.firmName)}
                            >
                                <div className="relative">
                                    <img
                                        src={`${API_URI}/uploads/${item.image}`}
                                        alt={item.firmName}
                                        className="w-full h-45 object-cover"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <h3 className="text-md font-semibold text-white">{item.firmName}</h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <p className="text-gray-500">No restaurants available.</p>
                )}
            </div>
        </section>
    );
};

export default Chains;
