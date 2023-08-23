import { StyleSheet, Image, ScrollView, Pressable } from "react-native"

import guide_1 from '@/assets/img/guide/guide_1.png';
import guide_2 from '@/assets/img/guide/guide_2.png';
import guide_3 from '@/assets/img/guide/guide_3.png';
import guide_4 from '@/assets/img/guide/guide_4.png';

const Guide_page = ({ navigation }) => {
  return (
    <ScrollView >
      <Pressable
        onPress={() => navigation.navigate('Bottom_navigation', { screen: '홈' })}
        style={{ alignItems: 'center' }}>
        <Image
          source={guide_1}
          style={styles.guide_img}
        />
        <Image
          source={guide_2}
          style={styles.guide_img}
        />
        <Image
          source={guide_3}
          style={styles.guide_img}
        />
        <Image
          source={guide_4}
          style={styles.guide_img}
        />
      </Pressable>

    </ScrollView >
  );
}

export default Guide_page;

const styles = StyleSheet.create({
  guide_img: {
    width: 350,
    height: 700,
    resizeMode: 'contain'
  }
});