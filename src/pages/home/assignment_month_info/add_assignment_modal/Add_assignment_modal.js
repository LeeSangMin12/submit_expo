import { Image, View, StyleSheet, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Custom_text } from "@/components/components";
import calendar from '@/assets/img/icon/calendar.png';
import checkbox from '@/assets/img/icon/checkbox.png';

const Add_assignment_modal = ({ is_visialbe, set_visible }) => {
  const navigation = useNavigation();

  /**
   * 과제 추가 페이지 이동
   */
  const go_add_schedule = () => {
    set_visible(false);
    navigation.navigate('과제 등록');
  }

  /**
   * 과제 찾기 페이지 이동
   */
  const go_search_assignment = () => {
    set_visible(false);
    navigation.navigate('과제 찾기');
  }

  return (
    <Modal visible={is_visialbe} transparent={true} animationType='fade'>
      <Pressable style={styles.overlay} onPress={() => set_visible(false)} />

      <View style={styles.modal_container}>
        <View style={[styles.fab_container, { marginBottom: 13 }]}>
          <Custom_text style={styles.fab_text}>일정</Custom_text>

          <Pressable onPress={go_add_schedule}>
            <Image
              source={calendar}
              style={styles.fab_icon} />
          </Pressable>
        </View>

        <View style={styles.fab_container}>
          <Custom_text style={styles.fab_text}>과제 찾기</Custom_text>

          <Pressable onPress={go_search_assignment}>
            <Image
              source={checkbox}
              style={styles.fab_icon} />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
  },
  modal_container: {
    position: 'absolute',
    right: 20,
    top: 50
  },
  fab_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  fab_text: {
    fontFamily: 'bold',
    fontSize: 13,
    marginRight: 13
  },
  fab_icon: {
    width: 48,
    height: 48
  }
});

export default Add_assignment_modal;