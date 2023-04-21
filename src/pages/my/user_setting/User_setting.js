import { View, Text, StyleSheet } from "react-native";

import COLORS from '@/shared/js/colors';

const User_setting = () => {
  return (
    <>
      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>공지사항</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>이벤트</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>이용약관</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>운영정책</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>자주 묻는 질문</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>개인정보 처리방침</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.setting_container}>
        <Text style={styles.setting_text}>로그아웃</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default User_setting;

const styles = StyleSheet.create({
  setting_container: {
    padding: 25,
    justifyContent: 'center',
  },
  setting_text: {
    fontWeight: 'bold',
    fontSize: 16
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_480
  }
});