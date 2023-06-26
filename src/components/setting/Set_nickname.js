import { View, Text, TextInput, StyleSheet, } from 'react-native';

import COLORS from '@/shared/js/colors';

const Set_nickname = ({
  nickname,
  err_nickname,
  set_value
}) => {

  return (
    <View>
      <Text style={styles.label}>닉네임</Text>

      <View style={styles.img_input_container}>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력해주세요(2글자 이상)"
          value={nickname}
          onChangeText={(label) => set_value((prev_state) => {
            return { ...prev_state, nickname: label }
          })} />

      </View>

      <Text style={[styles.message, styles.error]}>{err_nickname}</Text>
    </View>
  );
};

export default Set_nickname;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginVertical: 12,
  },
  img_input_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingHorizontal: 3,
  },
  message: {
    fontSize: 12,
    marginTop: 10,
  },
  error: {
    color: COLORS.system_red,
  },
});