import { View, StyleSheet, } from 'react-native';

import { Custom_text_input, Custom_text } from "@/components/components";
import COLORS from '@/shared/js/colors';

const Set_nickname = ({
  nickname,
  err_nickname,
  set_value
}) => {

  return (
    <View>
      <Custom_text style={styles.label}>닉네임</Custom_text>

      <View style={styles.img_input_container}>
        <Custom_text_input
          style={styles.input}
          placeholder="닉네임을 입력해주세요(2글자 이상)"
          value={nickname}
          onChangeText={(label) => set_value((prev_state) => {
            return { ...prev_state, nickname: label }
          })} />

      </View>

      <Custom_text style={[styles.message, styles.error]}>{err_nickname}</Custom_text>
    </View>
  );
};

export default Set_nickname;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'medium',
    paddingBottom: 12
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
    fontSize: 13,
    fontFamily: 'medium',
    paddingTop: 12,
  },
  error: {
    color: COLORS.system_red,
  },
});