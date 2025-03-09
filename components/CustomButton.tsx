"use client";
import Image from "next/image";
import { CustomButtonProps } from "@/types";
const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType = "button",
  textStyles,
  isDisabled = false,
  rightIcon,
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={`custom-btn ${containerStyles} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      type={btnType}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>

      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image src={rightIcon} alt="right icon" fill className="object-contain" />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
