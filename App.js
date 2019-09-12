import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator';
import { GlobalProvider } from './context/GlobalContext';
import { CubicProvider } from './context/CubicContext';
import { PalletProvider } from './context/PalletContext';

export default class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <CubicProvider>
          <PalletProvider>
            <View style={styles.container}>
              <DrawerNavigator />
            </View>
          </PalletProvider>
        </CubicProvider>
      </GlobalProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});
