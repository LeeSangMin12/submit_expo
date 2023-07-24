import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';

import { exec_request } from '@/shared/js/api';
import { set_store_info } from '@/shared/js/common';
import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';

const assignment_status_color_map = {
  ['예정']: COLORS.primary_490,
  ['설정']: COLORS.primary_500,
  ['LMS']: '#FF5454',
  ['완료']: '#FF5454'
};

const Assignment_list = () => {
  const navigation = useNavigation();
  const {
    default_semester_id,
  } = useSelector((state) => state.semester);
  const { assignment_list } = useSelector((state) => state.assignment);

  const toggle_checkbox = async (assignment_id, completion_status) => {
    const change_completion_status = api_assignment_set_completion_status(assignment_id, completion_status);

    if (change_completion_status) {
      const assignment_list = await api_assignment_get_assignment_list();

      set_store_info('assignment', 'assignment_list', assignment_list);
    }
  };

  const open_assignment = async (assignment_id) => {
    const assignment_info = await api_assignment_get_assignment(assignment_id);

    navigation.navigate('과제 수정', {
      assignment_id: assignment_id,
      assignment_info: assignment_info
    });
  };

  const open_submit_assignment = async (assignment_id, assignment_status) => {
    if (assignment_status === '예정') {  //과제 예약 처음 등록할때
      navigation.navigate('과제 제출', {
        assignment_id: assignment_id
      });
    } else {
      navigation.navigate('과제 제출 수정', {
        assignment_id: assignment_id,
        assignment_status: assignment_status
      });
    }
  }

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

  return (
    <>
      {assignment_list.map((assignment, idx) => (
        <View key={idx}>
          <View style={styles.assignment.container}>
            <View style={styles.assignment.title_container}>
              <Checkbox
                value={assignment.completion_status === 'false' ? false : true}
                onValueChange={() => toggle_checkbox(assignment.assignment_id, assignment.completion_status)}
                style={{ width: 25, height: 25 }}
              />
              <Text
                style={[styles.assignment.checkbox, { textDecorationLine: assignment.completion_status === 'false' ? 'none' : 'line-through' }]}
                onPress={() => open_assignment(assignment.assignment_id)}
              >
                {assignment.title}
              </Text>
            </View>
            <View style={styles.assignment.chip_container}>
              <Chip
                label={assignment.status}
                on_press={() => open_submit_assignment(assignment.assignment_id, assignment.status)}
                background_color={assignment_status_color_map[assignment.status]} />
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      ))}
    </>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
  assignment: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2
    },
    title_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      paddingVertical: 15
    },
    checkbox: {
      fontSize: 16,
      paddingLeft: 10
    },
    chip_container: {
      marginRight: 15
    }
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_490_inactive
  },
});


