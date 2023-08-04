import React from "react";

const MainConsole = () => {
  return (
    <div className="min-h-screen bg-bg-linear wrapper-Div">
      <div class="flex h-screen">
        <div class="w-1/4 bg-gray-200 p-4"></div>

        <div class="w-1/2 bg-white p-4">
          <input type="file" accept=".pdf" />
        </div>

        <div class="w-1/4 bg-gray-200 p-4"></div>
      </div>
    </div>
  );
};

export default MainConsole;
