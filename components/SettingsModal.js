import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import SettingsButton from './SettingsButton';
import CubicSettings from './CubicSettings';
import PalletSettings from './PalletSettings';

export default class SettingsModal extends Component {
  static contextType = GlobalContext;

  constructor() {
    super();
  }

  render() {
    const {
      modalVisible,
      setModalVisible,
      modalType
    } = this.context;
    return (
      <View>
        <Modal
          animationType='fade'
          transparent={false}
          visible={modalVisible}
          style={styles.modal}
          onRequestClose={() =>
            setModalVisible(false, null)
          }
        >
          <View style={styles.buttonContainer}>
            <SettingsButton
              color='black'
              background='#f6f6f6'
            />
          </View>
          {modalType === 'pallet' ? (
            <PalletSettings />
          ) : modalType === 'cubic' ? (
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
    width: 600
  },
  buttonContainer: {
    position: 'absolute',
    top: 18,
    right: 20,
    zIndex: 1
  }
});
