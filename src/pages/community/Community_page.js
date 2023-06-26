import { View, Text, Image, } from "react-native";
import Toast from 'react-native-toast-message';

import { Button } from '@/components/components';
import owl_left_nav from '@/assets/img/logo/owl_left_nav.png'
import COLORS from "@/shared/js/colors";

const Community_page = () => {

  const show_toast = () => {
    Toast.show({
      type: 'primary_success_toast',
      position: 'bottom',
      text1: '커뮤니티가 신청 되었습니다!',
    });
  }

  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ flex: 2 }}>
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>간호학과 커뮤니티</Text>
          <Text style={{ fontSize: 30 }}>신청 현황</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 45, color: COLORS.primary_500 }}>120</Text>
          <Text style={{ fontSize: 45, }}> / </Text>
          <Text style={{ fontSize: 30 }}>300</Text>
        </View>

        <View style={{ alignItems: 'flex-end', marginVertical: 30 }}>
          <Image
            source={owl_left_nav}
            style={{ width: 160, height: 230, }} />
        </View>
      </View>

      <View style={{ alignItems: 'center', flex: 0.6 }}>
        <Button title='신청하기' style={{ width: '90%', height: 60 }}
          on_press={show_toast} />
      </View>

    </View>
  );
}

export default Community_page;