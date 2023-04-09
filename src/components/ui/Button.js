import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../shared/js/colors';

const Button = ({ title, on_press, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={on_press}>
    <Text style={styles.button_text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary_500,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, // 높이를 50으로 지정
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;