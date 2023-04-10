import { View, Text, TextInput, StyleSheet } from 'react-native';

import COLORS from '@/shared/js/colors';

const Set_university = () => {
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
    </>
  );
}

export default Set_university;

const styles = StyleSheet.create({
  input_container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 17,
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