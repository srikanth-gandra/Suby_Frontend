import React, { useEffect, useState } from 'react';
import { API_URI } from '../Api';
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';

const ProductsMenu = () => {
    const { firmId, firmName } = useParams();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URI}/product/${firmId}/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const { products: newProductData } = await response.json();
            setProducts(newProductData || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [firmId]);

    return (
        <>
            <Topbar />
            <section className="max-w-7xl mx-auto p-6">
                {/* Firm Name Display */}
                <div className="text-center mb-12 mt-20">
                    <h1 className="text-4xl sm:text-4xl font-bold text-orange-600">{firmName}</h1>
                    <p className="text-gray-600 mt-2">Explore our delicious offerings below:</p>
                </div>

                {products.length === 0 ? (
                    <p className="text-gray-600 text-center">No products available</p>
                ) : (
                    <div className="flex flex-col gap-8">
                        {products.map((item, index) => (
                            <div key={item.id || index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                    {/* Left Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h1 className="text-xl md:text-2xl font-bold mb-2">{item.productName}</h1>
                                        <p className="text-gray-600 mb-3">{item.description || 'Delicious food available'}</p>
                                        <div className="flex items-center justify-center md:justify-start gap-4">
                                            <span className="text-lg md:text-xl font-semibold text-orange-500">₹{item.price}</span>
                                            <button
                                                aria-label={`Add ${item.productName} to cart`}
                                                className="bg-orange-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-orange-600 transition text-sm md:text-lg"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Image */}
                                    <img
                                        src={`${API_URI}/uploads/${item.image}`}
                                        alt={item.firmName || 'Product Image'}
                                        className="w-24 h-20 md:w-32 md:h-24 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default ProductsMenu;