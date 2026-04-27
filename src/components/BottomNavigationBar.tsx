import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ICONS: Record<TabKey, ImageSourcePropType> = {
  filters: require('../assets/icons/filters.png'),
  discover: require('../assets/icons/discover.png'),
  favorites: require('../assets/icons/favorites.png'),
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'filters', label: 'FILTERS' },
  { key: 'discover', label: 'DISCOVER' },
  { key: 'favorites', label: 'FAVORITES' },
];

export type TabKey = 'filters' | 'discover' | 'favorites';

export interface BottomNavigationBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
  bottomInset?: number;
}

function BottomNavigationBar({
  activeTab = 'discover',
  onTabPress,
  bottomInset = 0,
}: BottomNavigationBarProps) {
  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
      {TABS.map(({ key, label }) => {
        const isActive = key === activeTab;
        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => onTabPress?.(key)}
            activeOpacity={0.7}
          >
            {isActive && <View style={styles.activeIndicator} />}
            <Image
              source={ICONS[key]}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tab: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 13,
  },
  activeIndicator: {
    position: 'absolute',
    top: -1,
    left: -12,
    right: -12,
    height: 2,
    backgroundColor: '#1e3a8a',
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.55,
    color: '#94a3b8',
    lineHeight: 16.5,
  },
  labelActive: {
    color: '#1e3a8a',
  },
});

export default BottomNavigationBar;
