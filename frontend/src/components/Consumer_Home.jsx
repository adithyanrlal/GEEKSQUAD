"use client"

const Consumer_Home = () => {
  const currentCredits = [
    { id: 1, name: "Credit Pack A", price: "$50" },
    { id: 2, name: "Credit Pack B", price: "$100" },
    { id: 3, name: "Credit Pack C", price: "$200" },
  ];

  const upcomingCredits = [
    { id: 1, name: "Future Pack X", price: "$40" },
    { id: 2, name: "Future Pack Y", price: "$80" },
    { id: 3, name: "Future Pack Z", price: "$150" },
  ];

  return (
    <div className="min-h-screen bg-cyan-300">
      {/* Navbar */}
      <nav className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Consumer Portal</h1>
          <ul className="flex space-x-8">
            <li><a href="#" className="text-black hover:text-blue-500">Home</a></li>
            <li><a href="#" className="text-black hover:text-blue-500">User Account</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8">
        <div className=" md:grid-cols-2 gap-12 flex flex-col">
          {/* Current Credits Box */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Current Credits</h2>
            <div className="space-y-4">
              {currentCredits.map((credit) => (
                <div key={credit.id} className="flex justify-between items-center p-4 bg-blue-50 rounded-md">
                  <span className="text-lg font-medium">{credit.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-blue-600 font-bold">{credit.price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Credits Box */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-green-600 mb-6">Upcoming Credits</h2>
            <div className="space-y-4">
              {upcomingCredits.map((credit) => (
                <div key={credit.id} className="flex justify-between items-center p-4 bg-green-50 rounded-md">
                  <span className="text-lg font-medium">{credit.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-green-600 font-bold">{credit.price}</span>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Consumer_Home;
