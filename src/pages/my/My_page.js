import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import COLORS from '@/shared/js/colors';

import User_card from "@/pages/my/user_card/User_card";
// import User_log from "@/pages/my/user_log/User_log";
import User_setting from "@/pages/my/user_setting/User_setting";

const My_page = () => {
  return (
    <View>
      <SafeAreaView>
        <View style={styles.user_info_container}>
          <User_card />
          {/* <User_log /> */}
        </View>
        <View style={styles.divider} />
        <ScrollView>
          <User_setting />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default My_page;

const styles = StyleSheet.create({
  user_info_container: {
    marginTop: 10,
    padding: 20
  },
  divider: {
    height: 6,
    backgroundColor: COLORS.gray_480
  }
});