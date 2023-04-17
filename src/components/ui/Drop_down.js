/**
 * todo items 와 value 차이점 알기
 * value 설정시 학번에 값 들어가는지 확인하기
 */
import { useState } from 'react';
import { StyleSheet, } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@/shared/js/colors';

/**
 * dropdown 생성
 * @param {Array} items - dropdown에 들어갈 arr
 * @param {function} set_items - dropdown의 값알 설정하는 function
 */
const Drop_down = ({ items, set_items }) => {
  const [open, set_open] = useState(false);
  const [value, set_value] = useState(null);

  return (
    <DropDownPicker
      placeholder='입학년도를 선택해주세요'
      style={styles.drop_down_picker}
      placeholderStyle={styles.drop_down_placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={set_open}
      setValue={set_value}
      setItems={(value) => console.log(value)}
      listMode="SCROLLVIEW"
      dropDownContainerStyle={styles.drop_down_container}
      listItemContainerStyle={styles.drop_down_list_item_container}
    />
  );
};

export default Drop_down;

const styles = StyleSheet.create({
  drop_down_picker: {
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
  },
  drop_down_placeholder: {
    color: COLORS.gray_500,
  },
  drop_down_container: {
    borderColor: COLORS.gray_480,
  },
  drop_down_list_item_container: {
    borderWidth: 1,
    borderColor: COLORS.gray_480,
  }
});