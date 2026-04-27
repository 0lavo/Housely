/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import FilterScreen from './src/screens/FilterScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import BottomNavigationBar from './src/components/BottomNavigationBar';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {

  const [activeTab, setActiveTab] = useState('discover');

  const renderScreen = () => {
    switch (activeTab) {
      case 'filters': return <FilterScreen />;
      case 'discover': return <DiscoverScreen />;
      case 'favorites': return <FavoriteScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <BottomNavigationBar
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
