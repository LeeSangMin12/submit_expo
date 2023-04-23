import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/components';

/**
 * modal 생성
 * @param {string} title - modal 제목
 * @param {obj} control_modal - modal 컨트롤 변수
 * @param {obj} btn_1 - 첫번째 button값
 * @param {obj} btn_2 - 2번째 button 값
 */
const Custom_modal = ({ title, control_modal, btn_1, btn_2 }) => {

  return (
    <View style={styles.centered_view}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={control_modal.modal_visible}
      >
        <View style={styles.centered_view}>
          <View style={styles.modal_view}>
            <Text style={styles.modal_text}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title={btn_1.title}
                on_press={btn_1.on_press}
                style={styles.btn1} />
              <Button
                title={btn_2.title}
                on_press={btn_2.on_press}
                style={styles.btn2} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal_view: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_text: {
    marginBottom: 15,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn1: {
    margin: 10,
    height: 40,
    backgroundColor: 'gray'
  },
  btn2: {
    margin: 10,
    height: 40
  }
});

export default Custom_modal;