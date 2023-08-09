import { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { exec_request } from '@/shared/js/api';
import { set_store_info } from '@/shared/js/common_function';
import COLORS from '@/shared/js/colors';
import Semester_info from '@/pages/list/assignment_info/Semester_info';
import Assignment_list from '@/pages/list/assignment_list/Assignment_list';

const List_page = () => {
  const navigation = useNavigation();
  const {
    default_semester_id,
  } = useSelector((state) => state.semester);

  useFocusEffect(
    useCallback(() => {
      const fetch_data = async () => {
        const assignment_list = await api_assignment_get_assignment_list(default_semester_id);

        set_store_info('assignment', 'assignment_list', assignment_list);
      };

      fetch_data();
    }, [])
  );

  const api_assignment_get_assignment_list = async (default_semester_id) => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  return (
    <>
      <View style={styles.semester_info_container}>
        <SafeAreaView>
          <Semester_info />
        </SafeAreaView>
      </View>
      <Assignment_list />
    </>
  );
}

export default List_page;

const styles = StyleSheet.create({
  semester_info_container: {
    backgroundColor: COLORS.primary_480,
    padding: 22
  },
});