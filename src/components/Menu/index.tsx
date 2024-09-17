import React from "react";

type Props = {
  name: string;
};

const Menu = ({ name }: Props) => {
  return (
    <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg focus:outline-none">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={`${name}-button`}
      >
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Settings
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Profile
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Menu;
