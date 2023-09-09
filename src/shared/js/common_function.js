import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { set_user } from '@/store/modules/user_slice';
import { set_semester_list } from '@/store/modules/semester_slice';
import { set_calendar } from '@/store/modules/calendar_slice';
import { set_assignment } from '@/store/modules/assignment_slice';
import store from '@/store/store';

/**
 * store안의 데이터를 바꾼다.
 * @param {*} store_name - 바꿀 store 이름
 * @param {*} key - 바뀔값의 key
 * @param {*} value - 바뀔 값
 */
export const set_store_info = (store_name, key, value) => {
  const set_store_map_obj = {
    user: set_user,
    semester: set_semester_list,
    calendar: set_calendar,
    assignment: set_assignment,
  };

  //useDispatch 훅은 함수형 컴포넌트 내부에서만 사용 가능하기에 store를 직접 부름.
  store.dispatch(
    set_store_map_obj[store_name]({
      key,
      value
    })
  );
};

/**
 * toast show
 * @param {*} message : toast messge 
 */
export const show_toast = (message) => {
  Toast.show({
    type: 'primary_success_toast',
    position: 'bottom',
    text1: message,
    bottomOffset: 90
  });
}


/**
 * AsyncStorage 데이터 저장
 */
export const async_storage_store_data = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val)
  } catch (err) {
    console.log('Error storing data: ', err);
  }
};

/**
 * AsyncStorage 데이터 가져오기
 */
export const async_storage_get_data = async (key) => {
  try {
    const val = await AsyncStorage.getItem(key)
    if (val !== null) {
      return val;
    }
  } catch (err) {
    console.log('Error rendering data: ', err);
  }
};

/**
 * AsyncStorage 데이터 삭제
 */
export const async_storage_remove_data = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log('Error rendering data: ', err);
  }
};

/**
 * 이메일 유효성 검사
 */
export const is_valid_email = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

/**
 * 요일 구하기
 */
export const get_day_of_week = (date) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const day_of_week = week[new Date(date).getDay()];

  return day_of_week;
};

/**
 * 24시 시간 형식을 12시 시간 형식으로 변환
 */
export const convert_12_hour_format = (time24) => {
  const [hour, minute] = time24.split(":");

  const hour24 = parseInt(hour, 10);
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const am_pm = hour24 >= 12 ? "오후" : "오전";

  return `${am_pm} ${hour12}:${minute} `;
};

/**
 * 한번만 클릭 가능하게 해주는 함수(중복 클릭 방지)
 */
export const do_once = (fn) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true
      fn(...args)
    }
  }
}

/**
 * toISOString 한국으로 시간 맞추기
 * :new Date에 toISOString 함수는 UTC시간을 기준으로 반환해, 
 * :한국과 9시간의 시차가 있어서 그 시차를 제거
 */
export const kor_iso_string = (date_obj) => {
  // const kor_date = new Date(date_obj.getTime() - (date_obj.getTimezoneOffset() * 60000)).toISOString();
  const date = new Date(date_obj);
  date.setHours(date.getHours() + 9);
  const kor_date = date.toISOString().replace('T', ' ').substring(0, 19);  //안드로이드에서 인식을 못함
  const formatted_date_Str = kor_date.replace(/-/g, "/");

  return formatted_date_Str;
}