import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import Api from "../services/api";
const TabsInfo = ({ setApproveListByUser, approveListByUser, setPdfFile }) => {
  const { t } = useTranslation();
  let ishbrews = localStorage.getItem("i18nextLng");
  console.log("ishbrews", ishbrews);
  useEffect(() => {
    // const token = localStorage?.getItem("accessToken");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQzIiwibmJmIjoxNjkxNjc5ODM2LCJleHAiOjE2OTE2ODI4MzZ9.ruMdH7BQsjFDwn7aAVUshpzcv04W5I6vv6DnteuDoeg";
    Api.GetDigitalDocumentToApproveListByUser(token)
      .then((res) => {
        // console.log("res", res);
        setApproveListByUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (item) => {
    try {
      //  console.log("item", item);
      setPdfFile(item);
    } catch (e) {
      console.log("e", e);
    }
  };
  // console.log("approveListByUser", approveListByUser);
  // className="w-full md:w-1/4 bg-gray-200 p-4"
  return (
    <div className="w-full md:w-1/4 bg-gray-200 p-0">
      <Tabs
        // defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="custom-tabs mb-3"
      >
        <Tab
          eventKey="Inbox"
          title={t("main-console.part65")}
          className="custom-tab"
        >
          <div className="">
            {approveListByUser &&
              approveListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                return (
                  <p
                    className="text-sm leading-9 font-normal mb-2 text-text-color hover:underline cursor-pointer"
                    onClick={() => handleSubmit(item)}
                  >
                    {baseUrl}
                  </p>
                );
              })}
          </div>
        </Tab>
        <Tab
          eventKey="Entered"
          title={t("main-console.part66")}
          className="custom-tab"
        >
          <div className="mx-3">
            {approveListByUser &&
              approveListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                return (
                  <p
                    className="text-sm leading-9 font-normal mb-2 text-text-color hover:underline cursor-pointer"
                    onClick={() => handleSubmit(item)}
                  >
                    {baseUrl}
                  </p>
                );
              })}
          </div>
        </Tab>
        <Tab
          eventKey="Rejected"
          title={t("main-console.part67")}
          className="custom-tab"
        >
          <div className="mx-3">
            {approveListByUser &&
              approveListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                return (
                  <p
                    key={index}
                    className="text-sm leading-9 font-normal mb-2 text-text-color hover:underline cursor-pointer"
                    onClick={() => handleSubmit(item)}
                  >
                    {baseUrl}
                  </p>
                );
              })}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsInfo;
