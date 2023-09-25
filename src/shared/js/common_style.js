import { StyleSheet } from 'react-native';
import COLORS from '@/shared/js/colors';

export default StyleSheet.create({
  icon: {
    chevron_back: {
      width: 32,
      height: 32,
    }
  },
  header_options: (title) => ({
    title,
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'medium'
    },
  }),
  assignment_header_options: (title, background_color) => ({
    title,
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'medium'
    },
    headerStyle: {
      backgroundColor: background_color,
    },
    headerTintColor: COLORS.white,
  })
});