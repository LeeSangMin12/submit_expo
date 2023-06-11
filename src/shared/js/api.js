import axios from "axios";

import { SERVER_URL } from "@/config/config.js"

const api = axios.create({
  baseURL: SERVER_URL,
  responseType: 'json',
  withCredentials: true,
});

/**
 * 로그인 
 */
export const exec_login = async (req_obj) => {

  //여기서 token 검증 하고 요청 보내자

  const { url, ...data } = req_obj;

  const body = {
    "data": data,
  };

  try {
    const response = await api.post(`${SERVER_URL}/${url}`, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = response.data;

    console.log('result', result);

    return result;
  } catch (xhr) {
    console.error('request 에러:', xhr);
    console.error(req_obj.url + ' 에러');
    return null;
  }
}

// /**
//  * data 요청
//  */
// export const exec_request = async (req_obj) => {
//   const token = (sessionStorage.getItem("token")) ? sessionStorage.getItem("token") : "";
//   const user_id = (sessionStorage.getItem("user_id")) ? sessionStorage.getItem("user_id") : "";

//   const { url, ...data } = req_obj;

//   const body = {
//     "data": data,
//     "user_id": user_id,
//   };

//   try {
//     const response = await api.post(SERVER_URL + `/${url}`, JSON.stringify(body), {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//     });

//     const result = response.data;
//     return result;
//   } catch (xhr) {
//     console.error("request 에러:", xhr);
//     console.error(req_obj.url + " 에러");
//     return null;
//   };
// }