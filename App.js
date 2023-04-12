import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'

import store from '@/store/store'
import COLORS from '@/shared/js/colors';

import Login_page from '@/pages/login/Login_page';
import Setting_page from '@/pages/setting/Setting_page';
import Home_page from '@/pages/home/Home_page';
import List_page from '@/pages/list/List_page';
import Alarm_page from '@/pages/alarm/Alarm_page';
import Community_page from '@/pages/community/Community_page';
import My_page from '@/pages/my/My_page';
import { Auto_complete } from '@/components/components';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Auto_complete />
    </>
    // <Provider store={store}>
    //   <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
    //   <SafeAreaView style={styles.container}>
    //     <NavigationContainer
    //       theme={{
    //         ...DefaultTheme,
    //         colors: {
    //           ...DefaultTheme.colors,
    //           background: COLORS.white
    //         },
    //       }}>
    //       <Stack.Navigator>
    //         <Stack.Screen
    //           name="회원가입"
    //           component={Setting_page}
    //           options={{ headerTitleAlign: 'center', }}
    //         />
    //         <Stack.Screen name="Login_page" component={Login_page} options={{ headerShown: false }} />
    //         <Stack.Screen name="Home_page" component={Home_page} />
    //         <Stack.Screen name="List_page" component={List_page} />
    //         <Stack.Screen name="Alarm_page" component={Alarm_page} />
    //         <Stack.Screen name="Community_page" component={Community_page} />
    //         <Stack.Screen name="My_page" component={My_page} />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </SafeAreaView>
    // </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});