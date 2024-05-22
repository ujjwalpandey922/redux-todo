import Link from "next/link";
import React from "react";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className=" w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Todo App</h1>
        <div className="flex items-center">
          <Link
            href="/dashboard"
            className="text-white mr-4 hover:text-gray-200"
          >
            Dashboard
          </Link>
          <div className="text-white">
            <FiUser className="text-2xl cursor-pointer hover:text-gray-200" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
