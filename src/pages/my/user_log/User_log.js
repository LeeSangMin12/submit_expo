import { View, Text, StyleSheet } from "react-native";
import COLORS from '@/shared/js/colors';

const User_log = () => {
  return (
    <View style={styles.log_container}>
      <View style={styles.log_box}>
        <Text style={styles.log_num}> 12</Text>
        <Text> 최근 본</Text>
      </View>

      <View style={styles.log_box}>
        <Text style={styles.log_num}> 12</Text>
        <Text> 내가 쓴 글</Text>
      </View>
      <View style={styles.log_box}>
        <Text style={styles.log_num}> 12</Text>
        <Text> 내가 쓴 댓글</Text>
      </View>
      <View style={styles.log_box}>
        <Text style={styles.log_num}> 12</Text>
        <Text> 좋아요</Text>
      </View>
    </View >
  );
};

export default User_log;

const styles = StyleSheet.create({
  log_container: {
    marginTop: 20,
    height: 80,
    flexDirection: 'row',
    backgroundColor: COLORS.gray_470_bg,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 10
  },
  log_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray_480,
  },
  log_num: {
    fontWeight: 'bold',
    fontSize: 17
  }

});