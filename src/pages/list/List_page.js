import { Text, Image, View, SafeAreaView, StyleSheet } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { Chip, Design_chip } from '@/components/components';
import owl_logo from '@/assets/img/logo/owl_nav.png'

const List_page = () => {
  return (
    <>
      <View style={{ backgroundColor: COLORS.primary_480, padding: 22 }}>

        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text >22학년도 1학기</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.gray_500} />
            </View>

            <Fontisto
              name="plus-a"
              size={24}
              color={COLORS.gray_520}
              style={{ marginRight: 5, marginTop: 5 }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <View >
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ fontSize: 23 }}>이번 학기는 과제</Text>
                  <Text style={{ fontSize: 23 }}><Text style={{ color: COLORS.primary_500 }}>5개</Text>가 남았어요!</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                <Design_chip
                  title='70% 완료' />
                <Text style={{ color: COLORS.gray_500, fontSize: 13 }}>  총 15개 중</Text>
                <Text style={{ color: COLORS.primary_500, fontSize: 13 }}> 10개 완료</Text>
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
            style={styles.assignment_progress}
          />

        </SafeAreaView>
      </View>



      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 5 }}>
          <Text>경영학개론</Text>
          <Chip
            label="완료" />

        </View>
        <View style={styles.divider} />
      </View>


    </>
  );
}

export default List_page;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_500
  },
  assignment_progress: {
    backgroundColor: COLORS.white,
    height: 11,
    borderRadius: 6,
  },
});