import React, { useState } from "react";
import { BsBank, BsHandbagFill, BsFillPersonCheckFill } from "react-icons/bs";
function AccountStep() {
  const [color, setColor] = useState("");
  console.log("color", color);
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-[10px] mt-3">
        Tell us who you are
      </h1>
      <p className="text-base font-normal text-gray-500 mb-10">
        A small business owner or an employee in a big business operation. Or, a
        service provider who manage finance for client?
        <span className="cursor-pointer text-primary-color">Help Page</span>
      </p>

      <div className="row justify-between mx-1">
        <div
          className={
            color === "bigBusiness"
            ? "col-md-4 card relative cursor-pointer border border-solid rounded-md py-4 bg-primary-color border-blue-500 px-2 d-flex items-center mb-10"
            : "col-md-4 card relative cursor-pointer border border-solid rounded-md border-bg-border py-4 px-2 d-flex items-center mb-10"
          }
          id="bigBusiness"
          onClick={() => setColor("bigBusiness")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label htmlFor="" className="flex items-center gap-3">
            <div>
              <BsBank size={"30px"} />
            </div>

            <div>
              <span className="block font-semibold text-left">
                <span className="text-dark font-bold block text-xl mb-2">
                  Big Business
                </span>
                <span className="text-muted font-semibold text-sm">
                  If you need more info, please check it out
                </span>
              </span>
            </div>
          </label>

          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div
          className={
            color === "smallBusiness"
              ? "col-md-4 card relative  cursor-pointer border border-solid rounded-md py-4 bg-primary-color px-2   d-flex items-center mb-10"
              : "col-md-4  card  relative cursor-pointer border border-solid rounded-md border-bg-border  py-4 px-2  d-flex items-center mb-10"
          }
          id="smallBusiness"
          onClick={() => setColor("smallBusiness")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label htmlFor="label" className="flex items-center gap-3">
            <div>
              <BsHandbagFill size={"30px"} />
            </div>
            <div>
              <span className="block font-semibold text-left">
                <span className="text-dark font-bold block text-xl mb-2">
                  Small Business
                </span>
                <span className="text-muted font-semibold text-sm">
                  If you need more info, please check it out
                </span>
              </span>
            </div>
          </label>
        </div>
        <div
          className={
            color === "services"
              ? "col-md-4 card relative bg-primary-color cursor-pointer border border-solid rounded-md py-4 px-2   d-flex items-center mb-10"
              : "col-md-4 relative  card  cursor-pointer border border-solid rounded-md border-bg-border  py-4 px-2  d-flex items-center mb-10"
          }
          id="services"
          onClick={() => setColor("services")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value=""
            checked="checked"
            id=""
          />
          <label className=" flex gap-3 items-center" htmlFor="">
            <div>
              <BsFillPersonCheckFill size={"30px"} />
            </div>
            <div>
              <span className="block font-semibold text-left">
                <span className="text-dark font-bold block text-xl mb-2">
                  Service provider
                </span>
                <span className="text-muted font-semibold text-sm">
                  If you need more info, please check it out
                </span>
              </span>
            </div>

            <div className="absolute inset-0 rounded-md border-4 border-transparent pointer-events-none"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AccountStep;
