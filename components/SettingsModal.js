import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Picker
} from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import SettingsButton from './SettingsButton';
import CubicSettings from './CubicSettings';

export default class SettingsModal extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
  }

  render() {
    const { modalVisible, setModalVisible } = this.context;
    const { settingsType } = this.props;
    console.log(settingsType);
    return (
      <View>
        <Modal
          animationType='fade'
          transparent={false}
          visible={modalVisible}
          style={styles.modal}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.buttonContainer}>
            <SettingsButton
              color='black'
              background='white'
            />
          </View>
          {settingsType === 'cubic' ? (
            <CubicSettings />
          ) : null}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    height: 600,
    width: 600,
    backgroundColor: 'white'
  },
  buttonContainer: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 1
  }
});
