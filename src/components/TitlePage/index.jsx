import React from "react";

function TitlePage({ title, sub, icon }) {
  return (
    <div
      className={`bg-navbar flex items-center justify-center text-center  ${
        sub ? "h-2/6" : "h-1/2"
      } ${icon && "gap-x-5"}`}
    >
      <span className="text-white text-6xl">{title}</span>
      {icon && <span className="text-white text-6xl">{icon}</span>}
    </div>
  );
}

export default TitlePage;
