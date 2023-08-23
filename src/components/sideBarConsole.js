import React from "react";
import LogoIcon from "../assets/images/Logo.webp";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import HeaderConsole from "./headerConsole";
import TabsInfo from "./tabsInfo";
import ShowPdf from "./showPdf";
import DocData from "./docData";
const SideBarConsole = ({setRejectData,setIsPDFLoaded,pdfFile,isPDFLoaded,formValues,setFormValues,rejectData,setPdfFile}) => {
  return (
    <div className="w-full flex">
      <div className="min-h-screen w-[85px]  fixed  shadow-md bg-white border-r-2 border-r-[#D8D8D8] z-50">
        <HeaderConsole />
        <div className="logo border-b-2 border-b-[#D8D8D8] py-[7px]">
          <img
            src={LogoIcon}
            alt="logo"
            className="h-auto max-w-[65px] mx-auto"
          />
        </div>
        <div className="flex flex-col justify-between  h-[87vh] " >
        <ul className="mt-4">
          <li className="flex flex-col items-center gap-1 text-text-color cursor-pointer hover:text-bg-secondary">
            <span>
              <LuLayoutDashboard size={"20px"} />
            </span>
            <span className="text-[13px] font-semibold ">Companies</span>
          </li>
        </ul>
          <ul className="mb-3">
            <li className="flex flex-col items-center gap-1 text-text-color cursor-pointer hover:text-bg-secondary">
              <span>
                <RiLogoutCircleLine size={"20px"} />
              </span>
              <span className="text-[13px] font-semibold ">Logout</span>
            </li>
          </ul>
          </div>
      </div>
      <div className=" flex w-[calc(100%-85px)] pt-20 pb-3 px-2 bg-primary-color  h-full  mt-auto ml-auto mb-0 ">
      <TabsInfo
          setPdfFile={setPdfFile}
          setFormValues={setFormValues}
          setRejectData={setRejectData}
          setIsPDFLoaded={setIsPDFLoaded}
        />

        <ShowPdf
          pdfFile={pdfFile}
          setIsPDFLoaded={setIsPDFLoaded}
          isPDFLoaded={isPDFLoaded}
        />
        <DocData
          formValues={formValues}
          setFormValues={setFormValues}
          rejectData={rejectData}
        /> 
      </div>
    </div>
  );
};

export default SideBarConsole;
