import React, { useRef, useState } from "react";
import "../Navbar/Navbar.css";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import SignupForm from "../SignUp/signupForm";
import LoginForm from "../Login/loginForm ";

export default function Navbar({ userLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navRef = useRef();
  // const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const showNavbar = () => navRef.current.classList.toggle("login-form");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const showSignupForm = () => {
    closeModal();
    setIsLoginForm(false);
    openModal();
  };

  return (
    <>
      <header>
        <div className="header-one">
          <nav className="bg-transparent p-4">
            <div className="container max-w-full mx-auto flex items-center justify-between">
              <div className="text-emerald-950 text-4xl font-semibold flex gap-3">
                <GiBookmarklet />
                Books
              </div>
              <div className="block lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-black focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        isOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16m-7 6h7"
                      }
                    ></path>
                  </svg>
                </button>
              </div>
              <form action="" className="search-form ml-16 rounded-md flex">
                <input
                  className="w-full h-full py-5 px-2"
                  type="search"
                  id="search-box"
                  placeholder="search here..."
                />
                <label htmlFor="search-box" className="text-xl cursor-pointer">
                  <FaSearch />
                </label>
              </form>
              <div
                className={`lg:flex items-center ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <div className="icons flex gap-8 text-2xl mr-8 ">
                  <Link 
                    to={'/wishlist'}
                    className="transition duration-400 ease-in-out transform hover:text-orange-400 hover:scale-125">
                    <FaHeart />
                  </Link>
                  <Link
                    to={"/cart"}
                    className="transition duration-400 ease-in-out transform hover:text-orange-400 hover:scale-125"
                  >
                    <FaShoppingCart />
                    <div className="h-[12px] flex justify-center items-center mt-[-30px] ml-[25px] rounded-[11px] text-[14px] text-[#171717] z-30">
                      {totalQuantity}
                    </div>
                  </Link>
                  <Link
                    to=""
                    className="transition duration-400 ease-in-out transform hover:text-orange-400 hover:scale-125"
                  >
                    <FaUser />
                  </Link>
                </div>
                {userLoggedIn ? (
                  <li className="list-none">
                    <Link
                      to={"/logout"}
                      className="font-semibold text-lg hover:text-red-600 "
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <Link
                    onClick={showNavbar}
                    to="#"
                    className="mt-4 text-xl font-semibold lg:mt-0 text-black hover:text-red-600 flex items-center"
                  >
                    Login
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16l4-4-4-4M7 16l4-4-4-4"
                      ></path>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
        <div className="header-two">
          <div className="navbar py-5 text-center text-grey text-lg bg-violet-200 hover:bg-violet-300">
            <Link
              className="inline-block px-8 transition duration-500 ease-in-out transform hover:scale-125"
              to="/"
            >
              Home
            </Link>
            <Link
              className="inline-block px-8 transition duration-500 ease-in-out transform hover:scale-125"
              to="#"
            >
              Arrivals
            </Link>
            <Link
              className="inline-block px-8 transition duration-500 ease-in-out transform hover:scale-125"
              to="/categories"
            >
              Categories
            </Link>
            <Link
              className="inline-block px-8 transition duration-500 ease-in-out transform hover:scale-125"
              to="/about"
            >
              About
            </Link>
          </div>
        </div>
      </header>

      {/* Login Section */}

      <div
        className="flex items-center flex-col justify-center fixed right-[-105%] z-[100] bg-slate-200 w-full h-full"
        ref={navRef}
      >
        <div
          className="close-login-btn absolute top-6 right-9 text-4xl"
          onClick={showNavbar}
        >
          <FaTimes />
        </div>
        <LoginForm closeModal={showNavbar} showSignupForm={showSignupForm} />
      </div>

      {/* SignUp Session */}

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {isLoginForm ? (
          <LoginForm closeModal={closeModal} showSignupForm={showSignupForm} />
        ) : (
          <SignupForm closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}
