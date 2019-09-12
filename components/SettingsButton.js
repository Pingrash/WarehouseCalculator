import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalContext } from '../context/GlobalContext';

export default class MenuButton extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
  }

  render() {
    const { setModalVisible, modalVisible } = this.context;
    const { color, background, type } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            setModalVisible(!modalVisible, type)
          }
          style={{ backgroundColor: background }}
        >
          <Icon
            name='md-settings'
            size={40}
            color={color}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
