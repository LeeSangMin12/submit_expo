import { useState, useCallback } from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { go_prev_month, go_next_month, go_today } from '@/store/modules/calendar_slice';
import { Custom_text } from "@/components/components";
import go_today_img from '@/assets/img/logo/go_today.png';
import guide from '@/assets/img/icon/guide.png';

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

      return () => {  //화면에 나갔다 들어올 때마다 progress bar update하기위해 빈값설정
        set_assignment_info({
          remaining_num: '',
          completion_num: '',
        })
      };
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

  return (
    <>
      <View style={styles.header_container}>

        <Pressable style={styles.left_container} onPress={() => navigation.navigate('캘린더 목록')}>

          <Custom_text style={{ fontFamily: 'semi_bold', color: COLORS.primary_500 }}>{default_semester}</Custom_text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.primary_500} />
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.navigate('Guide_page')}>
            <Image
              source={guide}
              style={{ width: 30, height: 30, marginRight: 13 }} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('과제 등록')}>
            <Fontisto
              name="plus-a"
              size={23}
              color={COLORS.gray_520} />
          </Pressable>
        </View>

      </View>

      <View style={styles.remaining_assignment_container}>
        <Custom_text style={styles.text_remaining_assignment}>{nickname}님,</Custom_text>

        <Custom_text style={styles.text_remaining_assignment}>
          <Custom_text style={[styles.text_remaining_assignment]}>이번 학기는 과제</Custom_text>
          <Custom_text style={styles.text_remaining_assignment_num}>{assignment_info.remaining_num}개</Custom_text>
          가 남았어요!
        </Custom_text>
      </View>

      <View style={styles.month_container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable style={{ padding: 5 }} onPress={() => dispatch(go_prev_month())}>
            <Ionicons name="chevron-back" size={19} />
          </Pressable>

          <Custom_text style={styles.text_year}> {year}년</Custom_text>
          <Custom_text style={styles.text_month}> {month}월 </Custom_text>

          <Pressable style={{ padding: 5 }} onPress={() => dispatch(go_next_month())}>
            <Ionicons
              name="chevron-forward"
              size={19} />
          </Pressable>
        </View>

        <Pressable onPress={() => dispatch(go_today())}>
          <Image
            source={go_today_img}
            style={{ width: 48, height: 40 }} />
        </Pressable>

      </View >

      <LinearProgress
        value={assignment_info.completion_num / assignment_list.length}
        color={COLORS.primary_500}
        variant='determine'
        animation={{ duration: 700 }}
        style={styles.assignment_progress} />
    </>
  );
};

export default Assignment_month_info;

const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remaining_assignment_container: {
    paddingTop: 16,
    paddingBottom: 10
  },
  text_remaining_assignment: {
    fontSize: 20,
  },
  text_remaining_assignment_num: {
    fontFamily: 'bold',
    color: COLORS.primary_500
  },
  month_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 13,
    paddingRight: 3,
  },
  text_year: {
    fontSize: 20,
    fontFamily: 'semi_bold'
  },
  text_month: {
    fontSize: 20,
    fontFamily: 'bold',
    color: COLORS.primary_500
  },
  assignment_progress: {
    backgroundColor: COLORS.white,
    height: 11,
    borderRadius: 6,
  },
});