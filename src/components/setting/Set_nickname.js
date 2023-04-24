import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';

const Set_nickname = (props) => {
  return (
    <View>
      <Text style={styles.label}>닉네임</Text>

      <View style={styles.img_input_container}>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력해주세요"
          value={props.nickname}
          onChangeText={(label) => set_store_info('user', 'nickname', label)}
        />

        <TouchableOpacity>
          <Image source={require('@/assets/img/icon/duplicate_check.png')} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.message, styles.error]}>사용중인 닉네임입니다.</Text>
      <Text style={[styles.message, styles.success]}>사용 가능한 닉네임입니다.</Text>
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
  success: {
    color: COLORS.system_green,
  },
});