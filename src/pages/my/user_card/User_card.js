import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

import COLORS from '@/shared/js/colors';
import { Design_chip } from '@/components/components';
import user_profile_sm from '@/assets/img/my/user_card/user_profile_sm.png';

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
          <Image source={user_profile_sm} />
        }

        <View style={styles.card_text_container}>
          <View style={[styles.text_container, { alignItems: 'center' }]}>
            <Text style={styles.text_name}>{nickname}</Text>
            <Text style={styles.text_university}>{university}</Text>
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

      <View>
        <Pressable onPress={() => navigation.navigate('프로필 수정')}>
          <Text style={styles.text_edit_profile}>프로필 수정</Text>
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