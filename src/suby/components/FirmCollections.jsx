import React, { useEffect, useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaMapPin, FaTags } from 'react-icons/fa';
import { API_URI } from '../Api';
import { Link } from 'react-router-dom';

const FirmCollections = () => {
    const [firmData, setFirmData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch firm data from API
    useEffect(() => {
        const fetchFirmData = async () => {
            try {
                const response = await fetch(`${API_URI}/vendor/all-vendors`);
                if (!response.ok) throw new Error('Failed to fetch data');
                const newFirmData = await response.json();

                console.log('Fetched Data:', newFirmData.vendors);
                setFirmData(newFirmData.vendors || []);
                setFilteredData(newFirmData.vendors || []);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };
        fetchFirmData();
    }, []);

    // Handle Category Change
    const handleFilterChange = (category) => {
        setSelectedCategory(category);

        if (category === 'All') {
            setFilteredData(firmData);
        } else {
            const filtered = firmData.filter((apple) =>
                apple.firm.some((item) => {
                    const regionArray = Array.isArray(item.region) ? item.region.map((r) => r.toLowerCase()) : [];
                    return regionArray.includes(category.toLowerCase());
                })
            );

            console.log('Filtered Data:', filtered);
            setFilteredData(filtered);
        }
    };

    return (
        <section className="p-8 w-4/5 mx-auto">
            <h2 className="text-sm sm:text-xl font-bold mb-8 text-gray-800 text-start">
                Restaurants with Online Food Delivery in Hyderabad
            </h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
                {['All', 'South-Indian', 'North-Indian', 'Chinese', 'Bakery'].map((category) => (
                    <button
                        key={category}
                        onClick={() => handleFilterChange(category)}
                        className={`px-3 sm:px-5 py-2 rounded-lg transition-all text-sm sm:text-base ${selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Firm Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredData.length === 0 ? (
                    <p className="text-gray-500">No vendors available.</p>
                ) : (
                    filteredData.map((apple) =>
                        apple.firm.map((item) => (
                            <Link key={item._id} to={`/products/${item._id}/${item.firmName}`}>
                                <div className="bg-white rounded-2xl overflow-hidden transition-transform transform hover:scale-105">
                                    {/* Image Section */}
                                    <div className="relative">
                                        <img
                                            src={`${API_URI}/uploads/${item.image}`}
                                            alt={item.firmName || 'Firm Image'}
                                            className="w-60 h-40 object-cover rounded-2xl"
                                            onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                        />
                                        {item.offer && (
                                            <span className="absolute bottom-2 left-5 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center uppercase">
                                                <FaTags className="mr-2" /> {item.offer}
                                            </span>
                                        )}
                                    </div>

                                    {/* Text Section */}
                                    <div className="p-4 space-y-2">
                                        <h3 className="text-md sm:text-md font-semibold flex items-center text-gray-900">
                                            <FaBuilding className="mr-3 text-blue-500" />
                                            {item.firmName}
                                        </h3>
                                        <p className="text-sm flex items-center text-gray-700">
                                            <FaMapPin className="mr-2 text-red-500" />
                                            {Array.isArray(item.region) ? item.region.join(', ') : item.region}
                                        </p>
                                        <p className="text-sm flex items-center text-gray-700">
                                            <FaMapMarkerAlt className="mr-2 text-green-500" />
                                            {item.area}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )
                )}
            </div>
        </section>
    );
};

export default FirmCollections;
