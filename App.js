import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import COLORS from './src/shared/js/colors';

import Login_page from '@/pages/login/Login_page';
import Setting_page from './src/pages/setting/Setting_page';
import Home_page from './src/pages/home/Home_page';
import List_page from './src/pages/list/List_page';
import Alarm_page from './src/pages/alarm/Alarm_page';
import Community_page from './src/pages/community/Community_page';
import My_page from './src/pages/my/My_page';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
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
            <Stack.Screen
              name="회원가입"
              component={Setting_page}
              options={{ headerTitleAlign: 'center', }}
            />
            <Stack.Screen name="Login_page" component={Login_page} options={{ headerShown: false }} />
            <Stack.Screen name="Home_page" component={Home_page} />
            <Stack.Screen name="List_page" component={List_page} />
            <Stack.Screen name="Alarm_page" component={Alarm_page} />
            <Stack.Screen name="Community_page" component={Community_page} />
            <Stack.Screen name="My_page" component={My_page} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});