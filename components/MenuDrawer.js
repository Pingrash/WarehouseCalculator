import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

// Dimension variables of device window for use when sizing the drawer.
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class MenuDrawer extends Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{ height: 80 }}
        onPress={() => {
          this.props.navigation.navigate(nav);
        }}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.topText}>Menu</Text>
        </View>
        <View style={styles.links}>
          {this.navLink('Home', 'Calculator')}
          {this.navLink('UoM', 'Unit Of Measurement')}
          {this.navLink('Cubic', 'Cubic Measurement')}
          {this.navLink(
            'PalletEstimator',
            'Pallet Estimator'
          )}
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.bottomText}>
            Created by Lachlan Mackenzie | 2019 v1.1a
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topSection: {
    height: 150,
    backgroundColor: '#353C51',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topText: {
    color: '#f1f1f1',
    fontSize: 46
  },
  links: {
    flex: 1,
    backgroundColor: '#767D92',
    paddingTop: 5,
    paddingBottom: 5
  },
  link: {
    flex: 1,
    fontSize: 26,
    fontWeight: '400',
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
    color: '#f1f1f1'
  },
  bottomSection: {
    height: 40,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f1f1f1'
  },
  bottomText: {
    paddingLeft: 15,
    fontSize: 15
  }
});
