import { useState, useEffect } from "react";
import Api from "../services/api"; // Replace with the correct path to your API functions
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const GetDigitalDocuments = () => {
  const history = useHistory();
  const [inboxListByUser, setInboxListByUser] = useState([]);
  const [approveListByUser, setApproveListByUser] = useState([]);
  const [rejectedListByUser, setRejectedListByUser] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage?.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

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
    fetchData();
  }, []);

  return {
    inboxListByUser,
    approveListByUser,
    rejectedListByUser,
  };
};

export default GetDigitalDocuments;
