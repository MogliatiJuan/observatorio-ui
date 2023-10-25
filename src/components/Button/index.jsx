import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full bg-general p-2 my-5 text-white text-3xl font-semibold rounded-md  hover:bg-hoverGeneral"
    >
      {children}
    </button>
  );
};

export default Button;
