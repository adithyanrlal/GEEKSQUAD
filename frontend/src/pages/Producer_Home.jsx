import { useEffect, useState } from "react";
import axios from "axios";

const Producer_Home = () => {
  const currentCreditPrice = 0.12
  const governmentElectricityPrice = "$0.10/kWh";

  const [creditsAvailable, setCreditsAvailable] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const [yourCredits, setYourCredits] = useState([]);
  const [otherCredits, setOtherCredits] = useState([]);
  const [creditAmount, setCreditAmount] = useState(0);
  const [newCreditAmount, setNewCreditAmount] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const producerId = localStorage.getItem("producerId");
      try {

        const yourCreditsAvailable = await axios.get(`http://localhost:3000/producers/${producerId}`);
        setCreditsAvailable(yourCreditsAvailable.data.creditsAvailable);
        setWalletBalance(yourCreditsAvailable.data.walletBalance);

        const yourCreditsResponse = await axios.get(`http://localhost:3000/producers/${producerId}`);
        console.log("your credits:", yourCreditsResponse.data)
        setYourCredits(yourCreditsResponse.data);

        const otherCreditsResponse = await axios.get(`http://localhost:3000/api/credits/${producerId}`);
        setOtherCredits(otherCreditsResponse.data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };
    console.log(yourCredits)
    fetchCredits();
  }, [creditAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Credits to sell:", creditAmount);
    try {
      const producerId = localStorage.getItem("producerId");
      const response = await axios.post(`http://localhost:3000/api/credits/`, {
        producerId,
        creditsAvailable: creditAmount,
        pricePerSEC: currentCreditPrice,
      });
      console.log("Credits listed for selling:", response.data);
      alert("Credits sold successfully");
      fetchCredits();
    } catch (error) {
      console.error("Error selling credits:", error);
    }

    // Optionally, you can refetch the credits to update the UI
    setCreditAmount(0);

  }


  const handleUpdateCredits = async (e) => {
    e.preventDefault();
    const producerId = localStorage.getItem("producerId");
    try {
      const response = await axios.patch(`http://localhost:3000/producers/${producerId}`, {
        creditsAvailable: newCreditAmount,
      });
      console.log("Credits updated:", response.data);
      setNewCreditAmount(0);
      setCreditsAvailable(response.data.creditsAvailable);
      // Optionally, you can refetch the credits to update the UI
      alert("Credits updated successfully");

    } catch (error) {
      console.error("Error updating credits:", error);
    }
  };

  return (
    <div className="min-h-screen bg-orange-300">
      {/* Navbar */}
      <nav className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Producer Portal</h1>
          <ul className="flex space-x-8">
            <li><a href="#" className="text-gray-700 hover:text-blue-500">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500">User Account</a></li>
          </ul>
        </div>
      </nav>
      {/* Credit and Wallet Info */}
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
      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8">
        <div className="flex flex-col md:grid-cols-2 gap-8 mb-8">
          {/* Current Credits Box */}
          {yourCredits.length > 0 && <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Your Credits</h2>
            <div className="space-y-4">
              {yourCredits.map((credit) => (
                <div key={credit._id} className="flex justify-between items-center p-4 bg-blue-50 rounded-md">
                  <span className="text-lg font-medium">{credit.producerId.name}</span>
                  <span className="text-blue-600 font-bold">{credit.pricePerSEC.toFixed(2)}</span>
                  <span className="text-blue-600 font-bold">{credit.creditsAvailable}</span>
                </div>
              ))}
            </div>
          </div>}

          {/* Upcoming Credits Box */}
          {otherCredits.length > 0 && <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-green-600 mb-6">Other Credits</h2>
            <div className="space-y-4">
              {otherCredits.map((credit) => (
                <div key={credit._id} className="flex justify-between items-center p-4 bg-green-50 rounded-md">
                  <span className="text-lg font-medium">{credit.producerId.name}</span>
                  <span className="text-blue-600 font-bold">{credit.pricePerSEC.toFixed(2)}</span>
                  <span className="text-blue-600 font-bold">{credit.creditsAvailable}</span>
                </div>
              ))}
            </div>
          </div>}
        </div>
        {/* Update Credits Owned Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Update Credits Owned</h2>
          <form onSubmit={handleUpdateCredits} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">New Credits Owned</label>
              <input
                type="number"
                value={newCreditAmount}
                onChange={(e) => setNewCreditAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new credits amount"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Update Credits
            </button>
          </form>
        </div>
        {/* Sell Credits Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sell Your Credits</h2>
          <p className="text-lg mb-2">Current Credit Price: <span className="font-bold">{currentCreditPrice}</span></p>
          <p className="text-lg mb-6">Government Electricity Price: <span className="font-bold">{governmentElectricityPrice}</span></p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">No: of Credits to Sell</label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter credits amount"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Sell Credits
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Producer_Home;