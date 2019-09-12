import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import MenuButton from '../components/MenuButton';
import SettingsButton from '../components/SettingsButton';
import SettingsModal from '../components/SettingsModal';
import { CubicContext } from '../context/CubicContext';

export default class Cubic extends Component {
  static contextType = CubicContext;

  constructor() {
    super();
    this.state = {
      length: null,
      width: null,
      depth: null,
      multiplier: '250',
      cubicResult: null
    };

    this.calcCubic = this.calcCubic.bind(this);
    this.setResult = this.setResult.bind(this);
  }

  setResult() {
    const {
      cubicOutputUnitType,
      cubicInputUnitType
    } = this.context;

    // Check if result will need to be converted to another unit type.
    if (
      cubicOutputUnitType === 'm' &&
      cubicInputUnitType === 'inch'
    ) {
      // Convert cubic feet to cubic meters
      result = (result / 35.315).toFixed(2);
    } else if (
      cubicOutputUnitType === 'ft' &&
      cubicInputUnitType === ('cm' || 'm')
    ) {
      // Convert cubic meters to cubic feet
      result = (result * 35.315).toFixed(2);
    }

    this.setState({
      cubicResult: `Result: ${result.toString()}${cubicOutputUnitType}${String.fromCharCode(
        0x00b3
      )}`
    });
  }

  calcCubic() {
    // If any of the measurement inputs are empty then function is cancelled.
    if (
      this.state.length === null ||
      this.state.width === null ||
      this.state.depth === null
    )
      return;

    Keyboard.dismiss();

    // Parse all measurements to integers.
    let length = parseInt(this.state.length);
    let width = parseInt(this.state.width);
    let depth = parseInt(this.state.depth);
    const { cubicInputUnitType } = this.context;

    // Multiplier set to 1 as default to account for missing multiplier input or multiplier entered as 0.
    let multiplier = 1;

    // Set a multiplier to user input if any and also check that user input does not equal 0.
    if (
      parseInt(this.state.multiplier) > 0 &&
      this.state.multiplier
    )
      multiplier = parseInt(this.state.multiplier);

    switch (cubicInputUnitType) {
      case 'cm':
        length = length / 100;
        width = width / 100;
        depth = depth / 100;

        result = (
          length *
          width *
          depth *
          multiplier
        ).toFixed(2);

        this.setResult();
        break;

      case 'inch':
        result = (
          (length * width * depth * multiplier) /
          1728
        ).toFixed(2);

        this.setResult();
        break;
    }
  }

  render() {
    const { cubicInputUnitType } = this.context;
    return (
      <View style={styles.topContainer}>
        <View style={styles.settingsContainer}>
          <SettingsButton
            color='#f1f1f1'
            background='black'
            type='cubic'
          />
          <SettingsModal />
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Length({cubicInputUnitType}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.length}
              onChangeText={text =>
                this.setState({ length: text })
              }
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Width({cubicInputUnitType}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.width}
              onChangeText={text =>
                this.setState({ width: text })
              }
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Depth({cubicInputUnitType}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.depth}
              onChangeText={text =>
                this.setState({ depth: text })
              }
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Multiplier:{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.multiplier}
              onChangeText={text =>
                this.setState({ multiplier: text })
              }
              keyboardType={'numeric'}
            />
          </View>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.menuButtonContainer}>
            <MenuButton
              navigation={this.props.navigation}
            />
          </View>
          <TouchableOpacity
            onPress={this.calcCubic}
            style={styles.button}
            accessibilityLabel='Calculate'
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.resultText}>
            {this.state.cubicResult
              ? this.state.cubicResult
              : null}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    paddingTop: 10
  },
  midContainer: {
    height: 90,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 30
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30
  },
  settingsContainer: {
    position: 'absolute',
    top: 40,
    right: 20
  },
  picker: {
    height: 50,
    width: 100
  },
  inputsContainer: {
    padding: 40,
    paddingLeft: 20,
    paddingTop: 50
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 25,
    color: '#f1f1f1',
    paddingBottom: 10
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    width: 90,
    paddingTop: 16,
    marginBottom: 25,
    fontSize: 25,
    color: '#f1f1f1'
  },
  button: {
    marginBottom: 30,
    marginLeft: 30,
    width: 250,
    height: 60,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20
  },
  menuButtonContainer: {
    paddingBottom: 26
  },
  buttonText: {
    fontSize: 24,
    color: '#f1f1f1'
  },
  resultText: {
    color: '#f1f1f1',
    fontSize: 30
  }
});
