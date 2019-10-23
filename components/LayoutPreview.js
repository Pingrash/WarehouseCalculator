import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { PalletContext } from '../context/PalletContext';
import SvgUri from 'react-native-svg-uri';

export default class LayoutPreview extends Component {
  static contextType = PalletContext;
  render() {
    const { layoutType } = this.context;
    let path = '';

    // Set path based on the layout type set in state.
    switch (layoutType) {
      case 'single':
        path = '../assets/singleLayer.svg';
        break;
      case 'square':
        path = '../assets/squareLayer.svg';
        break;
      case 'triple':
        path = '../assets/tripleLayer.svg';
        break;
      case 'castle':
        path = '../assets/castleLayer.svg';
        break;
      case 'brick':
        path = '../assets/brickLayer.svg';
        break;
      default:
        break;
    }

    return (
      <View style={styles.container}>
        <SvgUri
          width='200'
          height='200'
          source={require(path)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
