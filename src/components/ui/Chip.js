import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../shared/js/colors';

const Chip = ({ label, selected, on_press }) => {
  const backgroundColor = selected ? COLORS.primary_500 : COLORS.gray_470_bg;
  const textColor = selected ? COLORS.white : 'black';

  return (
    <TouchableOpacity
      onPress={on_press}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
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