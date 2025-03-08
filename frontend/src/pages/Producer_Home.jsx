import { useEffect, useState } from "react";
import axios from "axios";

const Producer_Home = () => {
  const currentCreditPrice = "$100";
  const governmentElectricityPrice = "$0.10/kWh";

  const [yourCredits, setYourCredits] = useState([]);
  const [otherCredits, setOtherCredits] = useState([]);
  const [creditAmount, setCreditAmount] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const producerId = localStorage.getItem("producerId");
      try {
        const yourCreditsResponse = await axios.get(`http://localhost:3000/producers/${producerId}`);
        setYourCredits(yourCreditsResponse.data);

        const otherCreditsResponse = await axios.get(`http://localhost:3000/api/credits/${producerId}`);
        setOtherCredits(otherCreditsResponse.data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchCredits();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Credits to sell:", creditAmount);
    setCreditAmount(0);
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

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8">
        <div className="flex flex-col md:grid-cols-2 gap-8 mb-8">
          {/* Current Credits Box */}
          {yourCredits && <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Current Credits</h2>
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
          {otherCredits && <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-green-600 mb-6">Upcoming Credits</h2>
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

        {/* Sell Credits Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Sell Your Credits</h2>
          <p className="text-lg mb-2">Current Credit Price: <span className="font-bold">{currentCreditPrice}</span></p>
          <p className="text-lg mb-6">Government Electricity Price: <span className="font-bold">{governmentElectricityPrice}</span></p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-2">Amount of Credits to Sell</label>
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