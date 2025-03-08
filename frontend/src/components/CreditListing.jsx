// src/components/CreditsList.js

import React from 'react';

const credits = [
    { id: 1, producer: 'Green Solar Ltd.', price: 0.10, available: 100 },
    { id: 2, producer: 'Eco Energy Inc.', price: 0.12, available: 75 },
    { id: 3, producer: 'Sunrise Panels', price: 0.09, available: 150 },
    { id: 4, producer: 'BrightFuture Solar', price: 0.11, available: 90 },
];

const CreditsList = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Available Solar Credits</h1>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-4 text-left">Producer</th>
                            <th className="p-4 text-left">Price per SEC ($)</th>
                            <th className="p-4 text-left">Available Credits</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {credits.map((credit) => (
                            <tr key={credit.id} className="border-b hover:bg-green-50">
                                <td className="p-4">{credit.producer}</td>
                                <td className="p-4">${credit.price.toFixed(2)}</td>
                                <td className="p-4">{credit.available} SECs</td>
                                <td className="p-4">
                                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        Buy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreditsList;
