import Colors from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import WidgetList from './SortableList/WidgetList';
import { defaultStyles } from '@/constants/Styles';
import { MARGIN } from './SortableList/Config';

const WidgetSection = () => {
  return (
    <View>
      <Text style={[defaultStyles.sectionHeader, { margin: MARGIN }]}>
        Widgets
      </Text>
      <WidgetList />
    </View>
  );
};

export default WidgetSection;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
