import AccountPanel from '@/components/Account/AccountPanel';
import Avatar from '@/components/Account/Avatar';
import FullName from '@/components/Account/FullName';
import ThemePanel from '@/components/Account/ThemePanel';
import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';

const Page = () => {
  return (
    <BlurView intensity={50} tint={'dark'} style={styles.container}>
      <View style={styles.accountInfo}>
        <Avatar />
        <FullName />
      </View>

      <AccountPanel />

      <ThemePanel />
    </BlurView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.5)' },
  accountInfo: { alignItems: 'center' },
});
