import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import ReelsFeed from '../components/ReelsFeed';
import StoryBar from '../components/StoryBar';


export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
      <StatusBar barStyle='dark-content' />
      <Header />
      <StoryBar />
      <ReelsFeed />
    </SafeAreaView>
  );
}
