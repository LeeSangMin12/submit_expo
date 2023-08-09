import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import COLORS from '@/shared/js/colors';
import { Custom_text, Design_chip } from '@/components/components';
import user_profile_sm from '@/assets/img/my/user_card/UserProfile.png';

const User_card = ({
  img_url,
  nickname,
  university,
  department,
  admission_year,
}) => {
  const navigation = useNavigation();

  const modified_addmission_year = String(admission_year).substring(2);  //뒤에 학번만 가져옴
  return (
    <View style={styles.container}>

      <View style={styles.card_container}>
        {img_url === '' ?
          <Image source={user_profile_sm} /> :
          <Image
            source={{ uri: img_url.uri }}
            style={{ width: 56, height: 56, borderRadius: '50' }} />
        }

        <View style={styles.card_text_container}>
          <View style={[styles.text_container, { alignItems: 'center' }]}>
            <Custom_text style={styles.text_name}>{nickname}</Custom_text>
            <Custom_text style={styles.text_university}>{university}</Custom_text>
          </View>
          <View style={styles.text_container}>
            <Design_chip
              title={department}
              container_style={{ marginRight: 5 }} />

            <Design_chip
              title={`${modified_addmission_year}학번`}
              background_color={COLORS.gray_470_bg} />
          </View>

        </View>
      </View>

      <View style={styles.edit_profile_container}>
        <Pressable onPress={() => navigation.navigate('프로필 수정')}>
          <Custom_text style={styles.edit_profile_container.edit_text}>프로필 수정</Custom_text>
        </Pressable>
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
    paddingLeft: 13,
    justifyContent: 'space-between'
  },
  text_container: {
    flexDirection: 'row',
  },
  text_name: {
    fontFamily: 'bold',
    fontSize: 15
  },
  text_university: {
    fontSize: 12,
    paddingLeft: 8
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
    fontFamily: 'bold'
  },
  edit_profile_container: {
    edit_text: {
      color: COLORS.gray_530,
    }
  }
});