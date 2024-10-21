import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        className={`fixed z-50 bg-[#151515] p-3 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          isMenuOpen ? "top-2 right-2" : "top-5 right-5"
        }`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" size={24} />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1 transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1 transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1 transition-all duration-300"></div>
          </>
        )}
      </button>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Admin Menu */}
      {isMenuOpen && (
        <section className="bg-[#151515] text-white p-6 fixed right-5 top-5 z-50 rounded-lg shadow-2xl w-64 transition-transform duration-500 ease-in-out transform">
          <ul className="list-none mt-2 space-y-4">
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block py-2 px-3 mb-2 hover:bg-[#2E2D2D] rounded-md transition-colors duration-300"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
