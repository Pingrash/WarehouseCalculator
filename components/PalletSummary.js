import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { PalletContext } from '../context/PalletContext';

export default class PalletSummary extends Component {
  static contextType = PalletContext;

  render() {
    const {
      totalLayers,
      boxesPerLayer,
      totalBoxes,
      totalPalletWeight,
      weightUnit,
      layoutType
    } = this.context;
    return (
      <View>
        <Text style={styles.text}>
          Layout Type: {layoutType}
        </Text>
        <Text style={styles.text}>
          Total Layers: {totalLayers}
        </Text>
        <Text style={styles.text}>
          Boxes Per Layer: {boxesPerLayer}
        </Text>
        <Text style={styles.text}>
          Total Boxes: {totalBoxes}
        </Text>
        <Text style={styles.text}>
          Total Pallet Weight: {totalPalletWeight}
          {weightUnit}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: '#f1f1f1',
    textTransform: 'capitalize'
  }
});
