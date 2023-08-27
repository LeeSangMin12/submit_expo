import { View, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { exec_request } from '@/shared/js/api';
import { Button, Custom_text } from '@/components/components';


const Withdrawal_page = ({ navigation }) => {
  const { nickname } = useSelector((state) => state.user);

  const render_info_row = (content) => (
    <View style={styles.row}>
      <Custom_text>{'\u2022'}</Custom_text>
      <Custom_text style={styles.row_text}>{content}</Custom_text>
    </View>
  );

  const withdrawal_account = () => {
    Alert.alert('정말 삭제하시겠습니까?', '삭제후 되돌릴 수 없습니다.', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제', onPress: async () => {
          const withdrawl_account = await api_user_withdrawl_account();
          if (withdrawl_account) {
            navigation.navigate('Login_page');
            Alert.alert('계정이 정상적으로 탈퇴되었습니다.');
          }
        }
      }
    ]);
  };

  const api_user_withdrawl_account = async () => {
    const params = {
      url: 'user/withdrawl_account'
    };

    const result = await exec_request(params, navigation);

    if (result.status === 'ok') {
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        <View style={styles.warning_container}>
          <Custom_text style={styles.warning_text}>{nickname}님,잠시만요!</Custom_text>
          <Custom_text style={styles.warning_text}>탈퇴하기 전에 한번 더 확인해주세요!</Custom_text>
          <Custom_text style={styles.warning_text}>계정을 삭제하면</Custom_text>
        </View>

        <View>
          {render_info_row(`${nickname}님의 과제데이터가 모두 사라지고 복구되지 않아요!`)}
          {render_info_row('현재 계정으로 다시는 로그인 할 수 없어요')}
          {render_info_row('탈퇴 후 7일 간 재가입을 할 수 없어요')}
        </View>
      </View>

      <View style={styles.bottom_container}>
        <View style={styles.delete_info_container}>
          <Custom_text style={styles.bold_text}>아래의 계정 삭제 버튼을 누르면</Custom_text>
          <Custom_text style={[styles.bold_text, styles.red_text]}>{nickname}님의 데이터가 영구히 삭제됩니다.</Custom_text>
        </View>

        <Button
          title="계정 삭제"
          style={styles.withdrawal_button}
          on_press={withdrawal_account}
        />
      </View>
    </View>
  );
};

export default Withdrawal_page;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  content_container: {
    flex: 1,
  },
  warning_container: {
    paddingTop: 25,
    paddingBottom: 40
  },
  warning_text: {
    fontSize: 18,
    fontFamily: 'semi_bold',
  },
  row: {
    flexDirection: 'row',
  },
  row_text: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 5,
    paddingBottom: 15,
  },
  bottom_container: {
    paddingVertical: 30,
  },
  delete_info_container: {
    paddingBottom: 10,
  },
  bold_text: {
    fontSize: 15,
    fontFamily: 'bold',
  },
  red_text: {
    color: '#FF0000',
  },
  withdrawal_button: {
    height: 56,
    backgroundColor: '#FF0000'
  }
});