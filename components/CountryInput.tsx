import Colors from '@/constants/Colors';
import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';

const { height } = Dimensions.get('window');

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

const CountryInput = ({ value = '+84', onValueChange }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='Country code'
        placeholderTextColor={Colors.gray}
        value={value}
        editable={false}
        onPressIn={() => setShow(true)}
      />
      <CountryPicker
        show={show}
        lang='en'
        pickerButtonOnPress={(item) => {
          onValueChange(item.dial_code);
          setShow(false);
        }}
        style={{
          modal: {
            height: height * 0.7,
          },
        }}
      />
    </View>
  );
};

export default CountryInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
