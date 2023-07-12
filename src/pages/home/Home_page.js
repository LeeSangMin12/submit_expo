import { useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { set_store_info } from '@/shared/js/common';
import { exec_request } from "@/shared/js/api";
import COLORS from '@/shared/js/colors';
import Assignment_month_info from "@/pages/home/assignment_month_info/Assignment_month_info.js";
import { Calendar } from '@/components/components.js'

const Home_page = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetch_data = async () => {
      const semesters = await api_semester_get_semester();
      const default_semester = semesters.find(item => item.default_semester === 'true');

      set_store_info('semester', 'semester', default_semester.semester);
      set_store_info('semester', 'semester_id', default_semester.semester_id);
    };
    fetch_data();
  }, []);

  /**
   * 시간표 리스트를 조회해온다.
   */
  const api_semester_get_semester = async () => {
    const params = {
      url: 'semester/get_semester'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data.selected_semesters;
    }
  }

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
    padding: 22
  }
});