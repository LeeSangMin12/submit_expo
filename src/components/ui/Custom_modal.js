import { Modal, StyleSheet, View } from 'react-native';
import COLORS from '@/shared/js/colors';

/**
 * modal 생성
 * @param {obj} modal_visible - modal 표시 여부
 * @param {component} content_component - modal안에 들어갈 component값
 */
const Custom_modal = ({ modal_visible, position, content_component }) => {
  const view_position =
    position === 'center' ? styles.centered_view :
      position === 'bottom' ? styles.bottom_view : null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal_visible}>
      <View style={view_position.container}>
        <View style={view_position.modal}>
          {content_component()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered_view: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modal: {
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
    }
  },
  bottom_view: {
    container: {
      flex: 1,
      height: '27%',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: COLORS.gray_500,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
});

export default Custom_modal;