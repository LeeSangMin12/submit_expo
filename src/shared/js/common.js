import { set_user } from '@/store/modules/user_slice';
import store from '@/store/store';

/**
 * store안의 데이터를 바꾼다.
 * @param {*} store_name - 바꿀 store 이름
 * @param {*} key - 바뀔값의 key
 * @param {*} value - 바뀔 값
 */
export const set_store_info = (store_name, key, value) => {
  const set_store_map_obj = {
    user: set_user
  };

  //useDispatch 훅은 함수형 컴포넌트 내부에서만 사용 가능하기에 store를 직접 부름.
  store.dispatch(
    set_store_map_obj[store_name]({
      key,
      value
    })
  );
};