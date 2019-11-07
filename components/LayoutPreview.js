import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { PalletContext } from '../context/PalletContext';

export default class LayoutPreview extends Component {
  static contextType = PalletContext;
  render() {
    const { layoutType } = this.context;

    return (
      <View style={styles.container}>
        {layoutType === 'single' ? (
          <Image
            source={require('../assets/singleLayer.png')}
            style={styles.image}
          />
        ) : null}
        {layoutType === 'brick' ? (
          <Image
            source={require('../assets/brickLayer.png')}
            style={styles.image}
          />
        ) : null}
        {layoutType === 'castle' ? (
          <Image
            source={require('../assets/castleLayer.png')}
            style={styles.image}
          />
        ) : null}
        {layoutType === 'square' ? (
          <Image
            source={require('../assets/squareLayer.png')}
            style={styles.image}
          />
        ) : null}
        {layoutType === 'triple' ? (
          <Image
            source={require('../assets/tripleLayer.png')}
            style={styles.image}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 300,
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
});
