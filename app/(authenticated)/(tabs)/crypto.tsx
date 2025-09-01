import { SkeletonList } from '@/components/Crypto/SkeletonList';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { CryptoListing } from '@/types/crypto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Spacer } from 'react-native-ios-utilities';

const CryptoPage = () => {
  const headerHeight = useHeaderHeight();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery<CryptoListing[]>({
    initialPageParam: 1,
    queryKey: ['listings'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/listing?page=${pageParam}`);
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  const flatListData = data?.pages.flat() || [];

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

  if (isLoading) {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          backgroundColor: Colors.background,
        }}
        style={{ backgroundColor: Colors.background, margin: 20 }}
      >
        <SkeletonList />
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={flatListData}
      keyExtractor={(item, index) => `${item.id}-${index}`}
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
      ListEmptyComponent={() => <Text>No data</Text>}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return <SkeletonList count={5} />;
        }
      }}
      refreshControl={
        <RefreshControl
          colors={['red']}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
    />
  );
};

export default CryptoPage;
