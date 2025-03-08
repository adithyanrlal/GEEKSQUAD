import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const credits = [
    { id: 1, producer: 'Green Solar Ltd.', price: 0.10, available: 100 },
    { id: 2, producer: 'Eco Energy Inc.', price: 0.12, available: 75 },
    { id: 3, producer: 'Sunrise Panels', price: 0.09, available: 150 },
    { id: 4, producer: 'BrightFuture Solar', price: 0.11, available: 90 },
    { id: 5, producer: 'Sunshine Solar', price: 0.08, available: 200 },
    { id: 6, producer: 'Solar Power Inc.', price: 0.13, available: 50 },
];

const Consumer_Home = () => {
    const [walletBalance, setWalletBalance] = useState(500);
    const [availableCredits, setAvailableCredits] = useState(300);
    const [expandedCard, setExpandedCard] = useState(null);
    const [walletOpen, setWalletOpen] = useState(false);

    const walletRef = useRef();

    const handleCardClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (walletRef.current && !walletRef.current.contains(event.target)) {
                setWalletOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200">
            {/* Navigation */}
            <nav className="bg-white shadow-md mb-8">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Consumer Portal</h1>
                    <ul className="flex space-x-8">
                        <li><a href="#" className="text-black hover:text-blue-500">Home</a></li>
                        <li><a href="#" className="text-black hover:text-blue-500">User Account</a></li>
                        <li>
                            <button 
                                onClick={() => setWalletOpen(!walletOpen)}
                                className="text-black hover:text-blue-500 relative font-bold"
                            >
                                Wallet
                            </button>
                            {walletOpen && (
                                <div
                                    ref={walletRef}
                                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50"
                                >
                                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Wallet Balance</h2>
                                    <p className="text-lg text-gray-500 mb-4">
                                        <span className="font-semibold text-green-600">${walletBalance.toFixed(2)}</span>
                                    </p>

                                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Available Credits</h2>
                                    <p className="text-lg text-gray-500">
                                        <span className="font-semibold text-blue-600">{availableCredits}</span> SECs
                                    </p>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Available Solar Credits */}
            <h1 className="text-5xl font-extrabold text-center text-green-700 mb-12 drop-shadow-md">
                Available Solar Credits
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {credits.map((credit) => (
                    <div
                        key={credit.id}
                        onClick={() => handleCardClick(credit.id)}
                        className={clsx(
                            "bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer",
                            {
                                "scale-105 shadow-2xl": expandedCard === credit.id,
                            }
                        )}
                    >
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">
                            {credit.producer}
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-bold text-green-600">${credit.price.toFixed(2)}</span> per SEC
                        </p>
                        <p className="text-gray-500 mb-6">{credit.available} SECs available</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md 
                            hover:bg-green-600 transition-all duration-200 focus:outline-none 
                            focus:ring-2 focus:ring-green-300 transform hover:-translate-y-1">
                            Buy Now
                        </button>

                        {expandedCard === credit.id && (
                            <div className="mt-4 bg-green-50 p-4 rounded-lg shadow-inner">
                                <h3 className="text-lg font-bold text-green-700 mb-2">More Information:</h3>
                                <p className="text-gray-600">Producer: {credit.producer}</p>
                                <p className="text-gray-600">Price per SEC: ${credit.price.toFixed(2)}</p>
                                <p className="text-gray-600">Available: {credit.available} SECs</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Consumer_Home;