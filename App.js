import { useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import store from '@/store/store'
import COLORS from '@/shared/js/colors';

import Login_page from '@/pages/login/Login_page';
import Setting_page from '@/pages/setting/Setting_page';
import Home_page from '@/pages/home/Home_page';
import List_page from '@/pages/list/List_page';
import Alarm_page from '@/pages/alarm/Alarm_page';
import Community_page from '@/pages/community/Community_page';
import My_page from '@/pages/my/My_page';

const Stack = createNativeStackNavigator();

const App = () => {
  const [page_count, set_page_count] = useState(1);

  const create_two_button_alert = ({ navigation }) =>
    Alert.alert('회원가입 취소', '홈 화면으로 이동합니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      { text: '확인', onPress: () => navigation.navigate('Login_page') },
    ]);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: COLORS.white
            },
          }}>
          <Stack.Navigator>
            {/* <Stack.Screen name="Login_page" component={Login_page} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen
              name="회원가입"
              options={({ navigation }) => ({
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color="black"
                    onPress={() => {
                      if (page_count === 1) {
                        create_two_button_alert({ navigation });
                      } else {
                        set_page_count(page_count - 1);
                      }
                    }}
                  />)
              })}>
              {() => (
                <Setting_page
                  page_count={page_count}
                  set_page_count={set_page_count}
                />)}
            </Stack.Screen> */}
            <Stack.Screen name="Home_page" component={Home_page} />
            <Stack.Screen name="List_page" component={List_page} />
            <Stack.Screen name="Alarm_page" component={Alarm_page} />
            <Stack.Screen name="Community_page" component={Community_page} />
            <Stack.Screen name="My_page" component={My_page} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});