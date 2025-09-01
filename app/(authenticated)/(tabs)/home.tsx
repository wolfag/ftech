import ActionBar from '@/components/Home/ActionBar';
import BalanceInfo from '@/components/Home/BalanceInfo';
import TransactionsSection from '@/components/Home/TransactionsSection';
import WidgetSection from '@/components/Home/WidgetSection';
import Colors from '@/constants/Colors';
import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView, StyleSheet } from 'react-native';

const HomePage = () => {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
      scrollEnabled
    >
      <BalanceInfo style={styles.balanceInfo} />

      <ActionBar style={styles.actionBar} />

      <TransactionsSection style={styles.transactions} />

      <WidgetSection />
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  balanceInfo: {
    margin: 80,
  },
  actionBar: {
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
  },
});
