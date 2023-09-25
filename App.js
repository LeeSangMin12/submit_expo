import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar, Alert, Pressable } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import { Ionicons, Fontisto } from '@expo/vector-icons'
import * as Font from "expo-font";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import store from '@/store/store'

import COLORS from '@/shared/js/colors';
import common_style from '@/shared/js/common_style';
import { Custom_text } from '@/components/components';

import Login_page from '@/pages/login/Login_page';
import Setting_page from '@/pages/setting/Setting_page';
import Home_page from '@/pages/home/Home_page';
import Guide_page from '@/pages/home/guide_page/Guide_page';
import Search_assignment_page from '@/pages/Search_assignment_page/Search_assignment_page.js';
import List_page from '@/pages/list/List_page';
import Community_page from '@/pages/community/Community_page';
import My_page from '@/pages/my/My_page';
import Edit_profile from '@/pages/my/user_card/edit_profile/Edit_profile.js'
import Login_info_page from '@/pages/my/login_info_page/Login_info_page';
import Withdrawal_page from '@/pages/my/withdrawal_page/Withdrawal_page';
import Add_assignment from '@/components/set_assignment/Add_assignment.js'
import Edit_assignment from '@/components/set_assignment/Edit_assignment.js'
import Set_semester from '@/components/set_semester/Set_semester.js'
import Add_semester from '@/components/set_semester/Add_semester.js'

import home_inactive from '@/assets/img/bottom_tab/home_inactive.png'
import list_inactive from '@/assets/img/bottom_tab/list_inactive.png'
import community_inactive from '@/assets/img/bottom_tab/community_inactive.png'
import my_inactive from '@/assets/img/bottom_tab/my_inactive.png'
import home_active from '@/assets/img/bottom_tab/home_active.png'
import list_active from '@/assets/img/bottom_tab/list_active.png'
import community_active from '@/assets/img/bottom_tab/community_active.png'
import my_active from '@/assets/img/bottom_tab/my_active.png'

import success_check from '@/assets/img/icon/success_check.png';

const Stack = createNativeStackNavigator();
const Bottom_tab = createBottomTabNavigator();

const Bottom_navigation = () => {
  return (
    <Bottom_tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'regular'
        },
        tabBarStyle: { height: 80, backgroundColor: COLORS.primary_480 },
        tabBarActiveTintColor: COLORS.primary_500,
        tabBarInactiveTintColor: COLORS.gray_500,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'regular'
        },
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
        name="리스트"
        component={List_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? list_active : list_inactive} />
          ),
        })} />
      <Bottom_tab.Screen
        name="커뮤니티"
        component={Community_page}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <Image style={styles.img_bottom_tabs} source={focused ? community_active : community_inactive} />
          ),
          headerShown: true,
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
      <Custom_text style={styles.primary_success_toast.text1}>{text1}</Custom_text>
    </View>
  )
};

const App = () => {
  const [page_count, set_page_count] = useState(1);
  const [font_loaded, set_font_loaded] = useState(false);

  useEffect(() => {
    fetch_fonts()
      .then(() => set_font_loaded(true))
      .catch((err) => console.log(err));
  }, []);

  const fetch_fonts = async () => {
    await Font.loadAsync({
      "regular": require("@/assets/fonts/Pretendard-Regular.otf"),  //font_weight = 400
      "medium": require("@/assets/fonts/Pretendard-Medium.otf"),  //font_weight = 500
      "semi_bold": require("@/assets/fonts/Pretendard-SemiBold.otf"),  //font_weight = 600
      "bold": require("@/assets/fonts/Pretendard-Bold.otf"),  //font_weight = 700
    });
  };

  const create_two_button_alert = ({ navigation }) =>
    Alert.alert('회원가입 취소', '홈 화면으로 이동합니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      { text: '확인', onPress: () => navigation.navigate('Login_page') },
    ]);

  if (!font_loaded) {
    return <View />;
  }


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
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontSize: 18,
              fontFamily: 'regular'
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}>
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
                />
              )
            })}>
            {() => (
              <Setting_page
                page_count={page_count}
                set_page_count={set_page_count}
              />)}
          </Stack.Screen>
          <Stack.Screen name="Bottom_navigation" component={Bottom_navigation} options={{ headerShown: false }} />
          <Stack.Screen
            name="Guide_page"
            component={Guide_page}
            options={({ navigation }) => ({
              title: '써브밋 가이드',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color="black"
                  />
                </Pressable>
              )
            })}
          />
          <Stack.Screen
            name="과제 찾기"
            component={Search_assignment_page}
            options={common_style.assignment_header_options('과제 찾기', '#EB4F5D')}
          />
          <Stack.Screen
            name="과제 등록"
            component={Add_assignment}
            options={common_style.assignment_header_options('과제 일정', COLORS.primary_500)}
          />
          <Stack.Screen
            name="과제 수정"
            component={Edit_assignment}
            options={common_style.assignment_header_options('과제 일정', COLORS.primary_500)}
          />
          <Stack.Screen
            name="프로필 수정"
            component={Edit_profile}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Ionicons
                  name="chevron-back"
                  size={35}
                  color={'black'}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              )
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
                  color={'black'}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerRight: () => (
                <Fontisto
                  name="plus-a"
                  size={24}
                  color={COLORS.gray_520}
                  onPress={() => {
                    navigation.navigate('새 캘린더 만들기')
                  }} />
              )
            })}
          />
          <Stack.Screen
            name="새 캘린더 만들기"
            component={Add_semester}
          />
          <Stack.Screen
            name="Login_info_page"
            component={Login_info_page}
            options={({ navigation }) => ({
              title: '로그인 정보',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color="black"
                  />
                </Pressable>
              )
            })}
          />
          <Stack.Screen
            name="Withdrawal_page"
            component={Withdrawal_page}
            options={({ navigation }) => ({
              title: '회원 탈퇴',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    size={35}
                    color="black"
                  />
                </Pressable>
              )
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
    width: 28,
    height: 28,
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