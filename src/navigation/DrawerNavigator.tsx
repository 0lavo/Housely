// src/navigation/DrawerNavigator .tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Drawer.Screen 
        name="Favorite" 
        component={FavoriteScreen}
        options={{title: 'Favorite'}} />
        <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{title: 'Home'}} />
        <Drawer.Screen 
        name="Filter" 
        component={FilterScreen}
        options={{title: 'Filter'}} />
        <Drawer.Screen
        name='PropertyDetails'
        component={PropertyDetailsScreen}
        options={{title: 'Details'}}/>
    </Drawer.Navigator>
);

export default DrawerNavigator;