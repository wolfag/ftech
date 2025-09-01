import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { CryptoListing } from '@/types/crypto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useCallback } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Spacer } from 'react-native-ios-utilities';

const CryptoPage = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listing').then((res) => res.json()),
  });

  const ids = currencies.data
    ?.map((currency: CryptoListing) => currency.id)
    .join(',');

  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  const renderItem: ListRenderItem<CryptoListing> = useCallback(
    ({ item: currency }) => {
      return (
        <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 14,
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
            }}
          >
            {/* <Image
              source={{ uri: data?.[currency.id]?.logo }}
              style={{ width: 40, height: 40 }}
            /> */}
            <FontAwesome5 name='bitcoin' size={24} color='black' />
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={{ fontWeight: '600', color: Colors.dark }}>
                {currency.name}
              </Text>
              <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
            </View>
            <View style={{ gap: 6, alignItems: 'flex-end' }}>
              <Text>{currency.quote.BTC.price.toFixed(2)} €</Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Ionicons
                  name={
                    Number(currency.quote.BTC.percent_change_1h) > 0
                      ? 'caret-up'
                      : 'caret-down'
                  }
                  size={16}
                  color={
                    Number(currency.quote.BTC.percent_change_1h) > 0
                      ? 'green'
                      : 'red'
                  }
                />
                <Text
                  style={{
                    color:
                      Number(currency.quote.BTC.percent_change_1h) > 0
                        ? 'green'
                        : 'red',
                  }}
                >
                  {Number(currency.quote.BTC.percent_change_1h).toFixed(2)} %
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      );
    },
    [],
  );

  return (
    <FlatList
      data={currencies.data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      )}
      contentContainerStyle={{
        paddingTop: headerHeight,
        backgroundColor: Colors.background,
      }}
      style={{ backgroundColor: Colors.background, margin: 20 }}
      ItemSeparatorComponent={() => <Spacer />}
      ListEmptyComponent={() => (
        <Text style={defaultStyles.sectionHeader}>No data</Text>
      )}
    />
  );
};

export default CryptoPage;
