import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from './SearchBar';

const MainTabHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint='extraLight' style={{ paddingTop: top }}>
      <View style={styles.container}>
        <Link href={'/'} asChild>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.gray,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>
              SG
            </Text>
          </TouchableOpacity>
        </Link>

        <SearchBar />

        <View style={styles.circle}>
          <Ionicons name={'stats-chart'} size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name={'card'} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default MainTabHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    gap: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  btn: {
    padding: 10,
    backgroundColor: Colors.gray,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
