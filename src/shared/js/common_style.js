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
  assignment_header_options: (title) => ({
    title,
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'medium'
    },
    headerStyle: {
      backgroundColor: COLORS.primary_500,
    },
    headerTintColor: COLORS.white,
  })
});