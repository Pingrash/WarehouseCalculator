import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View
} from 'react-native';

export default class PalletEstimator extends Component {
  constructor() {
    super();
    this.state = {
      cartonLength: null,
      cartonWidth: null
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
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
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>Bottom Container</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'red'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'blue'
  },
  text: {
    color: '#f1f1f1',
    fontSize: 24
  }
});
