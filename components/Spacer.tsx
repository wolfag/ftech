import { View, Text } from 'react-native';
import React from 'react';

type Props = {
  horizontal?: boolean;
};

const Spacer = ({ horizontal }: Props) => {
  return (
    <View style={{ width: horizontal ? 16 : 0, height: horizontal ? 0 : 16 }} />
  );
};

export default Spacer;
