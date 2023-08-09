import { useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import COLORS from '@/shared/js/colors';
import { Custom_text, Custom_modal, Button } from "@/components/components";
import edit_feather_btn from '@/assets/img/my/user_card/edit_feather_btn.png';
import user_profile from '@/assets/img/my/user_card/user_profile.png';

const Set_image = ({
  set_value,
  img_url
}) => {
  const [status, request_permission] = ImagePicker.useMediaLibraryPermissions();   //권한 요청을 위한 hooks
  const [user_img_modal, set_user_img_modal] = useState(false);

  /**
   * 동기적으로 프로필 이미지 설정
   */
  const pick_image_async = async () => {
    if (!status?.granted) {
      const permission = await request_permission();
      if (!permission.granted) {
        return null;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      return null;
    }

    const local_uri = result.assets[0].uri;
    const file_name = local_uri.split('/').pop();
    const match = /\.(\w+)$/.exec(file_name ?? '');
    const type = match ? `image/${match[1]}` : `image`;

    set_value((prev_state) => {
      return {
        ...prev_state,
        img_url: {
          uri: local_uri,
          name: file_name,
          type: type
        }
      }
    })

    set_user_img_modal(false);
  };

  /**
   * 프로필 이미지 초기값으로 변경
   */
  const pick_image_initial = () => {
    set_value((prev_state) => {
      return { ...prev_state, img_url: '' }
    })
    set_user_img_modal(false);
  }

  const Modal_set_user_img = () => {
    return (
      <View style={styles.Modal_set_user_img.container}>
        <View style={styles.Modal_set_user_img.content_container}>
          <View style={[styles.Modal_set_user_img.edit_img_container, { flex: 0.7 }]}>
            <Custom_text style={{ fontSize: 15, color: COLORS.gray_500, }}>프로필 이미지 변경</Custom_text>
          </View>
          <Pressable style={[styles.Modal_set_user_img.edit_img_container, { flex: 1 }]} onPress={pick_image_async}>
            <Custom_text style={{ fontSize: 23, color: COLORS.primary_500, }}>앨범에서 선택</Custom_text>
          </Pressable>
          <Pressable style={[styles.Modal_set_user_img.edit_img_container, { flex: 1 }]} onPress={pick_image_initial}>
            <Custom_text style={{ fontSize: 23, color: COLORS.primary_500, }}>기본 이미지로 변경</Custom_text>
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
      <View style={styles.img_url_container}>
        <Pressable onPress={() => set_user_img_modal(true)}>
          {img_url === '' ? <Image source={user_profile} style={styles.img_profile} /> :
            <Image source={{ uri: img_url.uri }} style={styles.img_profile} />
          }
          <Image source={edit_feather_btn} style={styles.img_edit} />
        </Pressable>
      </View>

      <Custom_modal
        modal_visible={user_img_modal}
        position='bottom'
        bottom_height='27%'
        content_component={() => <Modal_set_user_img />}
      />
    </View>
  );
};

export default Set_image;

const styles = StyleSheet.create({
  img_url_container: {
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