import { useState } from 'react';
import { StyleSheet, } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '@/shared/js/colors';

const Drop_down = () => {
  const [open, set_open] = useState(false);
  const [value, set_value] = useState(null);
  const [items, set_items] = useState([
    { "label": "23학번", "value": 23 },
    { "label": "22학번", "value": 22 },
    { "label": "21학번", "value": 21 },
    { "label": "20학번", "value": 20 },
    { "label": "19학번", "value": 19 },
    { "label": "18학번", "value": 18 },
    { "label": "17학번", "value": 17 },
    { "label": "16학번", "value": 16 },
    { "label": "15학번", "value": 15 },
    { "label": "14학번", "value": 14 },
    { "label": "13학번", "value": 13 },
    { "label": "12학번", "value": 12 },
    { "label": "11학번", "value": 11 },
    { "label": "10학번", "value": 10 },
  ]);


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
      setItems={set_items}
      listMode="SCROLLVIEW"
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
  }
});