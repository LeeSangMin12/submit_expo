import { Text, View, StyleSheet } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Chip } from '@/components/components';

const Assignment_list = () => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 5 }}>
        <Text>경영학개론</Text>
        <Chip
          label="완료"
          background_color={COLORS.gray_470_bg} />
      </View>
      <View style={styles.divider} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 5 }}>
        <Text>네트워크 </Text>
        <Chip
          label="설정"
          background_color={COLORS.primary_500} />
      </View>
      <View style={styles.divider} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 5 }}>
        <Text>간호 심리학 </Text>
        <Chip
          label="예정"
          background_color={COLORS.primary_490} />
      </View>
      <View style={styles.divider} />
    </View>
  );
}

export default Assignment_list;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.gray_500
  },
});