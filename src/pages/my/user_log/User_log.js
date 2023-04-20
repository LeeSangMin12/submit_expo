import { View, Text } from "react-native";
import COLORS from '@/shared/js/colors';

const User_log = () => {
  return (
    <>
      <View style={{ height: 80, flexDirection: 'row', marginTop: 20, backgroundColor: COLORS.gray_470_bg, borderWidth: 1, borderColor: COLORS.gray_480, borderRadius: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: COLORS.gray_480, borderRightWidth: 1, padding: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}> 12</Text>
          <Text> 최근 본</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: COLORS.gray_480, borderRightWidth: 1, padding: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}> 12</Text>
          <Text> 내가 쓴 글</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: COLORS.gray_480, borderRightWidth: 1, padding: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}> 12</Text>
          <Text> 내가 쓴 댓글</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightColor: COLORS.gray_480, borderRightWidth: 1, padding: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}> 12</Text>
          <Text> 좋아요</Text>
        </View>
      </View >
    </>
  );
};

export default User_log;