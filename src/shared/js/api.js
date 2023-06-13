import { Alert } from "react-native";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { SERVER_URL } from "@/config/config.js"
import { async_storage_store_data, async_storage_get_data, async_storage_remove_data } from "@/shared/js/common.js";

const api = axios.create({
  baseURL: SERVER_URL,
  responseType: 'json',
  withCredentials: true,
});

/**
 * 로그인 
 */
export const exec_login = async (req_obj) => {
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
    async_storage_store_data('token', result.access_token);

    return result;
  } catch (xhr) {
    console.error('request 에러:', xhr);
    console.error(req_obj.url + 'r 에러');
    return null;
  }
}

/**
 * data 요청
 */
export const exec_request = async (req_obj) => {
  await check_exp_token();
  // const token = await check_exp_token();

  // const { url, ...data } = req_obj;

  // const body = {
  //   "data": data,
  //   "token": token,
  // };

  // try {
  //   const response = await api.post(SERVER_URL + `/${url}`, JSON.stringify(body), {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     },
  //   });

  //   const result = response.data;
  //   return result;
  // } catch (xhr) {
  //   console.error("request 에러:", xhr);
  //   console.error(req_obj.url + " 에러");
  //   return null;
  // };
}

/**
 * 토큰 만료 검사
 * : access token이 만료되거나, 만료되기 5분전에 새로운 토큰 발급
 */
export const check_exp_token = async () => {
  const token = await async_storage_get_data('token') ? await async_storage_get_data('token') : "";

  const token_info = jwt_decode(token);

  // const get_current_time_stamp = () => {
  //   return Math.floor(Date.now() / 1000)  //밀리초를 초로 변환
  // };
  // const current_time_stamp = get_current_time_stamp();
  // const five_minutes_ago_time_stamp = current_time_stamp - (5 * 60);

  // if (token_info.exp <= five_minutes_ago_time_stamp) {  //access token이 만료 됐을때

  //   const data = {
  //     user_id: token_info.user_id
  //   }
  //   const body = {
  //     "data": data,
  //   };

  //   const response = await api.post(SERVER_URL + `/check/token`, JSON.stringify(body), {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     },
  //   });

  //   const result = response.data;

  //   if (result.status === 'expired') {
  //     async_storage_remove_data('token');
  //     //홈으로 이동하는 로직 추가
  //   } else {
  //     async_storage_store_data('token', result.access_token);
  //     return result.access_token;
  //   }
  // } else {  //access token이 만료되지 않았을때
  //   return token;
  // }
};