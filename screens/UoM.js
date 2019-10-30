import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import MenuButton from '../components/MenuButton';

export default class UoM extends Component {
  constructor() {
    super();
    this.state = {
      required: '',
      cartonQty: '',
      cartons: '',
      loose: ''
    };
    this.calcRequired = this.calcRequired.bind(this);
  }

  calcRequired() {
    // Check if either of the input fields are empty, returns out of function if either true
    if (
      this.state.required === '' ||
      this.state.cartonQty === ''
    )
      return;
    // Dismiss the keyboard, will stay on screen otherwise
    Keyboard.dismiss();
    // Set variables
    // required and cartonQty need to be passed into Integers for calculations to work
    let required = parseInt(this.state.required);
    let cartonQty = parseInt(this.state.cartonQty);
    let cartons, loose;

    // cartons result needs to be floored to remove decimals and avoid error on loose equation
    cartons = Math.floor(required / cartonQty);
    loose = required - cartonQty * cartons;

    // Results are parsed to strings for state so they can be displayed properly in result fields
    this.setState({
      cartons: cartons.toString(),
      loose: loose.toString()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, styles.topInput]}>
              Quantity Required
            </Text>
            <TextInput
              style={styles.input}
              value={this.state.required}
              onChangeText={text =>
                this.setState({ required: text })
              }
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Carton Qty</Text>
            <TextInput
              style={styles.input}
              value={this.state.cartonQty}
              onChangeText={text =>
                this.setState({ cartonQty: text })
              }
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.menuButtonContainer}>
              <MenuButton
                navigation={this.props.navigation}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.calcRequired()}
              style={styles.button}
              accessibilityLabel='Calculate'
            >
              <Text style={styles.buttonText}>
                Calculate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.resultsContainer}>
          <View style={styles.resultContainer}>
            <Text
              style={[styles.label, styles.bottomLabel]}
            >
              Cartons Required: {this.state.cartons}
            </Text>
          </View>
          <View style={styles.resultContainer}>
            <Text
              style={[styles.label, styles.bottomLabel]}
            >
              Loose Qty Required: {this.state.loose}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputsContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 30
  },
  inputContainer: {
    alignItems: 'center',
    flex: 1
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  resultsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 20
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  label: {
    fontSize: 30,
    color: '#f1f1f1'
  },
  bottomLabel: {
    fontSize: 25
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    width: 200,
    paddingTop: 18,
    fontSize: 25,
    color: '#f1f1f1'
  },
  topInput: {
    paddingTop: 25
  },
  button: {
    marginBottom: 30,
    marginLeft: 50,
    width: 250,
    height: 60,
    backgroundColor: '#506680',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20
  },
  buttonText: {
    fontSize: 24,
    color: '#f1f1f1'
  },
  menuButtonContainer: {
    paddingBottom: 30,
    paddingLeft: 5
  }
});
