import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';

import COLORS from '@/shared/js/colors';
import { Button } from '@/components/components';
import Set_nickname from '@/components/setting/Set_nickname';
import Set_image from '@/components/setting/Set_image';

const Edit_profile = () => {

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="safe"
          contentContainerStyle={{ flexGrow: 1 }}>

          <Set_image />

          <View style={styles.set_nickname_container}>
            <Set_nickname nickname={''} />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.btn_next_container}>
        <Button
          title="완료하기"
          style={styles.btn_next}
        // on_press={() => set_page_count(page_count + 1)}
        // disabled={btn_next_disabled} 
        />
      </View>
    </View >
  );
};

export default Edit_profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  progress_container: {
    alignItems: 'center',
  },
  linear_progress: {
    width: '90%',
    backgroundColor: COLORS.gray_490_inactive,
    height: 8,
    borderRadius: 4,
    marginVertical: 20
  },
  set_nickname_container: {
    marginTop: 0
  },
  btn_next_container: {
    paddingVertical: 30,
  },
  btn_next: {
    height: 56,
  }
});