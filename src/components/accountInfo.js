import React, { useState, useContext } from "react";
import Api from "../services/api";
import { AuthUserContext } from "../context";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

const AccountInfo = ({ step, setStep }) => {
  const initialQuestionnaireValues = {
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    OrganizationRole: "",
  };
  const { t, i18n } = useTranslation();
  const { businessType } = useContext(AuthUserContext);
  const [formError, setFormError] = useState({});
  const [questionnaireValues, setQuestionnaireValues] = useState({
    ...initialQuestionnaireValues,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionnaireValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validate = (values) => {
    const errors = {};

    if (!values?.FirstName) {
      errors.FirstName = "Please enter your first name";
    }
    if (!values?.LastName) {
      errors.LastName = "Please enter your last name";
    }
    if (!values?.MobileNumber) {
      errors.MobileNumber = "Please enter your mobile number";
    }
    if (!values?.OrganizationRole) {
      errors.OrganizationRole = "Please enter organization role";
    }
    Object.keys(errors).map((key) => {
      if (Object.keys(errors[key])?.length === 0) delete errors[key];
    });

    return errors;
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage?.getItem("accessToken");
      const data = [
        {
          BusinessType: businessType,
          FirstName: questionnaireValues?.FirstName,
          LastName: questionnaireValues?.LastName,
          MobileNumber: questionnaireValues?.MobileNumber,
          OrganizationRole: questionnaireValues?.OrganizationRole,
          OrganizationName: "OrganizationB",
          OrganizationType: 1,
          ExternalSystemId: 2,
        },
      ];
      await Api.SecondQuestionnaire(data, token)
        .then((res) => {
          if (res?.result) {
            setStep(step + 1);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((e) => {
          console.error(e?.data?.error);
        });
    } catch (e) {
      console.log("e", e);
    }
  };
  const addQuestionnaireData = () => {
    const validateForm = validate(questionnaireValues);
    setFormError(validateForm);
    if (Object.keys(validateForm)?.length === 0) {
      handleSubmit();
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-[10px] mt-3">
        Now, Tell us about yourself
      </h1>
      <p className="text-base font-normal text-gray-500 mb-10">
        Used to verify your account and provide access
      </p>
      <div className="row">
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="firstNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color"
          >
            First name
          </label>
          <input
            className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="firstNameInput"
            name="FirstName"
            placeholder="Enter your first name"
            value={questionnaireValues?.FirstName}
            onChange={handleChange}
          />
          {formError?.FirstName ? (
            <p className="text-red-600 ">{formError?.FirstName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="lastNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color"
          >
            Last name
          </label>
          <input
            className="block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="lastNameInput"
            placeholder="Last Name"
            name="LastName"
            value={questionnaireValues?.LastName}
            onChange={handleChange}
          />
          {formError?.LastName ? (
            <p className="text-red-600 ">{formError?.LastName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="mobileNumberInput"
            className="mb-[10px] text-sm font-semibold text-text-color"
          >
            Mobile number
          </label>

          <input
            className="block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="mobileNumberInput"
            placeholder="Mobile number"
            name="MobileNumber"
            value={questionnaireValues?.MobileNumber}
            onChange={handleChange}
          />
          {formError?.MobileNumber ? (
            <p className="text-red-600 ">{formError?.MobileNumber}</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="roleInput"
            className="mb-[10px]  text-sm font-semibold text-text-color"
          >
            Role in the Organization:
          </label>
          <input
            type="text"
            id="roleInput"
            className="block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            placeholder="Enter your role"
            name="OrganizationRole"
            value={questionnaireValues?.OrganizationRole}
            onChange={handleChange}
          />
          {formError?.OrganizationRole ? (
            <p className="text-red-600 ">{formError?.OrganizationRole}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className=" flex flex-row justify-between  mt-20">
        {step === 0 ? (
          <></>
        ) : (
          <button
            onClick={() => setStep(step - 1)}
            className=" bg-bg-secondary flex  text-base px-[22px] font-semibold flex  items-center py-[9px] text-white rounded-md "
            id="backButton"
          >
            <BsChevronLeft />
            <span>Back</span>
          </button>
        )}

        <button
          onClick={() => addQuestionnaireData()}
          className=" bg-bg-secondary   text-base px-[22px] font-semibold flex gap-1 items-center py-[9px] text-white rounded-md "
        >
          <span>{t('Questionnaire1.part40')}</span>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
