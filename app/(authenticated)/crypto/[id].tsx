import MyButton from '@/components/MyButton';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { TickerItem } from '@/types/crypto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Circle, useFont } from '@shopify/react-native-skia';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

type ChartDataType = {
  x: number;
  y: {
    price: number;
  };
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const DetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const headerHeight = useHeaderHeight();

  const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, isActive } = useChartPressState<ChartDataType>({
    x: 0,
    y: { price: 0 },
  });

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const res = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return res[id];
    },
    enabled: !!id,
  });

  const { data: tickers = [] } = useQuery<TickerItem[]>({
    queryKey: ['tickers'],
    queryFn: async (): Promise<TickerItem[]> =>
      fetch('/api/tickers').then((res) => res.json()),
  });

  useEffect(() => {
    if (isActive) {
      Haptics.selectionAsync();
    }
  }, [isActive]);

  const animatedText = useAnimatedProps(() => ({
    text: `${state.y.price.value.value.toFixed(2)} €`,
    defaultValue: '',
  }));

  const animatedDateText = useAnimatedProps(() => ({
    text: `${new Date(state.x.value.value).toLocaleDateString()}`,
    defaultValue: '',
  }));

  return (
    <>
      <Stack.Screen options={{ title: data?.name || '' }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior='automatic'
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: 'Chart' }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <MyButton
                key={item}
                label={item}
                variant='small'
                onPress={() => setActiveIndex(index)}
                style={{
                  btn:
                    activeIndex === index
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn,
                  label:
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText,
                }}
              />
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
              }}
            >
              <Text style={styles.subtitle}>{data?.symbol}</Text>
              {/* <Image
                source={{ uri: data?.logo }}
                style={{ width: 60, height: 60 }}
              /> */}
              <FontAwesome5 name='bitcoin' size={24} color='black' />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <MyButton
                key={'buy'}
                label='Buy'
                variant='small'
                Icon={<Ionicons name='add' size={24} color={'#fff'} />}
                style={{ btn: { backgroundColor: Colors.primary } }}
              />
              <MyButton
                key={'receive'}
                label='Receive'
                variant='small'
                Icon={
                  <Ionicons
                    name='arrow-back'
                    size={24}
                    color={Colors.primary}
                  />
                }
                style={{
                  btn: { backgroundColor: Colors.primaryMuted },
                  label: {
                    color: Colors.primary,
                  },
                }}
              />
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {tickers && (
                <>
                  {!isActive && (
                    <View>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                      >
                        {tickers[tickers.length - 1]?.price?.toFixed(2)} €
                      </Text>
                      <Text style={{ fontSize: 18, color: Colors.gray }}>
                        Today
                      </Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: Colors.dark,
                        }}
                        animatedProps={animatedText}
                      />
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{ fontSize: 18, color: Colors.gray }}
                        animatedProps={animatedDateText}
                      />
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      lineWidth: { grid: { x: 0.2, y: 0.2 }, frame: 0 },
                      labelOffset: { x: 0 - 2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} €`,
                      formatXLabel: (ms) => {
                        if (ms) {
                          return format(new Date(ms as number), 'MM/yy');
                        }
                        return '';
                      },
                    }}
                    data={tickers}
                    xKey={'timestamp'}
                    yKeys={['price']}
                  >
                    {({ points }) => {
                      return (
                        <>
                          <Line
                            points={points.price}
                            color={'red'}
                            strokeWidth={2}
                          />
                          {isActive && (
                            <ToolTip
                              x={state.x.position}
                              y={state.y.price.position}
                            />
                          )}
                        </>
                      );
                    }}
                  </CartesianChart>
                </>
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
      />
    </>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});
