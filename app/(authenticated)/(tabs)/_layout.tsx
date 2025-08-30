import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MainTabHeader from '@/components/MainTabHeader';
import Colors from '@/constants/Colors';
import { BlurView } from 'expo-blur';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={'extraLight'}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.05)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='registered' size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => <MainTabHeader />,
        }}
      />
      <Tabs.Screen
        name='invest'
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='line-chart' size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name='transfers'
        options={{
          title: 'Transfers',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='exchange' size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name='crypto'
        options={{
          title: 'Crypto',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='bitcoin' size={size} color={color} />
          ),
          headerTransparent: true,
          header: () => <MainTabHeader />,
        }}
      />

      <Tabs.Screen
        name='lifestyle'
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='th' size={size} color={color} />
          ),
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
};

export default Layout;
