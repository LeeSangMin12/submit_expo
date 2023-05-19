import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';

const Add_semester = () => {
  const [semester_list, set_semester_list] = useState([]);
  const [selected_semester, set_selected_semester] = useState('');

  useEffect(() => {
    const semester_list = make_semester_list();
    set_semester_list([...semester_list]);
    set_selected_semester(semester_list[3].value);  //현재 년도의 1학기
  }, []);

  /**
   * 학기 리스트를 생성
   */
  const make_semester_list = () => {
    let now_year = String(new Date().getFullYear());
    let year_arr = [];

    for (let i = Number(now_year); i >= 2010; i--) {
      year_arr.push(i);
    }

    const make_semester_list = year_arr.flatMap((year) => [
      {
        label: `${year}년 겨울학기`,
        value: `${year}_winter_semester`
      },
      {
        label: `${year}년 2학기`,
        value: `${year}_second_semester`
      },
      {
        label: `${year}년 여름학기`,
        value: `${year}_summer_semester`
      },
      {
        label: `${year}년 1학기`,
        value: `${year}_first_semester`
      },
    ]);

    return make_semester_list;
  }

  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          placeholder='시간표 이름'
          onChangeText={(label) => set_store_info('user', 'name', label)} />
      </View>

      <View>
        <Picker
          selectedValue={selected_semester}
          onValueChange={(item_value, item_index) =>
            set_selected_semester(item_value)
          }>
          {semester_list.map((val, idx) =>
            <Picker.Item label={val.label} value={val.value} key={idx} />
          )}
        </Picker>
      </View>
    </View>
  );
};

export default Add_semester;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input_container: {
    marginBottom: 30,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
});