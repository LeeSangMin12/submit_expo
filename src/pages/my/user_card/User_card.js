import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import user_profile from '@/assets/img/my/user_card/user_profile.png';
import { Chip } from '@/components/components';
import COLORS from '@/shared/js/colors';

const User_card = () => {
  return (
    <View style={styles.container}>

      <View style={styles.card_container}>
        <Image source={user_profile} />

        <View style={styles.card_text_container}>
          <View style={[styles.text_container, { alignItems: 'center' }]}>
            <Text style={styles.text_name}>김대리</Text>
            <Text style={styles.text_university}>대동대학교</Text>
          </View>
          <View style={styles.text_container}>
            <View style={[styles.chip, { backgroundColor: COLORS.primary_490, marginRight: 10 }]}>
              <Text style={[styles.text_chip, { color: COLORS.primary_500 }]}>경영학과</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: COLORS.gray_470_bg, }]}>
              <Text style={styles.text_chip}>19학번</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.text_edit_profile}>프로필 수정</Text>
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
  card_container: {
    flexDirection: 'row'
  },
  card_text_container: {
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  text_container: {
    flexDirection: 'row',
  },
  text_name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text_university: {
    fontSize: 12,
    marginLeft: 7
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 8,
    padding: 5,
    justifyContent: 'center'
  },
  text_chip: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  text_edit_profile: {
    color: COLORS.gray_530
  }
});