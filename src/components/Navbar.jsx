import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Add Listing',
    href: '/book/list',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Orders',
    href: '/book/orders',
  },
];

function Navbar() {
  const { isLoggedIn, logOut } = useFirebase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const[LoggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    setLoggedIn(isLoggedIn)
  }, [isLoggedIn]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="font-bold text-xl">
          <NavLink to="/">PageTurner</NavLink>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-sm font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200"
              activeClassName="text-black"
            >
              {item.name}
            </NavLink>
          ))}
          {LoggedIn ? (
            <button
              onClick={() => logOut()}
              type="button"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-800 transition-colors duration-200"
            >
              Log Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-800 transition-colors duration-200"
            >
              Log In
            </NavLink>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl">
                  <Link to="/">PageTurner</Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <nav className="mt-6 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                {LoggedIn ? (
                  <button
                    onClick={() => logOut()}
                    type="button"
                    className="block rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    Log In
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
