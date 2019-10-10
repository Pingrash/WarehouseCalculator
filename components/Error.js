import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { PalletContext } from '../context/PalletContext';

export default class Error extends Component {
  static contextType = PalletContext;
  render() {
    const { errorType } = this.context;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.text}> {errorType} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    color: '#f1f1f1'
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
