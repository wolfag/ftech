import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet } from 'react-native';
import ActionItem from './ActionItem';
import Panel from './Panel';
import { useEffect, useState } from 'react';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';

const ICONS = [
  {
    name: 'Default',
    icon: require('@/assets/images/icon.png'),
  },
  {
    name: 'Dark',
    icon: require('@/assets/images/icon-dark.png'),
  },
  {
    name: 'Vivid',
    icon: require('@/assets/images/icon-vivid.png'),
  },
];

const ThemePanel = () => {
  const [activeIcon, setActiveIcon] = useState('Default');

  const onChangeAppIcon = async (icon: string) => {
    await setAppIcon(icon.toLowerCase());
    setActiveIcon(icon);
  };

  useEffect(() => {
    const loadCurrentIconPref = async () => {
      const icon = await getAppIcon();
      setActiveIcon(icon);
    };

    loadCurrentIconPref();
  }, []);

  return (
    <Panel>
      {ICONS.map((icon) => (
        <ActionItem
          key={icon.name}
          Icon={<Image source={icon.icon} style={styles.image} />}
          label={icon.name}
          onPress={() => onChangeAppIcon(icon.name)}
          Tail={
            activeIcon.toLowerCase() === icon.name.toLowerCase() ? (
              <Ionicons name='checkmark' size={24} color={'#fff'} />
            ) : undefined
          }
        />
      ))}
    </Panel>
  );
};

export default ThemePanel;

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
