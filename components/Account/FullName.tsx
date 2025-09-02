import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EditNameForm from './EditNameForm';

const FullName = () => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName!, lastName: lastName! });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  return (
    <View style={styles.container}>
      {!edit && (
        <View style={styles.editRow}>
          {(!!firstName || !!lastName) && (
            <Text style={styles.fullNameText}>
              {firstName} {lastName}
            </Text>
          )}

          <TouchableOpacity onPress={() => setEdit(true)}>
            <Ionicons name='ellipsis-horizontal' size={24} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
      {edit && <EditNameForm onSubmit={onSaveUser} />}
    </View>
  );
};

export default FullName;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 6 },
  fullNameText: { fontSize: 26, color: '#fff' },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputField: {
    width: 140,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
});
