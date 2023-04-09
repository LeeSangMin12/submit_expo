import { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const data = [
  { title: '과제 알리미', text: '과제에 알맞는 알람을 손쉽게 설정해요', image: require('@/assets/img/login/onboarding/onboarding_1.png') },
  { title: '예약 제출', text: '미리 완성한 과제를 예약제출 해요', image: require('@/assets/img/login/onboarding/onboarding_2.png') },
  { title: '커뮤니티', text: '같은 전공 학생들과 상담하고 필요한 정보를 공유해요.', image: require('@/assets/img/login/onboarding/onboarding_3.png') },
];

const Onboarding = () => {
  const [active_slide, set_active_slide] = useState(0);

  const render_item = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.main_text}>{item.title}</Text>
        <Text style={styles.sub_text}>{item.text}</Text>
        <View style={styles.img_container}>
          <Image source={item.image} resizeMode='contain' style={styles.img_carousel} />
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active_slide}
        containerStyle={styles.pagination_container}
        dotStyle={styles.dot_style}
        inactiveDotStyle={styles.inactive_dot_style}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <Carousel
        data={data}
        renderItem={render_item}
        sliderWidth={width}
        itemWidth={width}
        autoplay={true}
        loop={true}
        onSnapToItem={(index) => set_active_slide(index)}
      />
    </View>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pagination_container: {
    paddingVertical: 30,
  },
  dot_style: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: '#946BF6',
  },
  inactive_dot_style: {
    backgroundColor: '#C4C4C4',
  },
  img_container: {
    marginTop: 30,
    width: width,
    height: '60%',
  },
  img_carousel: {
    width: '100%',
    height: '100%',
  },
  main_text: {
    fontSize: 15,
    color: 'gray',
    marginTop: 20,
  },
  sub_text: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    width: '55%',
  },
});