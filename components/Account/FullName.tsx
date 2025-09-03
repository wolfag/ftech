import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EditNameForm, { NameFormData } from './EditNameForm';

const FullName = () => {
  const { user } = useUser();

  const [edit, setEdit] = useState(false);

  const onSaveUser = async (data: NameFormData) => {
    try {
      await user?.update({
        firstName: data.firstName,
        lastName: data.lastName,
      });
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
          {(!!user?.firstName || !!user?.lastName) && (
            <Text style={styles.fullNameText}>
              {user?.firstName} {user?.lastName}
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
