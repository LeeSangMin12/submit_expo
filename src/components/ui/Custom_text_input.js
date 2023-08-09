import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Custom_text_input = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.regular, style]}
      {...props}
    />
  )
};

export default Custom_text_input;

const styles = StyleSheet.create({
  regular: { fontFamily: 'regular' },
});