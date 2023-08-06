import { useState, useCallback } from 'react';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { go_prev_month, go_next_month } from '@/store/modules/calendar_slice';
import owl_nav_sm from '@/assets/img/logo/owl_nav_sm.png';

const Assignment_month_info = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { assignment_list } = useSelector((state) => state.assignment);
  const { default_semester } = useSelector((state) => state.semester);
  const { year, month } = useSelector((state) => state.calendar);
  const { nickname } = useSelector((state) => state.user);

  const [assignment_info, set_assignment_info] = useState({
    remaining_num: '',
    completion_num: '',
  });

  useFocusEffect(
    useCallback(() => {
      calculate_assignments();

      return () => (  //화면에 나갔다 들어올 때마다 progress bar update하기위해 빈값설정
        set_assignment_info({
          remaining_num: '',
          completion_num: '',
        })
      );
    }, [assignment_list])
  );

  const calculate_assignments = () => {
    const remaining_assignments_num = assignment_list.filter((val) => {
      if (val.completion_status === 'false') {
        return true;
      }
    });

    set_assignment_info((prev_state) => ({
      ...prev_state,
      remaining_num: remaining_assignments_num.length
    }));

    set_assignment_info((prev_state) => ({
      ...prev_state,
      completion_num: assignment_list.length - remaining_assignments_num.length
    }));
  }

  const get_year_month = () => {
    const formatted_month = String(month).padStart(2, '0');

    return `${year}.${formatted_month}`;
  };

  return (
    <>
      <View style={styles.header_container}>

        <Pressable onPress={() => navigation.navigate('캘린더 목록')}>
          <View style={styles.header_left_container}>
            <Text style={{ color: COLORS.primary_500 }}>{default_semester}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.primary_500} />
          </View>
        </Pressable>

        <Fontisto
          onPress={() => navigation.navigate('과제 등록')}
          name="plus-a"
          size={24}
          color={COLORS.gray_520} />
      </View>

      <View style={styles.content_container}>
        <View>
          <View style={styles.remaining_assignment_container}>
            <Text style={styles.text_remaining_assignment}>{nickname}님</Text>
            <Text style={styles.text_remaining_assignment}>이번 학기는 과제</Text>
            <Text style={styles.text_remaining_assignment}>
              <Text style={styles.text_remaining_assignment_num}>{assignment_info.remaining_num}개</Text>
              가 남았어요!
            </Text>
          </View>

          <View style={styles.now_month_container}>
            <Pressable onPress={() => dispatch(go_prev_month())}>
              <Ionicons
                name="chevron-back"
                size={19} />
            </Pressable>

            <Text style={styles.text_now_month}> {get_year_month()} </Text>

            <Pressable onPress={() => dispatch(go_next_month())}>
              <Ionicons
                name="chevron-forward"
                size={19} />
            </Pressable>

          </View>
        </View>

        <View>
          <Image source={owl_nav_sm} style={styles.img_owl_nav} />
        </View>
      </View >

      <LinearProgress
        value={assignment_info.completion_num / assignment_list.length}
        color={COLORS.primary_500}
        variant='determine'
        style={styles.assignment_progress} />
    </>
  );
};

export default Assignment_month_info;

const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  header_left_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text_semester: {
    color: COLORS.primary_500
  },
  content_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  remaining_assignment_container: {
    paddingVertical: 12
  },
  text_remaining_assignment: {
    fontSize: 23
  },
  text_remaining_assignment_num: {
    color: COLORS.primary_500
  },
  now_month_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  text_now_month: {
    fontSize: 16,
  },
  img_owl_nav: {
    marginRight: 15,
  },
  assignment_progress: {
    backgroundColor: COLORS.white,
    height: 11,
    borderRadius: 6,
  },
});