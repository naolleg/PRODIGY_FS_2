import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        // Add your logout logic here, e.g. remove token from local storage
        console.log('Logout clicked');
      };

   
    return (
        <nav className="bg-gradient-to-r from-blue-800 to-blue-700 shadow-md h-18" style={{ fontFamily: 'Arial, sans-serif' }}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    <div className="flex items-center mt-5">
                        <span className="font-semibold text-xl text-white dark:text-white" >Employment Management System</span>
                    </div>
                    <div className="hidden md:flex space-x-10    ">
                        <a href="/dashboard" className="text-white dark:text-white hover:text-gray-900">Home</a>
                        <a href="/department" className="text-white dark:text-white hover:text-gray-900">dept</a>
                        <a href="/profile" className="text-white dark:text-white hover:text-gray-900">empty</a>
                        <a href="#" className="text-white dark:text-white hover:text-gray-900">about        </a>
                    </div>
                    <div className="flex items-center">
                    <button
            className="bg-white hover:bg-gray-300 text-red-500 font-bold py-2 px-4 rounded "
            style={{
              border: '1px solid red',
              marginRight: 20,
              marginTop: 10,
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden ml-4 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6 text-white dark:text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <a href="#" className="block py-2 px-4 text-sm text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Home</a>
                    <a href="#" className="block py-2 px-4 text-sm text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Programs</a>
                    <a href="#" className="block py-2 px-4 text-sm text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Trainers</a>
                    <a href="#" className="block py-2 px-4 text-sm text-white dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;