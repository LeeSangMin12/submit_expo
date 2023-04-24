import { Text, Image, View, SafeAreaView, StyleSheet } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';
import owl_logo from '@/assets/img/logo/owl_nav.png'

const List_page = () => {
  return (
    <>
      <View style={{ backgroundColor: COLORS.primary_490, padding: 20 }}>

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
              color={COLORS.gray_520} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <View >
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ fontSize: 20 }}>이번 학기는 과제</Text>
                  <Text style={{ fontSize: 20 }}>5개가 남았어요!</Text>
                </View>
              </View>
              <Text style={{ paddingVertical: 15 }}>70% 완료 총 15개중 10개 완료</Text>
            </View>

            <View>
              <Image source={owl_logo} />
            </View>
          </View>

          <LinearProgress
            value={0.5}
            color={COLORS.primary_500}
            variant='determine' />

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
  }
});