import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { Design_chip } from '@/components/components';
import owl_logo from '@/assets/img/logo/owl_nav.png'

const Semester_info = () => {
  return (
    <>
      <View style={styles.header_container}>
        <View style={styles.header_left_container}>
          <Text style={{ color: COLORS.primary_500 }}>22학년도 1학기</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.primary_500} />
        </View>

        <Pressable onPress={() => console.log('hi')}>
          <Fontisto
            name="plus-a"
            size={24}
            color={COLORS.gray_520}
            style={styles.icon_plus} />
        </Pressable>
      </View>

      <View style={styles.content_container}>
        <View>
          <View style={styles.remaining_assignment_container}>
            <Text style={styles.text_remaining_assignment}>이번 학기는 과제</Text>
            <Text style={styles.text_remaining_assignment}>
              <Text style={styles.text_remaining_assignment_num}>5개</Text>
              가 남았어요!
            </Text>
          </View>

          <View style={styles.assignment_achivement_container}>
            <Design_chip
              title='70% 완료' />
            <Text style={styles.text_total_assignment}>  총 15개 중</Text>
            <Text style={styles.text_achivement_assignment}> 10개 완료</Text>
          </View>
        </View>

        <View>
          <Image source={owl_logo} />
        </View>
      </View>

      <LinearProgress
        value={0.5}
        color={COLORS.primary_500}
        variant='determine'
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