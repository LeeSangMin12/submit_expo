import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import user_profile from '@/assets/img/my/user_card/user_profile.png';

import { set_store_info } from '@/shared/js/common';

const Set_image = () => {
  return (
    <View>
      <Text style={styles.label}>프로필 사진</Text>

      <View style={styles.profile_img_container}>
        <Image source={user_profile} style={styles.img_container} />
        <View style={styles.file_container}>
          <Fontisto
            name="link"
            size={24}
            color={COLORS.gray_500}
            style={{ marginRight: 10 }} />

          <TextInput
            style={styles.input}
            placeholder="첨부파일 없음"
            onChangeText={(label) => set_store_info('user', 'nickname', label)} />

          <Ionicons
            name="chevron-forward"
            size={30}
            color={COLORS.gray_500} />

        </View>
      </View>
    </View>
  );
};

export default Set_image;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginVertical: 12,
  },
  profile_img_container: {
    flexDirection: 'row'
  },
  img_container: {
    marginRight: 15
  },
  file_container: {
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