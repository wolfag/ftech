import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { memo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  onNumberPress: (number: number) => void;
  onBiometricAuthPress: () => void;
  onNumberBackspace?: () => void;
  style?: ViewStyle;
};

const NumberPad = ({
  onNumberPress,
  onBiometricAuthPress,
  onNumberBackspace,
  style,
}: Props) => {
  const renderLine = useCallback(
    (numberList: [number, number, number]) => {
      return (
        <View style={styles.lineContainer}>
          {numberList.map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    },
    [onNumberPress],
  );

  return (
    <View style={[styles.numbersView, style]}>
      {renderLine([1, 2, 3])}
      {renderLine([4, 5, 6])}
      {renderLine([7, 8, 9])}

      <View style={styles.lineContainer}>
        <TouchableOpacity onPress={onBiometricAuthPress}>
          <MaterialCommunityIcons
            name='face-recognition'
            size={26}
            color='black'
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>

        <View style={{ minWidth: 30 }}>
          {!!onNumberBackspace && (
            <TouchableOpacity onPress={onNumberBackspace}>
              <Text style={styles.number}>
                <MaterialCommunityIcons
                  name='backspace-outline'
                  size={26}
                  color='black'
                />
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(NumberPad);

const styles = StyleSheet.create({
  numbersView: {
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
