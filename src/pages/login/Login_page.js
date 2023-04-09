import { Text, View, Image, StyleSheet } from "react-native";
import On_boarding from "@/pages/login/onboarding/Onboarding";

// import btn_google_login from "@/assets/img/login/btn_google_login.png"

const Login_page = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <On_boarding />
      </View>
      <View style={{ flex: 0.2 }}>
        <Image
          source={require('@/assets/img/login/btn_google_login.png')}
        />
      </View>
    </View>
  );
}

export default Login_page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

});