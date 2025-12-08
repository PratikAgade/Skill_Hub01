import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
const Layout = () => {
    return (
        <div className="min-h-screen text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
            <NavBar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <Outlet />
            </main>
        </div>
    );
};
export default Layout;