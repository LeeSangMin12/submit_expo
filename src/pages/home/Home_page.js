import { useEffect, } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { set_store_info } from '@/shared/js/common_function';
import { exec_request } from "@/shared/js/api";
import { Calendar } from '@/components/components.js'
import COLORS from '@/shared/js/colors';
import Assignment_month_info from "@/pages/home/assignment_month_info/Assignment_month_info.js";

const Home_page = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetch_data = async () => {
      const user_data = await api_user_get_info();
      const semesters = await api_semester_get_semester_list();
      const default_semester = semesters.find(item => item.default_semester === 'true');

      const assignment_list = await api_assignment_get_assignment_list(default_semester.semester_id);

      const now_month = new Date().getMonth() + 1;

      set_store_info('user', 'user_email', user_data.user_email);
      set_store_info('user', 'nickname', user_data.nickname);
      set_store_info('user', 'university', user_data.university);
      set_store_info('semester', 'default_semester', default_semester.semester);
      set_store_info('semester', 'default_semester_id', default_semester.semester_id);
      set_store_info('calendar', 'year', parseInt(default_semester.semester.split(' ')[0].replace('년', '')));
      set_store_info('calendar', 'month', now_month);
      set_store_info('assignment', 'assignment_list', assignment_list);
    };
    fetch_data();
  }, []);


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
   * 캘린더 리스트를 조회해온다.
   */
  const api_semester_get_semester_list = async () => {
    const params = {
      url: 'semester/get_semester_list'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data.semester_list;
    }
  };

  const api_assignment_get_assignment_list = async (default_semester_id) => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    }

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  return (
    < >
      <View style={styles.assignment_month_info_container}>
        <SafeAreaView>
          <Assignment_month_info />
        </SafeAreaView>
      </View>

      <Calendar />
    </>
  );
}

export default Home_page;

const styles = StyleSheet.create({
  assignment_month_info_container: {
    backgroundColor: COLORS.primary_480,
    paddingHorizontal: 20,
    paddingBottom: 14
  }
});