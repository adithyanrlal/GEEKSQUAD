import React from 'react'
import { Link } from "react-router-dom";
import AnimatedSunBackground from './AnimatedSunBackground';

function Welcome() {
  return (
    
    
    <div className="flex flex-col items-center justify-end absolute right-4  w-[400px] h-[600px] mr-4   ">
      <div className=" w-full  p-8 space-y-8 bg-white rounded-xl shadow-lg h-[420px]">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please select how you would like to sign in
          </p>
        </div>
        
        <div className="mt-8 space-y-8">
          <Link to='/Producer-login'
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            Sign in as Producer
          </Link>
          
          <Link to='/Consumer-login'
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-purple-400 group-hover:text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </span>
            Sign in as Consumer
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact support</a>
          </p>
        </div>
      </div>
      <h1 class="text-6xl font-extrabold text-yellow-200  w-[1500px] h-[100px]">
  RAY VAULT
</h1>

    </div>
  )
}

export default Welcome