import { View, SafeAreaView, StyleSheet, } from 'react-native';

import COLORS from '@/shared/js/colors';
import Semester_info from '@/pages/list/assignment_info/Semester_info';
import Assignment_list from '@/pages/list/assignment_list/Assignment_list';

const List_page = () => {
  return (
    <>
      <View style={styles.semester_info_container}>
        <SafeAreaView>
          <Semester_info />
        </SafeAreaView>
      </View>
      <Assignment_list />
    </>
  );
}

export default List_page;

const styles = StyleSheet.create({
  semester_info_container: {
    backgroundColor: COLORS.primary_480,
    padding: 22
  },
});