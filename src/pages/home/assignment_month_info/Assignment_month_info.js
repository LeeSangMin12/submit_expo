import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import owl_nav_sm from '@/assets/img/logo/owl_nav_sm.png';

const Assignment_month_info = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header_container}>

        <Pressable onPress={() => navigation.navigate('캘린더 목록')}>
          <View style={styles.header_left_container}>
            <Text style={{ color: COLORS.primary_500 }}>22학년도 1학기</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.primary_500} />
          </View>
        </Pressable>


      </View>

      <View style={styles.content_container}>
        <View>
          <View style={styles.remaining_assignment_container}>
            <Text style={styles.text_remaining_assignment}>김써밋님</Text>
            <Text style={styles.text_remaining_assignment}>3월 과제중
              <Text style={styles.text_remaining_assignment_num}> 2개</Text>
              가 남았어요!
            </Text>
          </View>

          <View style={styles.now_month_container}>
            <Text style={styles.text_now_month}> 2023 03 </Text>
          </View>
        </View>

        <View>
          <Image source={owl_nav_sm} style={styles.img_owl_nav} />
        </View>
      </View>

      <LinearProgress
        value={0.5}
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
    paddingVertical: 15
  },
  text_now_month: {
    fontSize: 16
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