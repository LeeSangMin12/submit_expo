import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { Design_chip } from '@/components/components';
import owl_logo from '@/assets/img/logo/owl_nav.png'

const Semester_info = () => {
  const navigation = useNavigation();

  const { default_semester } = useSelector((state) => state.semester);
  const { assignment_list } = useSelector((state) => state.assignment);
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
    const remaining_assignments_num = assignment_list.filter((val) =>
      val.completion_status === 'false'
    );

    set_assignment_info({
      remaining_num: remaining_assignments_num.length,
      completion_num: assignment_list.length - remaining_assignments_num.length,
    });
  }

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
          color={COLORS.gray_520}
          style={styles.icon_plus} />
      </View>

      <View style={styles.content_container}>
        <View>
          <View style={styles.remaining_assignment_container}>
            <Text style={styles.text_remaining_assignment}>이번 학기는 과제</Text>
            <Text style={styles.text_remaining_assignment}>
              <Text style={styles.text_remaining_assignment_num}>{assignment_info.remaining_num}개</Text>
              가 남았어요!
            </Text>
          </View>

          <View style={styles.assignment_achivement_container}>
            <Design_chip
              title={`${assignment_list.length === 0 ? 0 : Math.floor(assignment_info.completion_num / assignment_list.length * 100)}% 완료`} />
            <Text style={styles.text_total_assignment}>  총 {assignment_list.length}개 중</Text>
            <Text style={styles.text_achivement_assignment}> {assignment_info.completion_num}개 완료 </Text>
          </View>
        </View>

        <View>
          <Image source={owl_logo} />
        </View>
      </View>

      <LinearProgress
        key={assignment_list.length}
        value={assignment_info.completion_num / assignment_list.length}
        color={COLORS.primary_500}
        variant='determine'
        animation={{ duration: 700 }}
        style={styles.assignment_progress} />
    </>
  );
}

export default Semester_info;

const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header_left_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon_plus: {
    marginRight: 5,
    marginTop: 5
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
  assignment_achivement_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  text_total_assignment: {
    color: COLORS.gray_500,
    fontSize: 13
  },
  text_achivement_assignment: {
    color: COLORS.primary_500,
    fontSize: 13
  },
  assignment_progress: {
    backgroundColor: COLORS.white,
    height: 11,
    borderRadius: 6,
  },
});