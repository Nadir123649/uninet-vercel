import React from "react";
import Welcome from "../assets/images/welcome.png";

const WelcomeScreen = () => {
  return (
    <div className="bg-bg-linear flex justify-center min-h-screen items-center">
      <div className="welcome-content max-w-mx-550 text-center">
        <h1 className="text-[40px] font-semibold mb-4 tracking-wide  text-text-color leading-normal">
          Welcome you are part of <span className="cursor-pointer text-white font-normal underline"> Uninet  </span>
          network
        </h1>
        <p className="text-3xl font-normal text-text-color  mb-[32px] ">your company is all set up.</p>
        <button  className=" py-2 px-4  mb-3 text-base font-medium text-white border-none rounded-md md:text-lg bg-text-color secondary-btn">invite my business partners to the network</button>
        {/* <img src={Welcome} alt="welcome"/>  */}
      </div>
    </div>
  );
};

export default WelcomeScreen;
