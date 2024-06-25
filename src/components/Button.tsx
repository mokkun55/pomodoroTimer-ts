import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      className={`text-white px-4 py-2 m-1 rounded-lg shadow-md hover:shadow-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
