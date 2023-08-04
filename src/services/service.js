import request from "./requests";

function get(url) {
  return request({
    method: "GET",
    url,
  });
}
function getWithBody(url, data, token) {
  return request({
    method: "GET",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function post(url, { data }) {
  return request({
    method: "POST",
    url,
    data,
  });
}

function postWithAuthentication({ url, data, token }) {
  return request({
    method: "POST",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function update({ url, data, token }) {
  return request({
    method: "PUT",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function remove({ url, data, token }) {
  return request({
    method: "DELETE",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const Service = {
  get,
  post,
  update,
  remove,
  getWithBody,
  postWithAuthentication,
};
export default Service;
