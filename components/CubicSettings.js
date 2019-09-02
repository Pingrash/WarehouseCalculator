import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Picker
} from 'react-native';
import { CubicContext } from '../context/CubicContext';

export default class CubicSettings extends Component {
  static contextType = CubicContext;
  render() {
    const {
      cubicInputUnitType,
      cubicOutputUnitType,
      handleUnitChange
    } = this.context;
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.labelText}>Input Units</Text>
        <Picker
          selectedValue={cubicInputUnitType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            handleUnitChange('input', itemValue)
          }
          mode='dropdown'
        >
          <Picker.Item label='cm' value='cm' />
          <Picker.Item label='inch' value='inch' />
          <Picker.Item label='m' value='m' />
        </Picker>
        <Text style={styles.labelText}>Output Units</Text>
        <Picker
          selectedValue={cubicOutputUnitType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            handleUnitChange('output', itemValue)
          }
        >
          <Picker.Item label='m' value='m' />
          <Picker.Item label='ft' value='ft' />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#f6f6f6'
  },
  picker: {
    height: 100,
    width: 100,
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }]
  },
  pickerText: {
    fontSize: 25
  },
  labelText: {
    fontSize: 34
  }
});
