import React, { useState, useContext, useEffect } from "react";
import {
  BsBank,
  BsHandbagFill,
  BsFillPersonCheckFill,
  BsChevronRight,
  BsChevronLeft,
} from "react-icons/bs";
import { AuthUserContext } from "../context";
import { useTranslation } from "react-i18next";
function AccountStep({ step, setStep }) {
  const { t, i18n } = useTranslation();
  const [color, setColor] = useState("");
  const { setBusinessType, businessType } = useContext(AuthUserContext);
  let ishbrews = localStorage.getItem("i18nextLng");
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (color) {
      setIsValid(false);
      setBusinessType(color);
    }
  }, [color]);

  useEffect(() => {
    setColor(businessType);
  }, [businessType]);

  return (
    <div>
      <h1
        className={
          ishbrews == "he"
            ? "font-semibold text-xl md:text-2xl mb-[6px]  md:mb-[10px] mt-3 text-center"
            : "font-semibold  text-xl md:text-2xl mb-[6px] md:mb-[10px] text-center mt-3"
        }
      >
        {t("Questionnaire1.part32")}
      </h1>
      <p
        className={
          ishbrews === "he"
            ? "text-base md:text-lg font-normal text-gray-500 mb-5 md:mb-10 text-center"
            : "text-xs md:text-base font-normal text-gray-500 mb-5 text-center md:mb-10"
        }
      >
        {t("Questionnaire1.part33")}
        &nbsp;
      </p>
      <div
        className={
          ishbrews == "he"
            ? "flex row justify-between flex-col md:flex-row-reverse mx-1"
            : "flex flex-col md:flex-row justify-between mx-1"
        }
      >
        <div
          className={
            color === "0"
              ? "col-md-4 card relative cursor-pointer border border-solid rounded-md py-4 bg-primary-color shadow-md px-[10px]  d-flex items-center mb-10"
              : "col-md-4 card relative cursor-pointer border border-solid rounded-md border-bg-border shadow-md py-4 px-[10px]  d-flex items-center mb-10"
          }
          id="0"
          onClick={() => {
            setColor("0");
          }}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label
            htmlFor=""
            className={
              ishbrews == "he"
                ? "flex  items-center flex-col gap-3 cursor-pointer"
                : "flex items-center flex-col gap-3 cursor-pointer"
            }
          >
            <div>
              <BsBank size={"30px"} />
            </div>

            <div>
              <span
                className={
                  ishbrews == "he"
                    ? "block font-semibold text-center"
                    : "block font-semibold text-center"
                }
              >
                <span className="text-dark font-bold block text-xl mb-1">
                  {t("Questionnaire1.part34")}
                </span>
                <span
                  className={
                    ishbrews == "he"
                      ? "text-muted font-semibold text-[14px]"
                      : "text-muted font-semibold text-[14px]"
                  }
                >
                  {t("Questionnaire1.part35")}
                </span>
              </span>
            </div>
          </label>
        </div>
        <div
          className={
            color === "1"
              ? "col-md-4 card relative  cursor-pointer border border-solid shadow-md rounded-md py-4 bg-primary-color px-[10px]   d-flex items-center mb-10"
              : "col-md-4  card  relative cursor-pointer border border-solid shadow-md  rounded-md border-bg-border  py-4 px-[10px]  d-flex items-center mb-10"
          }
          id="1"
          onClick={() => setColor("1")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label
            htmlFor="label"
            className={
              ishbrews == "he"
                ? "flex items-center flex-col gap-3 cursor-pointer"
                : "flex items-center flex-col gap-3 cursor-pointer"
            }
          >
            <div>
              <BsHandbagFill size={"30px"} />
            </div>
            <div>
              <span
                className={
                  ishbrews == "he"
                    ? "block font-semibold text-center"
                    : "block font-semibold text-center"
                }
              >
                <span className="text-dark font-bold block text-xl mb-1">
                  {t("Questionnaire1.part36")}
                </span>
                <span
                  className={
                    ishbrews == "he"
                      ? "text-muted font-semibold text-[14px]"
                      : "text-muted font-semibold text-[14px]"
                  }
                >
                  {t("Questionnaire1.part37")}
                </span>
              </span>
            </div>
          </label>
        </div>
        <div
          className={
            color === "2"
              ? "col-md-4 card relative bg-primary-color cursor-pointer shadow-md  border border-solid rounded-md py-4 px-[10px]   d-flex items-center mb-10"
              : "col-md-4 relative  card  cursor-pointer border shadow-md  border-solid rounded-md border-bg-border  py-4 px-[10px]   d-flex items-center mb-10"
          }
          id="2"
          onClick={() => setColor("2")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value=""
            checked="checked"
            id=""
          />
          <label
            className={
              ishbrews == "he"
                ? "flex items-center flex-col gap-3 cursor-pointer"
                : "flex items-center flex-col gap-3 cursor-pointer"
            }
            htmlFor=""
          >
            <div>
              <BsFillPersonCheckFill size={"30px"} />
            </div>
            <div>
              <span
                className={
                  ishbrews == "he"
                    ? "block font-semibold text-center"
                    : "block font-semibold text-center"
                }
              >
                <span className="text-dark font-bold block text-xl mb-1">
                  {t("Questionnaire1.part38")}
                </span>
                <span
                  className={
                    ishbrews == "he"
                      ? "text-muted font-semibold text-[14px]"
                      : "text-muted font-semibold text-[14px]"
                  }
                >
                  {t("Questionnaire1.part39")}
                </span>
              </span>
            </div>
          </label>
        </div>
      </div>
      {isValid && (
        <span className="text-red-600">
          {t("Questionnaire1.PleaseSelectanyoftheField")}
        </span>
      )}{" "}
      <div
        className={
          ishbrews === "he"
            ? " flex flex-row justify-start mt-10 md:mt-20"
            : " flex flex-row justify-end mt-10 md:mt-20"
        }
      >
        <button
          onClick={() => {
            if (color === "") setIsValid(true);
            else {
              setStep(step + 1);
            }
          }}
          className={
            ishbrews === "he"
              ? " bg-bg-secondary text-base px-[22px] font-semibold flex gap-1 flex-row-reverse items-center py-[9px] text-white rounded-md "
              : " bg-bg-secondary text-base px-[22px] font-semibold flex gap-1 items-center py-[9px] text-white rounded-md "
          }
        >
          {ishbrews === "he" ? (
            <div className="flex items-center gap-2">
              <BsChevronLeft />
              <span>{t("Questionnaire1.part40")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{t("Questionnaire1.part40")}</span>
              <BsChevronRight />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default AccountStep;
