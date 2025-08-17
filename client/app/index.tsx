import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import ShortsFeed from '../components/ShortsFeed';

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <StatusBar barStyle='dark-content' />
      <Header />
      <ShortsFeed />
    </SafeAreaView>
  );
}
