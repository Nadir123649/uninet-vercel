import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useTranslation } from "react-i18next";
import Api from "../services/api";
// import GetDigitalDocuments from "../hooks/useDigitalDoc";
import { useHistory } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { toast } from "react-toastify";
const TabsInfo = ({
  setPdfFile,
  setFormValues,
  setRejectData,
  setIsPDFLoaded,
  isRejected,
  setIsRejected,
  isEntered,
  setIsEntered,
}) => {
  const [activeKey, setActiveKey] = useState("Inbox");
  const [inboxListByUser, setInboxListByUser] = useState([]);
  const [approveListByUser, setApproveListByUser] = useState([]);
  const [rejectedListByUser, setRejectedListByUser] = useState([]);
  const [activeIndexes, setActiveIndexes] = useState({
    Inbox: -1,
    Entered: -1,
    Rejected: -1,
  });

  const history = useHistory();
  const { t } = useTranslation();
  let ishbrews = localStorage.getItem("i18nextLng");

  const token = localStorage?.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const handleSubmit = async (item, index, tabKey) => {
    setIsPDFLoaded(true);
    setActiveIndexes(() => ({
      [tabKey]: index,
    }));
    setPdfFile(item);

    const data = {
      JsonDocumentid: item?.jsonDocumentid,
      sendingDigitalDocumentBusinessID: item?.sendingDigitalDocumentBusinessID,
      BusinessVatId: item?.businessVatId,
      ClientVat_id: item?.clientVat_id.toString(),
      Lang: ishbrews === "he" ? 2 : 1,
    };
    try {
      if (token) {
        setRejectData({
          BusinessVatId: item?.businessVatId,
          ClientVat_id: item?.clientVat_id.toString(),
        });
        await Api.ShowDigitalDocumentDetails(data, token)
          .then((response) => {
            setFormValues(response);
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.ShowDigitalDocumentDetails(data, token)
                      .then((res) => {
                        if (res) {
                          setFormValues(res);
                        }
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleTabSelect = (key) => {
    setActiveKey(key);
  };

  const fetchInboxData = async () => {
    try {
      if (token) {
        await Api.GetDigitalDocumentToApproveListByUser(
          token,
          "notApproveOrRejected"
        )
          .then((res) => {
            if (res) {
              setInboxListByUser(res);
            }
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.GetDigitalDocumentToApproveListByUser(
                      token,
                      "notApproveOrRejected"
                    )
                      .then((res) => {
                        if (res) {
                          setInboxListByUser(res);
                        }
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchEnteredData = async () => {
    try {
      if (token) {
        await Api.GetDigitalDocumentToApproveListByUser(token, "Approved")
          .then((res) => {
            if (res) {
              setApproveListByUser(res);
            }
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.GetDigitalDocumentToApproveListByUser(
                      token,
                      "Approved"
                    )
                      .then((res) => {
                        if (res) {
                          setApproveListByUser(res);
                        }
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRejectedData = async () => {
    try {
      if (token) {
        await Api.GetDigitalDocumentToApproveListByUser(token, "Rejected")
          .then((res) => {
            if (res) {
              setRejectedListByUser(res);
            }
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.GetDigitalDocumentToApproveListByUser(
                      token,
                      "Rejected"
                    )
                      .then((res) => {
                        if (res) {
                          setRejectedListByUser(res);
                        }
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeKey === "Inbox") fetchInboxData();
    if (activeKey === "Entered") fetchEnteredData();
    if (activeKey === "Rejected") fetchRejectedData();
  }, [activeKey]);

  // useEffect(() => {
  //   fetchInboxData();
  // }, []);

  useEffect(() => {
    if (
      inboxListByUser?.length > 0 &&
      activeIndexes?.Inbox != 0 &&
      !approveListByUser?.length > 0 &&
      !rejectedListByUser?.length > 0
    )
      handleSubmit(inboxListByUser?.[0], 0, "Inbox");
  }, [inboxListByUser]);  

  useEffect(() => {
    if (isRejected === true && activeIndexes?.Inbox) {
      const newArray = inboxListByUser.filter(
        (item, index) => index !== activeIndexes?.Inbox
      );
      setInboxListByUser(newArray);
      setIsRejected(false);
    }
    if (isEntered === true && activeIndexes?.Inbox) {
      const newArray = inboxListByUser.filter(
        (item, index) => index !== activeIndexes?.Inbox
      );
      setInboxListByUser(newArray);
      setIsEntered(false);
    }
  }, [isRejected, isEntered]);

  return (
    <div className="w-full md:w-1/4 p-0 bg-white rounded-md shadow-md ">
      {/* <div class="wrapper">
	<input type="radio" name="tab" id="tab-1" />
	<label for="tab-1">Tab-1</label>
	<input type="radio" name="tab" id="tab-2"/>
	<label for="tab-2">Tab-2</label>
	<input type="radio" name="tab" id="tab-3"/>
	<label for="tab-3">Tab-3</label>	
	
	<div class="content">
		<article class="tab-1">
    <div className="custom-scrollbar api-scroll">
            {inboxListByUser &&
              inboxListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Inbox;
                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                       ${isActive ? "active" : ""}
                        ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Inbox")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
		</article>
		<article class="tab-2">
    <div className="custom-scrollbar api-scroll">
            {approveListByUser &&
              approveListByUser?.map((item, index) => {
                console.log("item",item);
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Entered;

                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                      ${isActive ? "active" : ""}
                       ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Entered")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
      </article>
		<article class="tab-3">
     <div className="custom-scrollbar api-scroll">
            {rejectedListByUser &&
              rejectedListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Rejected;
                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                     ${isActive ? "active" : ""}
                      ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Rejected")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
		</article>
	</div>
	<br class="clear:both" />
</div> */}
      <Tabs
        // defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        onSelect={handleTabSelect}
        activeKey={activeKey}
        className={
          ishbrews === "he" ? "hebrew flex-row-reverse" : "custom-tabs mb-3 "
        }
      >
        <Tab
          eventKey="Inbox"
          title={t("main-console.part65")}
          className={ishbrews === "he" ? " hebrew custom-tab" : "custom-tab"}
        >
          <div className="custom-scrollbar api-scroll">
            {inboxListByUser &&
              inboxListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Inbox;
                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                       ${isActive ? "active" : ""}
                        ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Inbox")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
        </Tab>
        <Tab
          eventKey="Entered"
          title={t("main-console.part66")}
          className="custom-tab"
        >
          <div className="custom-scrollbar api-scroll">
            {approveListByUser &&
              approveListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Entered;

                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                      ${isActive ? "active" : ""}
                       ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Entered")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
        </Tab>
        <Tab
          eventKey="Rejected"
          title={t("main-console.part67")}
          className="custom-tab"
        >
          <div className="custom-scrollbar api-scroll">
            {rejectedListByUser &&
              rejectedListByUser?.map((item, index) => {
                const [baseUrl] = item?.docInfoUrl.split("?");
                const isActive = index === activeIndexes?.Rejected;
                return (
                  <ul className="links-list">
                    <li
                      className={` custom-paragraph flex items-center gap-2 cursor-pointer tab-text text-[11px] font-medium leading-9  text-black hover:underline hover:text-primary-color
                     ${isActive ? "active" : ""}
                      ${ishbrews === "he" ? "flex-row-reverse" : ""}`}
                      onClick={() => handleSubmit(item, index, "Rejected")}
                    >
                      <BiLink />
                      {ishbrews === "en" ? index + 1 + ". " : ""}
                      {baseUrl}
                      {ishbrews === "he" ? "." + (index + 1) : ""}
                    </li>
                  </ul>
                );
              })}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsInfo;
