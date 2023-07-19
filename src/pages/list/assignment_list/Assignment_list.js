import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CheckBox } from '@rneui/themed';

import { exec_request } from '@/shared/js/api';
import { set_store_info } from '@/shared/js/common';
import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';

const assignment_status_color_map = {
  ['예정']: COLORS.primary_490,
  ['설정']: COLORS.primary_500,
  ['LMS']: '#FF5454',
  ['완료']: '#FF5454'
}

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
  }

  const api_assignment_get_assignment_list = async () => {
    const params = {
      url: 'assignment/get_assignment_list',
      semester_id: default_semester_id
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return result.data;
    }
  }

  return (
    <>
      {assignment_list.map((assignment, idx) => (
        <View key={idx}>
          <View style={styles.assignment.container}>
            <View style={styles.assignment.title_container}>
              <CheckBox
                title={assignment.title}
                checked={assignment.completion_status === 'false' ? false : true}
                onPress={() => toggle_checkbox(assignment.assignment_id, assignment.completion_status)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                size={34}
                textStyle={[styles.assignment.checkbox, { textDecorationLine: assignment.completion_status === 'false' ? 'none' : 'line-through' }]}
                checkedColor={COLORS.primary_500}
              />
            </View>
            <View style={styles.assignment.chip_container}>
              <Chip
                label={assignment.status}
                background_color={assignment_status_color_map[assignment.status]} />
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      ))}



      {/* <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={34}
            title='네크워크'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="설정"
            on_press={() => navigation.navigate('과제 제출')}
            background_color={COLORS.primary_500} />
        </View>
      </View>
      <View style={styles.divider} />

      <View style={styles.assignment.container}>
        <View style={styles.assignment.title_container}>
          <CheckBox
            checked={checked}
            onPress={toggle_checkbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={'checkbox-blank-outline'}
            size={34}
            title='간호 심리학'
            textStyle={[styles.assignment.checkbox, { textDecorationLine: checked ? 'line-through' : 'none' }]}
            checkedColor={COLORS.primary_500}
          />
        </View>
        <View style={styles.assignment.chip_container}>
          <Chip
            label="예정"
            background_color={COLORS.primary_490} />
        </View>
      </View>
      <View style={styles.divider} /> */}

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
      flexDirection: 'row'
    },
    checkbox: {
      fontSize: 16,
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


