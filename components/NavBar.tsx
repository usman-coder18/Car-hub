"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = () => {
  const [toastPosition, setToastPosition] = useState<"top-center" | "top-right">("top-right");

  useEffect(() => {
    const updatePosition = () => {
      setToastPosition(window.innerWidth < 768 ? "top-center" : "top-right");
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  const handleLoginClick = () => {
    toast.error("You are not admin!", {
      position: toastPosition, 
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={118} height={18} className="object-contain" />
        </Link>

        <CustomButton
          title="Admin Login"
          btnType="button"
          handleClick={handleLoginClick}
          containerStyles="text-primary-blue bg-white rounded-full min-w-[130px]"
        />
      </nav>

      <ToastContainer
        position={toastPosition} 
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme="colored"
      />
    </header>
  );
};

export default NavBar;
