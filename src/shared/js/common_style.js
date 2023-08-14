import { StyleSheet } from 'react-native';
import COLORS from '@/shared/js/colors';

export default StyleSheet.create({
  icon: {
    chevron_back: {
      width: 32,
      height: 32,
    }
  },
  assignment_header_options: (title) => ({
    title,
    headerStyle: {
      backgroundColor: COLORS.primary_500,
    },
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'medium'
    },
    headerTintColor: COLORS.white,
  })
});