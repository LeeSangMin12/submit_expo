import { View, Text } from "react-native";

import COLORS from '@/shared/js/colors';

const User_setting = () => {
  return (
    <>
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>공지사항</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>이벤트</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>이용약관</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>운영정책</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>자주 묻는 질문</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>개인정보 처리방침</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
      <View style={{ padding: 25, justifyContent: 'center', }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>로그아웃</Text>

      </View>
      <View style={{ height: 1, backgroundColor: COLORS.gray_480 }} />
    </>
  );
};

export default User_setting;