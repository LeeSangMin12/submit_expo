import { View, Text, Image, StyleSheet } from "react-native";

import user_profile from '@/assets/img/my/user_card/user_profile.png';
import { Chip } from '@/components/components';
import COLORS from '@/shared/js/colors';

const User_card = () => {
  return (
    <View style={styles.container}>

      <View style={styles.user_info_container}>
        <Image source={user_profile} />

        <View style={styles.user_text_info_conatiner}>
          <View style={styles.text_container}>
            <Text style={styles.user_name}>김대리</Text>
            <Text style={styles.user_info}>대동대학교</Text>

          </View>
          <View style={styles.text_container}>
            <Chip label="경영학과" />
            <Chip style={styles.user_info} label="19학번" />
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.edit_profile}>프로필 수정</Text>
      </View>
    </View>
  );
};

export default User_card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user_info_container: {
    flexDirection: 'row'
  },
  user_text_info_conatiner: {
    marginLeft: 10,
    justifyContent: 'space-evenly'
  },
  text_container: {
    flexDirection: 'row'
  },
  user_name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  user_info: {
    marginLeft: 7
  },
  edit_profile: {
    color: COLORS.gray_530
  }
});