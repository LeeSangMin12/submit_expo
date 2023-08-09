import { TouchableOpacity, StyleSheet } from 'react-native';

import COLORS from '../../shared/js/colors';
import Custom_text from '@/components/ui/Custom_text.js';

const Button = ({ title, on_press, style, disabled }) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled && styles.button_disabled, // disabled일 때 버튼 스타일 적용
      style,
    ]}
    onPress={on_press}
    disabled={disabled} // disabled 설정
  >
    <Custom_text style={[styles.button_text, disabled]}>
      {title}
    </Custom_text>
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
    height: 50,
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'bold',
  },
  button_disabled: { // disabled일 때의 버튼 스타일
    backgroundColor: COLORS.gray_480,
  },
});

export default Button;