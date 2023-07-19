import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { set_user } from '@/store/modules/user_slice';
import { set_semester_list } from '@/store/modules/semester_slice';
import { set_calendar } from '@/store/modules/calendar_slice';
import { set_assignment_add } from '@/store/modules/assignment_add_slice';
import { set_assignment } from '@/store/modules/assignment_slice';
import { set_assignment_submit } from '@/store/modules/assignment_submit_slice';
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
    assignment_add: set_assignment_add,
    assignment_submit: set_assignment_submit
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