import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';

import { exec_request } from '@/shared/js/api';
import { set_store_info, kor_iso_string } from '@/shared/js/common_function';
import COLORS from '@/shared/js/colors';
import { Custom_text, Chip } from '@/components/components';

const assignment_status_color_map = {
  ['설정']: COLORS.primary_500,
  ['예약']: COLORS.primary_490,
  ['LMS']: '#FFE1E1',
  ['완료']: COLORS.gray_480
};

const Assignment_list = () => {
  const navigation = useNavigation();
  const { default_semester_id } = useSelector((state) => state.semester);
  const { assignment_list } = useSelector((state) => state.assignment);

  const toggle_checkbox = async (assignment_id, completion_status) => {
    const change_completion_status = await api_assignment_set_completion_status(assignment_id, completion_status);

    if (change_completion_status) {
      const assignment_list = await api_assignment_get_assignment_list();

      set_store_info('assignment', 'assignment_list', assignment_list);
    }
  };

  const open_assignment = async (assignment_id) => {
    const assignment_info = await api_assignment_get_assignment(assignment_id);

    navigation.navigate('과제 수정', {
      assignment_id: assignment_id,
      assignment_info: assignment_info,
    });
  };

  const api_assignment_set_completion_status = async (assignment_id, completion_status) => {
    const params = {
      url: 'assignment/set_completion_status',
      assignment_id: assignment_id,
      completion_status: completion_status === 'false' ? 'true' : 'false',
    }

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  const api_assignment_get_assignment_list = async () => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_get_assignment = async (assignment_id) => {
    const params = {
      url: 'assignment/get_assignment',
      assignment_id: assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_get_submit_email = async (assignment_id) => {
    const params = {
      url: 'assignment/get_submit_email',
      assignment_id: assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const api_assignment_get_submit_lms = async (assignment_id) => {
    const params = {
      url: 'assignment/get_submit_lms',
      assignment_id: assignment_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  };

  const calculate_d_day_assignment = (assignment) => {


    // const today = new Date();

    // const bt_time = today.getTime() - new Date(assignment.registration_date).getTime();
    // const bt_day = Math.abs(bt_time / (1000 * 60 * 60 * 24));

    // console.log('bt_day', bt_day);

    const dateA = new Date('2022/06/01');
    const dateB = new Date('2022/05/01');

    console.log('dateA', dateA);
    console.log('dateB', dateB);
    // const diffMSec = dateA.getTime() - dateB.getTime();
    // const diffDate = diffMSec / (24 * 60 * 60 * 1000);

    return 'hi';
  }

  return (
    <ScrollView>
      {assignment_list.map((assignment, idx) => (
        <View key={idx}>
          <Pressable style={styles.assignment.container} onPress={() => open_assignment(assignment.assignment_id)}>
            <View style={styles.assignment.title_container}>
              <Checkbox
                value={assignment.completion_status === 'false' ? false : true}
                onValueChange={() => toggle_checkbox(assignment.assignment_id, assignment.completion_status)}
                style={styles.assignment.checkbox}
                color={assignment.completion_status === 'false' ? null : COLORS.primary_500}
              />
              <Custom_text
                style={[styles.assignment.checkbox_title, { textDecorationLine: assignment.completion_status === 'false' ? 'none' : 'line-through' }]}
              >
                {assignment.assignment_name}
              </Custom_text>
              <Custom_text style={{ fontSize: 11, paddingBottom: 10, paddingLeft: 7 }}>{calculate_d_day_assignment(assignment)}</Custom_text>
            </View>
            <View >
              <Chip
                label={assignment.status}
                background_color={assignment_status_color_map[assignment.status]}
                on_press={() => open_assignment(assignment.assignment_id)}
              />
            </View>
          </Pressable>
          <View style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
  assignment: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 13,
      paddingHorizontal: 20
    },
    title_container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 28,
      height: 28,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: COLORS.gray_480,
      backgroundColor: '#F4F4F4'
    },
    checkbox_title: {
      fontSize: 16,
      fontFamily: 'medium',
      paddingLeft: 12
    },
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});


