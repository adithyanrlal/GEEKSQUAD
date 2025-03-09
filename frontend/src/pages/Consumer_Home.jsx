import axios from 'axios';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';



const Consumer_Home = () => {
    const currentCreditPrice = 0.12
    const governmentElectricityPrice = "$0.10/kWh";

    const [creditsAvailable, setCreditsAvailable] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);

    const [newWalletAmount, setNewWalletAmount] = useState(0);

    const [credits, setCredits] = useState([]);
    const [consumerId, setConsumerId] = useState('67cc443689565fff224f3517'); // Replace with actual consumer ID

    // const [walletBalance, setWalletBalance] = useState(500);
    const [availableCredits, setAvailableCredits] = useState(300);
    const [expandedCard, setExpandedCard] = useState(null);
    const [walletOpen, setWalletOpen] = useState(false);

    const walletRef = useRef();

    const handleCardClick = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    const handleUpdateWallet = async (e) => {
        e.preventDefault();
        const consumerId = localStorage.getItem("consumerId");
        try {
            const response = await axios.patch(`http://localhost:3000/consumers/${consumerId}`, {
                walletBalance: newWalletAmount,
            });
            console.log("Wallet updated:", response.data);
            setNewWalletAmount(0);
            setWalletBalance(response.data.walletBalance);
            // Optionally, you can refetch the credits to update the UI
            alert("Wallet updated successfully");

        } catch (error) {
            console.error("Error updating wallet:", error);
        }
    };

    // Close dropdown when clicking outside
    // useEffect(() => {
    //     const handleOutsideClick = (event) => {
    //         if (walletRef.current && !walletRef.current.contains(event.target)) {
    //             setWalletOpen(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleOutsideClick);
    //     return () => {
    //         document.removeEventListener('mousedown', handleOutsideClick);
    //     };
    // }, []);

    useEffect(() => {
        const fetchCredits = async () => {
            const consumerId = localStorage.getItem('consumerId');
            try {


                const res = await axios.get('http://localhost:3000/api/credits');
                console.log(res.data);
                setCredits(res.data);

                const yourCreditsAvailable = await axios.get(`http://localhost:3000/consumers/${consumerId}`);
                console.log(yourCreditsAvailable.data);
                setCreditsAvailable(yourCreditsAvailable.data.creditsOwned);
                setWalletBalance(yourCreditsAvailable.data.walletBalance);
            } catch (err) {
                console.error('Error fetching credits:', err);
            }
        };
        fetchCredits();
    }, []);

    const handleBuy = async (producerId, price, amount) => {
        if (walletBalance < price * amount) {
            alert('Insufficient balance!');
            return;
        }

        // Optimistic UI update
        setWalletBalance((prev) => prev - price * amount);
        setCredits((prevCredits) =>
            prevCredits.map((credit) =>
                credit.producerId === producerId
                    ? { ...credit, available: credit.available - amount }
                    : credit
            )
        );

        try {
            // API call to process the transaction
            const response = await axios.post('http://localhost:3000/api/transactions/buy', {
                consumerId: user.id,
                producerId,
                price,
                amount,
            });

            // Update state with server response (in case of any corrections)
            setWalletBalance(response.data.consumer.walletBalance);
            setCredits((prevCredits) =>
                prevCredits.map((credit) =>
                    credit.producerId === producerId
                        ? { ...credit, available: response.data.producer.creditsAvailable }
                        : credit
                )
            );
        } catch (error) {
            console.error('Transaction failed:', error.response?.data?.message);

            // Rollback UI changes if the API call fails
            setWalletBalance((prev) => prev + price * amount);
            setCredits((prevCredits) =>
                prevCredits.map((credit) =>
                    credit.producerId === producerId
                        ? { ...credit, available: credit.available + amount }
                        : credit
                )
            );

            alert('Transaction failed! Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200">
            {/* Navigation */}
            {/* <nav className="bg-white shadow-md mb-8">
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
            </nav> */}
            <div className="container mx-auto px-6 py-4 bg-white shadow-md rounded-lg mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Credit and Wallet Information</h2>
                <div className="flex justify-between items-center">
                    <div className="text-lg">
                        <p className="mb-2">Current Credit Price: <span className="font-bold">{currentCreditPrice}</span></p>
                        <p>Government Electricity Price: <span className="font-bold">{governmentElectricityPrice}</span></p>
                    </div>
                    <div className="text-lg">
                        <p className="mb-2">Your Wallet Balance: <span className="font-bold">{walletBalance}</span></p>
                        <p>Total Credits Owned: {creditsAvailable}</p>
                    </div>
                </div>
            </div>
            {/* Available Solar Credits */}
            <h1 className="text-5xl font-extrabold text-center text-green-700 mb-12 drop-shadow-md">
                Available Solar Credits
            </h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {credits.map((credit) => (
                    <div
                        key={credit._id}
                        className={clsx(
                            "bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer",

                        )}
                    >
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">
                            {credit.producerId.name}
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-bold text-green-600">${credit.pricePerSEC.toFixed(2)}</span> per SEC
                        </p>
                        <p className="text-gray-500 mb-6">{credit.creditsAvailable} SECs available</p>
                        <button onClick={() => handleBuy(credit._id, 10)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md 
                            hover:bg-green-600 transition-all duration-200 focus:outline-none 
                            focus:ring-2 focus:ring-green-300 transform hover:-translate-y-1">
                            Buy 10 Credits Now
                        </button>

                        {/* {expandedCard === credit.id && (
                            <div className="mt-4 bg-green-50 p-4 rounded-lg shadow-inner">
                                <h3 className="text-lg font-bold text-green-700 mb-2">More Information:</h3>
                                <p className="text-gray-600">Producer: {credit.producer}</p>
                                <p className="text-gray-600">Price per SEC: ${credit.price.toFixed(2)}</p>
                                <p className="text-gray-600">Available: {credit.available} SECs</p>
                            </div>
                        )} */}
                    </div>
                ))}
            </div>
            {/* Update Credits Owned Form */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Update Wallet Amount</h2>
                <form onSubmit={handleUpdateWallet} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">Enter amount:</label>
                        <input
                            type="number"
                            value={newWalletAmount}
                            onChange={(e) => setNewWalletAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter new credits amount"
                            min="0"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                        Update Wallet
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Consumer_Home;