import { useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";

import COLORS from '@/shared/js/colors';
import Assignment_month_info from "@/pages/home/assignment_month_info/Assignment_month_info.js";
import { Calendar } from '@/components/components.js'

const Home_page = () => {

  useEffect(() => {
  }, []);

  return (
    < >
      <View style={styles.assignment_month_info_container}>
        <SafeAreaView>
          <Assignment_month_info />
        </SafeAreaView>
      </View>

      <Calendar />
    </>
  );
}

export default Home_page;

const styles = StyleSheet.create({
  assignment_month_info_container: {
    backgroundColor: COLORS.primary_480,
    padding: 22
  }
});