import React from 'react';
import { Platform, Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import HomeScreen from '../screens/Home';
import UoMScreen from '../screens/UoM';
import CubicScreen from '../screens/Cubic';
import MenuDrawer from '../components/MenuDrawer';
import PalletEstimatorScreen from '../screens/PalletEstimator';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({ navigation }) => {
    return <MenuDrawer navigation={navigation} />;
  }
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    UoM: {
      screen: UoMScreen
    },
    Cubic: {
      screen: CubicScreen
    },
    PalletEstimator: PalletEstimatorScreen
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);
