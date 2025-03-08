import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreditsPage() {
    const [credits, setCredits] = useState([]);
    const [consumerId, setConsumerId] = useState('67cc443689565fff224f3517'); // Replace with actual consumer ID

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/credits');
                console.log(res.data);
                setCredits(res.data);
            } catch (err) {
                console.error('Error fetching credits:', err);
            }
        };
        fetchCredits();
    }, []);

    const handleBuy = async (producerId, amount) => {
        try {
            const res = await axios.post('http://localhost:3000/api/credits/buy', {
                consumerId,
                producerId,
                amount,
            });

            if (res.status === 200) {
                alert(`Purchase successful! You bought ${amount} SECs.`);
                // Refresh the credits list to show updated amounts
                setCredits((prevCredits) =>
                    prevCredits.map((credit) =>
                        credit.id === producerId
                            ? { ...credit, available: credit.available - amount }
                            : credit
                    )
                );
            } else {
                alert(res.data.message || 'Purchase failed.');
            }
        } catch (err) {
            console.error('Error processing purchase:', err);
        }
    };

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
                                <td className="p-4">{credit.producerId}</td>
                                <td className="p-4">${credit.pricePerSEC.toFixed(2)}</td>
                                <td className="p-4">{credit.creditsAvailable} SECs</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleBuy(credit._id, 10)} // Buy 10 SECs by default
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
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
}