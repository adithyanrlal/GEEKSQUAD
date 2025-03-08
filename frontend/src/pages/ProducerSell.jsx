import React, { useState } from 'react';

const ProducerSell = () => {
    const [creditAmount, setCreditAmount] = useState('');

    // Default prices
    const currentCreditPrice = 0.1; // Price per credit in dollars
    const governmentElectricityPrice = 0.15; // Government price per unit of electricity in dollars

    // Calculate profit
    const profit = (governmentElectricityPrice - currentCreditPrice) * creditAmount;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full h-[400px]">
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sell Your Credits</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">Amount of Credits to Sell</label>
                        <input
                            type="number"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter credits amount"
                            min="1"
                            required
                        />
                    </div>

                    <div className="text-gray-700 mt-4">
                        <p>Current Credit Price: <span className="font-bold ">${currentCreditPrice.toFixed(2)}</span> per unit</p>
                        <p className='h-[50px]'>Government Electricity Price: <span className="font-bold">${governmentElectricityPrice.toFixed(2)}</span> per unit</p>
                        <p className="text-green-700 font-semibold mt-2 h-[65px] text-lg">Potential Profit: ${profit.toFixed(2)}</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 ]">
                        Sell Credits
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProducerSell;