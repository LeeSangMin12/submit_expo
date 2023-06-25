import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import COLORS from '@/shared/js/colors';

import User_card from "@/pages/my/user_card/User_card";
import User_setting from "@/pages/my/user_setting/User_setting";

const My_page = () => {
  const {
    name,
    age,
    gender,
    university,
    department,
    admission_year,
    nickname
  } = useSelector((state) => state.user);

  console.log('name', name);
  console.log('age', age);
  console.log('gender', gender);
  console.log('university', university);

  return (
    <View>
      <SafeAreaView>
        <View style={styles.user_info_container}>
          <User_card />
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
    marginTop: 15,
    padding: 20
  },
  divider: {
    height: 6,
    backgroundColor: COLORS.gray_480
  }
});