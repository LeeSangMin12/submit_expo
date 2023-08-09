import { StyleSheet, Pressable } from "react-native";
import COLORS from '@/shared/js/colors';

import Custom_text from '@/components/ui/Custom_text.js';

const text_color_map = {
  [COLORS.primary_500]: COLORS.white,
  [COLORS.primary_490]: COLORS.primary_500,
  [COLORS.gray_470_bg]: COLORS.gray_500,
  ['#FF5454']: COLORS.white,
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
  title_style = {},
  on_press
}) => {

  const text_color = text_color_map[background_color] || 'black';

  return (
    <Pressable style={[
      styles.chip,
      { backgroundColor: background_color },
      container_style]}
      onPress={on_press}
    >
      <Custom_text
        numberOfLines={1}
        style={[styles.text_chip, { color: text_color }, title_style]}>
        {title}
      </Custom_text>
    </Pressable>
  );
};

export default Design_chip;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 5
  },
  text_chip: {
    fontSize: 10,
    color: COLORS.gray_520,
  },
});