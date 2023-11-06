import React from "react";
import { PulseLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <PulseLoader className="w-max p-5" color="#434b69" />
    </div>
  );
}

export default Spinner;
