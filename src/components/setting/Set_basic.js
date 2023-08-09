import { View, TextInput, StyleSheet } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Custom_text, Chip } from '@/components/components';

const Set_basic = ({
  name,
  age,
  gender,
  set_value
}) => {
  return (
    <>
      <View style={styles.input_container}>
        <Custom_text style={styles.label}>이름</Custom_text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder='이름을 입력해주세요'
          onChangeText={(label) => set_value((prev_state) => {
            return { ...prev_state, name: label }
          })} />
      </View>

      <View style={styles.input_container}>
        <Custom_text style={styles.label}>나이</Custom_text>
        <TextInput
          value={age}
          keyboardType='number-pad'
          returnKeyType="done"
          style={styles.input}
          placeholder='나이를 선택해주세요'
          maxLength={2}
          onChangeText={(label) => set_value((prev_state) => {
            return { ...prev_state, age: label }
          })} />
      </View>

      <View style={styles.input_container}>
        <Custom_text style={styles.label}>성별을 선택해주세요</Custom_text>
        <View style={styles.chip_container}>
          <Chip
            label="남성"
            selected={gender === 'male'}
            on_press={() => set_value((prev_state) => {
              return { ...prev_state, gender: 'male' }
            })} />
          <Chip
            label="여성"
            selected={gender === 'female'}
            on_press={() => set_value((prev_state) => {
              return { ...prev_state, gender: 'female' }
            })} />
        </View>
      </View>
    </>
  );
};

export default Set_basic;

const styles = StyleSheet.create({
  input_container: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginVertical: 12,
  },
  input: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  chip_container: {
    flexDirection: 'row',
  },
});