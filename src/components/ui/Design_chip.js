import { View, Text, StyleSheet, } from "react-native";
import COLORS from '@/shared/js/colors';

const text_color_map = {
  [COLORS.primary_490]: COLORS.primary_500,
  [COLORS.gray_470_bg]: COLORS.gray_500
};

/**
 * 누를수 없는 design chip 생성
 * : 배경색에 따라 text color 자동 생성
 * @param {str} title - chip 이름
 * @param {str} background_color - chip background color 
 * @param {obj} style - 추가로 적용할 스타일
 */
const Design_chip = ({
  title = '',
  background_color = COLORS.primary_490,
  container_style = {},
}) => {

  const text_color = text_color_map[background_color] || 'black';

  return (
    <View style={[
      styles.chip,
      { backgroundColor: background_color },
      container_style]}>
      <Text style={[styles.text_chip, { color: text_color }]}>{title}</Text>
    </View>
  );
};

export default Design_chip;

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 8,
    padding: 5,
    justifyContent: 'center'
  },
  text_chip: {
    fontSize: 12,
    color: COLORS.gray_500,
    fontWeight: 'bold',
  },
});