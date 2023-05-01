import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import COLORS from '@/shared/js/colors';
import { Custom_modal, Button } from "@/components/components";
import user_profile from '@/assets/img/my/user_card/user_profile.png';
import edit_feather_btn from '@/assets/img/my/user_card/edit_feather_btn.png';

import { set_store_info } from '@/shared/js/common';

const Set_image = () => {
  const [user_img_modal, set_user_img_modal] = useState(false);

  const Modal_set_user_img = () => {
    return (
      <View style={{ width: '100%', justifyContent: 'space-between', flex: 1, }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 15, marginTop: 10, color: COLORS.gray_500 }}>프로필 이미지 변경</Text>
          <Text style={{ fontSize: 23, marginTop: 10, color: COLORS.primary_500 }}>앨범에서 선택</Text>
          <Text style={{ fontSize: 23, marginTop: 10, color: COLORS.primary_500 }}>기본 이미지로 변경</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title="취소"
            style={{ width: '90%', marginBottom: 15, }} />
        </View>
      </View>
    );
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    // if (!result.canceled) {
    //   setSelectedImage(result.assets[0].uri);
    //   setShowAppOptions(true);
    // } else {
    //   alert('You did not select any image.');
    // }
  };

  return (
    <View>
      <View style={styles.profile_img_container}>
        <Pressable onPress={() => set_user_img_modal(true)}>
          <Image source={user_profile} />
          <Image source={edit_feather_btn} style={styles.img_container} />
        </Pressable>

        {/* <View style={styles.file_container}>
          <Fontisto
            name="link"
            size={24}
            color={COLORS.gray_500}
            style={{ marginRight: 10 }} />

          <TextInput
            style={styles.input}
            placeholder="첨부파일 없음"
            onChangeText={(label) => set_store_info('user', 'nickname', label)} />

          <Ionicons
            name="chevron-forward"
            size={30}
            color={COLORS.gray_500} />
        </View> */}
      </View>

      <Custom_modal
        modal_visible={user_img_modal}
        position='bottom'
        content_component={() => <Modal_set_user_img />}
      />
    </View>
  );
};

export default Set_image;

const styles = StyleSheet.create({
  profile_img_container: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img_container: {
    position: 'relative',
    top: -25,
    left: 70,
  },
  file_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray_480,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 15,
    paddingHorizontal: 3,
  },
});