import { View, Text, TextInput, StyleSheet } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';
import { set_store_info } from '@/shared/js/common';

const Set_basic = (props) => {
  return (
    <>
      <View style={styles.input_container}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          value={props.name}
          style={styles.input}
          placeholder='이름을 입력해주세요'
          onChangeText={(label) => set_store_info('user', 'name', label)} />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>나이</Text>
        <TextInput
          value={props.age}
          keyboardType='number-pad'
          returnKeyType="done"
          style={styles.input}
          placeholder='나이를 선택해주세요'
          maxLength={2}
          onChangeText={(label) => set_store_info('user', 'age', label)} />
      </View>

      <View style={styles.input_container}>
        <Text style={styles.label}>성별을 선택해주세요</Text>
        <View style={styles.chip_container}>
          <Chip
            label="남성"
            selected={props.gender === 'male'}
            on_press={() => set_store_info('user', 'gender', 'male')} />
          <Chip
            label="여성"
            selected={props.gender === 'female'}
            on_press={() => set_store_info('user', 'gender', 'female')} />
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