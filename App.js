import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator';
import { GlobalProvider } from './context/GlobalContext';
import { CubicProvider } from './context/CubicContext';

export default class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <CubicProvider>
          <View style={styles.container}>
            <DrawerNavigator />
          </View>
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
