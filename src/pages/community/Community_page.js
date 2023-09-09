import { useEffect, useState } from "react";
import { View, Image, } from "react-native";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { show_toast, set_store_info } from '@/shared/js/common_function';
import { exec_request } from "@/shared/js/api";
import { Custom_text, Button } from '@/components/components';
import COLORS from "@/shared/js/colors";
import owl_left_nav from '@/assets/img/logo/owl_left_nav.png'

const Community_page = () => {
  const navigation = useNavigation();
  const {
    department,
  } = useSelector((state) => state.user);

  const [application_num, set_application_num] = useState(0);

  useEffect(() => {
    const fetch_data = async () => {
      const user_data = await api_user_get_info();
      const community_info = await api_community_get_community(user_data.department);

      set_user_info(user_data);
      set_application_num(community_info.application_num);
    };
    fetch_data();
  }, []);

  /**
   * 커뮤니티 신청
   */
  const community_apply = async () => {
    await api_community_apply_community();
    const community_info = await api_community_get_community(department);

    set_application_num(community_info.application_num);
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
   * 커뮤니티 신청 현황을 가져와준다. 
   */
  const api_community_get_community = async (department) => {
    const params = {
      url: 'community/get_community',
      department: department
    }

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  }

  /**
   * 현재 학과의 커뮤니티를 신청해준다.
   */
  const api_community_apply_community = async () => {
    const params = {
      url: 'community/apply_community',
      department: department
    }

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      show_toast('커뮤니티가 신청 되었습니다!')
    } else if (result.status === 'already_applied') {
      show_toast('이미 신청하셨습니다.')
    }
  }

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ flex: 2 }}>
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Custom_text style={{ fontSize: 30 }}>{department} 커뮤니티</Custom_text>
          <Custom_text style={{ fontSize: 30 }}>신청 현황</Custom_text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
          <Custom_text style={{ fontSize: 45, color: COLORS.primary_500 }}>{application_num}</Custom_text>
          <Custom_text style={{ fontSize: 45, }}> / </Custom_text>
          <Custom_text style={{ fontSize: 30, }}>300</Custom_text>
        </View>

        <View style={{ alignItems: 'flex-end', marginVertical: 30 }}>
          <Image
            source={owl_left_nav}
            style={{ width: 350, height: 230, }} />

        </View>
      </View>

      <View style={{ alignItems: 'center', flex: 0.6 }}>
        <Button title='신청하기' style={{ width: '90%', height: 60 }}
          on_press={community_apply} />
      </View>

    </View>
  );
}

export default Community_page;