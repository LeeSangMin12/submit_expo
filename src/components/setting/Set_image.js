import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

import COLORS from '@/shared/js/colors';
import { set_store_info } from '@/shared/js/common';
import { Custom_modal, Button } from "@/components/components";
import edit_feather_btn from '@/assets/img/my/user_card/edit_feather_btn.png';
import user_profile from '@/assets/img/my/user_card/user_profile.png';

const Set_image = () => {
  const { profile_img } = useSelector((state) => state.user);
  const [user_img_modal, set_user_img_modal] = useState(false);

  /**
   * 동기적으로 프로필 이미지 설정
   */
  const pick_image_async = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      set_store_info('user', 'profile_img', { uri: result.assets[0].uri });
      set_user_img_modal(false);
    }
  };

  /**
   * 프로필 이미지 초기값으로 변경
   */
  const pick_image_initial = () => {
    set_store_info('user', 'profile_img', user_profile);
    set_user_img_modal(false);
  }

  const Modal_set_user_img = () => {
    return (
      <View style={styles.Modal_set_user_img.container}>
        <View style={styles.Modal_set_user_img.content_container}>
          <View style={[styles.Modal_set_user_img.edit_img_container, { flex: 0.7 }]}>
            <Text style={{ fontSize: 15, color: COLORS.gray_500, }}>프로필 이미지 변경</Text>
          </View>
          <Pressable style={[styles.Modal_set_user_img.edit_img_container, { flex: 1 }]} onPress={pick_image_async}>
            <Text style={{ fontSize: 23, color: COLORS.primary_500, }}>앨범에서 선택</Text>
          </Pressable>
          <Pressable style={[styles.Modal_set_user_img.edit_img_container, { flex: 1 }]} onPress={pick_image_initial}>
            <Text style={{ fontSize: 23, color: COLORS.primary_500, }}>기본 이미지로 변경</Text>
          </Pressable>
        </View>
        <View style={styles.Modal_set_user_img.cancel_button_container}>
          <Button
            title="취소"
            on_press={() => set_user_img_modal(false)}
            style={styles.Modal_set_user_img.btn_cancel} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.profile_img_container}>
        <Pressable onPress={() => set_user_img_modal(true)}>
          <Image source={profile_img} style={styles.img_profile} />
          <Image source={edit_feather_btn} style={styles.img_edit} />
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
  img_profile: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  img_edit: {
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
  Modal_set_user_img: {
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
    },
    content_container: {
      flex: 1,
      alignItems: 'center',
    },
    edit_img_container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray_490_inactive,
    },
    cancel_button_container: {
      alignItems: 'center'
    },
    btn_cancel: {
      width: '90%',
      marginBottom: 15,
    }
  }
});