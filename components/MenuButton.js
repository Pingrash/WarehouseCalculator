import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default class MenuButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.toggleDrawer()
          }
        >
          <Icon
            name='dots-three-vertical'
            size={28}
            color='#f1f1f1'
          />
        </TouchableOpacity>
      </View>
    );
  }
}
