import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Picker
} from 'react-native';
import MenuButton from '../components/MenuButton';
import SettingsButton from '../components/SettingsButton';
import SettingsModal from '../components/SettingsModal';
import { PalletContext } from '../context/PalletContext';
import PalletSummary from '../components/PalletSummary';
import Error from '../components/Error';

export default class PalletEstimator extends Component {
  static contextType = PalletContext;

  render() {
    const {
      cartonLength = '',
      cartonWidth = '',
      cartonHeight = '',
      cartonWeight = '',
      handleUnitChange,
      calcPallet,
      calculatePressed,
      measurementUnit,
      weightUnit,
      error,
      sideLay,
      defaultsRetrieved,
      applyDefaults
    } = this.context;

    if (!defaultsRetrieved) applyDefaults();

    return (
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.settingsContainer}>
            <SettingsButton
              color='#f1f1f1'
              background='#081B33'
              type='pallet'
            />
            <SettingsModal />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Carton Length ({measurementUnit}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={cartonLength}
              onChangeText={text =>
                handleUnitChange('cartonLength', text)
              }
              keyboardType={'numeric'}
            />
            <Text style={styles.inputLabel}>
              Carton Width ({measurementUnit}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={cartonWidth}
              onChangeText={text =>
                handleUnitChange('cartonWidth', text)
              }
              keyboardType={'numeric'}
            />
            <Text style={styles.inputLabel}>
              Carton Height ({measurementUnit}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={cartonHeight}
              onChangeText={text =>
                handleUnitChange('cartonHeight', text)
              }
              keyboardType={'numeric'}
            />
            <Text style={styles.inputLabel}>
              Carton Weight ({weightUnit}):{'  '}
            </Text>
            <TextInput
              style={styles.input}
              value={cartonWeight}
              onChangeText={text =>
                handleUnitChange('cartonWeight', text)
              }
              keyboardType={'numeric'}
            />
            <Text style={styles.inputLabel}>
              Carton can be placed on side:{' '}
            </Text>
            <Picker
              selectedValue={sideLay}
              style={styles.picker}
              onValueChange={itemValue =>
                handleUnitChange('sideLay', itemValue)
              }
              mode='dialog'
            >
              <Picker.Item label='True' value={true} />
              <Picker.Item label='False' value={false} />
            </Picker>
          </View>
          <Text style={styles.helperText}>
            Pallet parameters and shipping conditions can be
            changed in the settings menu.
          </Text>
        </View>
        <View style={styles.midContainer}>
          <View style={styles.menuButtonContainer}>
            <MenuButton
              navigation={this.props.navigation}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              calcPallet();
            }}
            style={styles.button}
            accessibilityLabel='Calculate'
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          {calculatePressed ? <PalletSummary /> : null}
          {error ? <Error /> : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  settingsContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1
  },
  topContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20
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
    flex: 1,
    paddingBottom: 20
  },
  menuButtonContainer: {
    paddingBottom: 26
  },
  inputContainer: {
    padding: 30
  },
  inputLabel: {
    color: '#f1f1f1',
    fontSize: 25
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    width: 110,
    paddingTop: 16,
    marginBottom: 22,
    fontSize: 25,
    color: '#f1f1f1'
  },
  button: {
    marginBottom: 30,
    marginLeft: 40,
    width: 250,
    height: 60,
    backgroundColor: '#506680',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20
  },
  buttonText: {
    color: '#f1f1f1',
    fontSize: 24
  },
  resultText: {
    fontSize: 25,
    color: '#f1f1f1'
  },
  helperText: {
    fontSize: 20,
    color: '#f1f1f1',
    paddingLeft: 20,
    paddingTop: 0
  },
  picker: {
    height: 40,
    width: 100,
    //transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
    marginLeft: 30,
    color: '#f1f1f1',
    backgroundColor: '#767D92',
    marginTop: 15
  }
});
