import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Panel = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default Panel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
});
