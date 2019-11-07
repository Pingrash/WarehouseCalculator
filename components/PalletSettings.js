import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Picker,
  TouchableOpacity
} from 'react-native';
import { PalletContext } from '../context/PalletContext';

export default class PalletSettings extends Component {
  static contextType = PalletContext;
  render() {
    const {
      palletLength,
      palletWidth,
      palletHeight,
      palletWeight,
      measurementUnit,
      weightUnit,
      maxShippingHeight,
      maxShippingWeight,
      handleUnitChange,
      setDefaults
    } = this.context;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          <Text style={styles.labelText}>
            Pallet Length
          </Text>
          <TextInput
            style={styles.input}
            value={palletLength}
            onChangeText={text =>
              handleUnitChange('palletLength', text)
            }
            keyboardType={'numeric'}
          />
          <Text style={styles.labelText}>Pallet Width</Text>
          <TextInput
            style={styles.input}
            value={palletWidth}
            onChangeText={text =>
              handleUnitChange('palletWidth', text)
            }
            keyboardType={'numeric'}
          />
          <Text style={styles.labelText}>
            Pallet Height
          </Text>
          <TextInput
            style={styles.input}
            value={palletHeight}
            onChangeText={text =>
              handleUnitChange('palletHeight', text)
            }
            keyboardType={'numeric'}
          />
          <Text style={styles.labelText}>
            Pallet Weight
          </Text>
          <TextInput
            style={styles.input}
            value={palletWeight}
            onChangeText={text =>
              handleUnitChange('palletWeight', text)
            }
            keyboardType={'numeric'}
          />
          <Text style={styles.labelText}>
            Measurement Unit
          </Text>
          <Picker
            selectedValue={measurementUnit}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              handleUnitChange(
                'measurementUnit',
                itemValue,
                measurementUnit
              )
            }
            mode='dialog'
          >
            <Picker.Item label='mm' value='mm' />
            <Picker.Item label='cm' value='cm' />
            <Picker.Item label='inch' value='inch' />
            <Picker.Item label='m' value='m' />
          </Picker>
          <Text style={styles.labelText}>Weight Unit</Text>
          <Picker
            selectedValue={weightUnit}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              handleUnitChange(
                'weightUnit',
                itemValue,
                weightUnit
              )
            }
            mode='dialog'
          >
            <Picker.Item label='kg' value='kg' />
            <Picker.Item label='lbs' value='lbs' />
          </Picker>
          <Text style={styles.labelText}>
            Maximum Shipping Height
          </Text>
          <TextInput
            style={styles.input}
            value={maxShippingHeight}
            onChangeText={text =>
              handleUnitChange('maxShippingHeight', text)
            }
            keyboardType={'numeric'}
          />
          <Text style={styles.labelText}>
            Maximum Shipping Weight
          </Text>
          <TextInput
            style={styles.input}
            value={maxShippingWeight}
            onChangeText={text =>
              handleUnitChange('maxShippingWeight', text)
            }
            keyboardType={'numeric'}
          />
          <TouchableOpacity
            style={styles.defaultBtn}
            onPress={setDefaults}
          >
            <Text style={styles.btnText}>
              Set Current As Default
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f6f6f6'
  },
  settingsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30
  },
  labelText: {
    fontSize: 34
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: 90,
    paddingTop: 16,
    marginBottom: 30,
    fontSize: 25,
    color: 'black'
  },
  picker: {
    height: 100,
    width: 100,
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
    marginLeft: 30
  },
  defaultBtn: {
    width: 250,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    backgroundColor: '#506680'
  },
  btnText: {
    fontSize: 24,
    color: '#f1f1f1'
  }
});
