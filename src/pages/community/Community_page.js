import { useEffect } from "react";
import { View, Text, Image, } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { set_store_info } from '@/shared/js/common';
import { exec_request, check_exp_token } from "@/shared/js/api";
import { Button } from '@/components/components';
import owl_left_nav from '@/assets/img/logo/owl_left_nav.png'
import COLORS from "@/shared/js/colors";

const Community_page = () => {
  const navigation = useNavigation();
  const {
    department,
  } = useSelector((state) => state.user);


  useEffect(() => {
    const fetch_data = async () => {
      const user_data = await api_user_get_info();

      set_user_info(user_data);
    };
    fetch_data();
  }, []);

  /**
   * toast를 보여준다.
   */
  const show_toast = () => {
    Toast.show({
      type: 'primary_success_toast',
      position: 'bottom',
      text1: '커뮤니티가 신청 되었습니다!',
    });
  }

  /**
   * redux안에 유저 정보를 넣어준다.
   */
  const set_user_info = (user_data) => {
    set_store_info('user', 'department', user_data.department);
  }

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

  /**
   * 현재 학과의 커뮤니티를 신청해준다.
   */
  const api_community_apply_community = async () => {
    const params = {
      url: 'community/apply_community',
      department: department
    }

    const result = await exec_request(params, navigation);
  }

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ flex: 2 }}>
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>{department} 커뮤니티</Text>
          <Text style={{ fontSize: 30 }}>신청 현황</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 45, color: COLORS.primary_500 }}>0</Text>
          <Text style={{ fontSize: 45, }}> / </Text>
          <Text style={{ fontSize: 30 }}>300</Text>
        </View>

        <View style={{ alignItems: 'flex-end', marginVertical: 30 }}>
          <Image
            source={owl_left_nav}
            style={{ width: 160, height: 230, }} />

        </View>
      </View>

      <View style={{ alignItems: 'center', flex: 0.6 }}>
        <Button title='신청하기' style={{ width: '90%', height: 60 }}
          on_press={api_community_apply_community} />
      </View>

    </View>
  );
}

export default Community_page;