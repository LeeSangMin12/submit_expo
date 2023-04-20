import { View, Text, SafeAreaView, ScrollView } from "react-native";
import COLORS from '@/shared/js/colors';

import User_card from "@/pages/my/user_card/User_card";
import User_log from "@/pages/my/user_log/User_log";
import User_setting from "@/pages/my/user_setting/User_setting";


const My_page = () => {
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <User_card />
            <User_log />
          </View>
          <View style={{ height: 6, backgroundColor: COLORS.gray_480 }} />
          <User_setting />
        </ScrollView>
      </SafeAreaView>
      {/* <User_log />
      <User_setting /> */}
    </View>
  );
}

export default My_page;