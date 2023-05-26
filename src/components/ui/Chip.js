import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import COLORS from '../../shared/js/colors';

const label_color_map = {
  [COLORS.primary_500]: COLORS.white,
  [COLORS.primary_490]: COLORS.primary_500,
  [COLORS.gray_470_bg]: COLORS.black_500,
};

/**
 * chip 생성
 * : 선택할 수 있는 칩만 selected_background_color를 추가해야함
 * : (선택할 수 없이 칩 디자인 만 하는 경우)
 * 필수@param {str} label - chip 이름
 * 선택@param {boolean} selected - chip 선택 여부
 * 선택@param {str} background_color -chip 배경색
 * 선택@param {str} selected_background_color - chip 선택시 배경색
 * 선택@param {function} on_press - press시 동작할 이벤트
 */
const Chip = ({
  label = '',
  selected = false,
  background_color = COLORS.white,
  selected_background_color = COLORS.primary_500,
  container_style = {},
  on_press }) => {

  const chip_style = [
    styles.container,
    { backgroundColor: selected ? selected_background_color : background_color }
  ];
  const label_style = [
    styles.label,
    {
      color: selected ?
        label_color_map[selected_background_color] :
        label_color_map[background_color]
    }
  ];

  return (
    <TouchableOpacity
      onPress={on_press}
      style={[chip_style, container_style]}
    >
      <Text style={label_style}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Chip;