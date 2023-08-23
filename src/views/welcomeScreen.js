import React from "react";
import NeedHelp from "../components/needHelp";
import { useHistory } from "react-router-dom";
import { BsEmojiSmileFill } from "react-icons/bs";

const WelcomeScreen = () => {
  const history = useHistory();
  const handleWhatsAppButtonClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=972584222456";
    window.open(whatsappUrl, "_blank");
  };
  return (
    <>
      <div className="bg-bg-linear flex justify-center min-h-screen items-center">
        <div className="welcome-content max-w-mx-550 text-center mx-2 px-2 md:mx-0">
          <h1 className="text-3xl md:text-[40px] font-semibold mb-4 tracking-wide  text-text-color leading-normal">
            Welcome you are part of{" "}
            <span className="cursor-pointer text-white font-normal underline">
              Uninet
            </span>
            network
          </h1>
          <p className=" text-xl md:text-3xl font-normal text-text-color  mb-[32px] ">
            your company is all set up.
          </p>
          <button
            className=" py-2 px-4  mb-3 text-sm font-medium text-white border-none rounded-md md:text-lg bg-text-color secondary-btn"
            onClick={handleWhatsAppButtonClick}
          >
            invite my business partners to the network
          </button>
          <button
            className=" py-2 px-4  mb-3 text-sm font-medium text-white border-none rounded-md md:text-lg bg-text-color secondary-btn"
            onClick={() => history.push("/main-console")}
          >
            Go to console
          </button>
          <div className="text-center">
            <BsEmojiSmileFill
              size={"120px"}
              className="text-white mx-auto mt-3"
            />
          </div>
        </div>
      </div>
      <NeedHelp />
    </>
  );
};

export default WelcomeScreen;
