import { useState } from 'react';
import { StyleSheet, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import COLORS from '@/shared/js/colors';

/**
 * dropdown 생성
 * @param {Arr} items - dropdown에 들어갈 arr
 * @param {function} value - dropdown에 들어갈 값
 * @param {*} set_items - dropdown에 들어갈 arr를 설정하는 function
 * @param {function} set_value - dropdown에 들어갈 값을 설정하는 function
 */
const Drop_down = ({ items, value, set_items, set_value }) => {
  const [open, set_open] = useState(false);

  /**
   * 현재 값을 받아와 값을 변경
   * @param {function} value - 현재 값
   */
  const handle_set_value = (value) => {
    const now_value = value();
    set_value(now_value);
  }

  return (
    <DropDownPicker
      placeholder='입학년도를 선택해주세요'
      open={open}
      value={value}
      items={items}
      setOpen={set_open}
      setValue={handle_set_value}
      setItems={set_items}
      listMode="SCROLLVIEW"
      style={styles.drop_down_picker}
      placeholderStyle={styles.drop_down_placeholder}
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