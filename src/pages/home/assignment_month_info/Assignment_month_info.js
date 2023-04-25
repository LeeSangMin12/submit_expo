import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import owl_nav_sm from '@/assets/img/logo/owl_nav_sm.png'

const Assignment_month_info = () => {
  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: COLORS.primary_500 }}>2023년 1학기</Text>
        </View>

        <Pressable onPress={() => console.log('hi')}>
          <Ionicons
            name="list"
            size={33}
            color="black" />
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View>
          <View >
            <View style={{ paddingVertical: 12 }}>
              <Text style={{ fontSize: 23 }}>김써밋님</Text>
              <Text style={{ fontSize: 23 }}>3월 과제중
                <Text style={{ color: COLORS.primary_500 }}> 2개</Text>
                가 남았어요!
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
            <Text style={{ fontSize: 16 }}> 2023 03 </Text>
          </View>
        </View>

        <View>
          <Image source={owl_nav_sm} style={{ marginRight: 15, }} />
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
  assignment_progress: {
    backgroundColor: COLORS.white,
    height: 11,
    borderRadius: 6,
  },
});