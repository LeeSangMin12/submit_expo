import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Custom_text = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.regular, style]} {...props} >
      {children}
    </Text>
  );
};

export default Custom_text;

const styles = StyleSheet.create({
  regular: { fontFamily: 'regular', },
});