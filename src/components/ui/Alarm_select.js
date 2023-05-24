import { Text, View, StyleSheet, Pressable, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import COLORS from '@/shared/js/colors';

/**
 * 알림 설정 ui
 * @param {obj} container_style -  container style
 */
const Alarm_select = ({
  container_style
}) => {
  const navigation = useNavigation();

  const open_alarm_set = () => {
    navigation.navigate('과제 알림 설정');
  };

  return (
    <>
      <Pressable style={[styles.container, container_style]} onPress={open_alarm_set}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name="alarm-outline"
            size={24}
            color={COLORS.gray_500} />

          <Text style={styles.title}>알림 추가</Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color={COLORS.gray_500} />
      </Pressable>
    </>
  );
}

export default Alarm_select;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.gray_500,
    marginLeft: 7,
    maxWidth: '80%',
  }
});