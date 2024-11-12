import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    MyApp
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
