import { View, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

import { exec_request } from "@/shared/js/api";
import { set_store_info } from '@/shared/js/common_function';
import User_card from "@/pages/my/user_card/User_card";
import User_setting from "@/pages/my/user_setting/User_setting";
import adsense_png from '@/assets/img/my/adsense.png'

const My_page = () => {
  const navigation = useNavigation();
  const {
    img_url,
    nickname,
    university,
    department,
    admission_year,
  } = useSelector((state) => state.user);

  useEffect(() => {
    const fetch_data = async () => {
      const user_data = await api_user_get_info();

      set_user_info(user_data);
    };
    fetch_data();
  }, []);

  /**
   * redux안에 유저 정보를 넣어준다.
   */
  const set_user_info = (user_data) => {
    set_store_info('user', 'name', user_data.name);
    set_store_info('user', 'admission_year', user_data.admission_year);
    set_store_info('user', 'department', user_data.department);
    set_store_info('user', 'nickname', user_data.nickname);
    set_store_info('user', 'university', user_data.university);
    set_store_info('user', 'img_url', user_data.img_url);
  };

  /**
   * 유저 정보 가져옴
   */
  const api_user_get_info = async () => {
    const params = {
      url: 'user/get_info',
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.user_info_container}>
          <User_card
            img_url={img_url}
            nickname={nickname}
            university={university}
            department={department}
            admission_year={admission_year}
          />
        </View>
        {/* <Image source={adsense_png} style={{ width: '100%', height: 82 }} /> */}
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
    paddingTop: 14.81,
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 13
  },
});