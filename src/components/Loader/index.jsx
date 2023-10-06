import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin text-blue-500">
        <BiLoaderAlt className="text-4xl" />
      </div>
    </div>
  );
}

export default Spinner;
