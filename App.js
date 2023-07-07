import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { Ionicons, Fontisto } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import store from '@/store/store'

import COLORS from '@/shared/js/colors';
import { Design_chip, Chip } from '@/components/components';

import Login_page from '@/pages/login/Login_page';
import Setting_page from '@/pages/setting/Setting_page';
import Home_page from '@/pages/home/Home_page';
import List_page from '@/pages/list/List_page';
import Community_page from '@/pages/community/Community_page';
import My_page from '@/pages/my/My_page';
import Edit_profile from '@/pages/my/user_card/edit_profile/Edit_profile.js'
import Add_assignment from '@/components/set_assignment/Add_assignment.js'
import Submit_assignment from '@/components/set_assignment/Submit_assignment.js'
import Set_semester from '@/components/set_semester/Set_semester.js'
import Add_semester from '@/components/set_semester/Add_semester.js'
import Set_alarm from '@/components/setting/Set_alarm';

import home_inactive from '@/assets/img/bottom_tab/home_inactive.png'
import list_inactive from '@/assets/img/bottom_tab/list_inactive.png'
import community_inactive from '@/assets/img/bottom_tab/community_inactive.png'
import my_inactive from '@/assets/img/bottom_tab/my_inactive.png'
import home_active from '@/assets/img/bottom_tab/home_active.png'
import list_active from '@/assets/img/bottom_tab/list_active.png'
import community_active from '@/assets/img/bottom_tab/community_active.png'
import my_active from '@/assets/img/bottom_tab/my_active.png'

import success_check from '@/assets/img/icon/success_check.png'

const Stack = createNativeStackNavigator();
const Bottom_tab = createBottomTabNavigator();

const Bottom_navigation = () => {
  return (
    <Bottom_tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 80, backgroundColor: COLORS.primary_480 },
        tabBarShowLabel: false,
      }}
    >
      <Bottom_tab.Screen
        name="홈"
        component={Home_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? home_active : home_inactive} />
          ),
        })} />
      <Bottom_tab.Screen
        name="예약전송"
        component={List_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? list_active : list_inactive} />
          ),
        })} />
      <Bottom_tab.Screen
        name="전공 커뮤니티"
        component={Community_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? community_active : community_inactive} />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
        })} />
      <Bottom_tab.Screen
        name="마이"
        component={My_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? my_active : my_inactive} />
          ),
        })} />
    </Bottom_tab.Navigator>
  );
};

const toast_config = {
  primary_success_toast: ({ text1 }) => (
    <View style={styles.primary_success_toast.container}>
      <Image source={success_check} style={styles.primary_success_toast.img_success_check} />
      <Text style={styles.primary_success_toast.text1}>{text1}</Text>
    </View>
  )
};

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
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: COLORS.white
          },
        }}>
        <Stack.Navigator>
          <Stack.Screen name="Login_page" component={Login_page} options={{ headerShown: false }} />
          <Stack.Screen
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
          </Stack.Screen>
          <Stack.Screen name="Bottom_navigation" component={Bottom_navigation} options={{ headerShown: false }} />
          <Stack.Screen
            name="과제 등록"
            component={Add_assignment}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color="black"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />),
              headerRight: () => (
                <Design_chip
                  title='완료'
                  container_style={{
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    borderRadius: 50,
                  }} />)
            })}
          />
          <Stack.Screen
            name="과제 알림 설정"
            component={Set_alarm}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color="black"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />),
              headerRight: () => (
                <Design_chip
                  title='완료'
                  container_style={{
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    borderRadius: 50,
                  }} />)
            })}
          />
          <Stack.Screen
            name="과제 제출"
            component={Submit_assignment}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color="black"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />),
              headerRight: () => (
                <Design_chip
                  title='완료'
                  container_style={{
                    paddingHorizontal: 14,
                    paddingVertical: 9,
                    borderRadius: 50,
                  }} />)
            })}
          />
          <Stack.Screen
            name="프로필 수정"
            component={Edit_profile}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color="black"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />)
            })}
          />
          <Stack.Screen
            name="캘린더 목록"
            component={Set_semester}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color="black"
                  onPress={() => {
                    navigation.goBack();
                  }}
                />),
              headerRight: () => (
                <Fontisto
                  name="plus-a"
                  size={24}
                  color={COLORS.gray_520}
                  onPress={() => {
                    navigation.navigate('시간표 목록')
                  }} />
              )
            })}
          />
          <Stack.Screen
            name="시간표 목록"
            component={Add_semester}
            options={() => ({
              headerTitleAlign: 'center',
              headerStyle: {
                justifyContent: 'center',
                alignItems: 'center'
              },
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toast_config} />
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  img_bottom_tabs: {
    width: 40,
    height: 40,
  },
  primary_success_toast: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      width: '90%',
      backgroundColor: COLORS.black_490,
      borderRadius: 10,
    },
    img_success_check: {
      marginHorizontal: 8
    },
    text1: {
      color: 'white',
      fontSize: 15
    }
  }
});