import React, { Component } from 'react';

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  state = {
    modalVisible: false,
    modalType: null
  };

  setModalVisible = (visible, type) => {
    this.setState({
      modalVisible: visible,
      modalType: type
    });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setModalVisible: this.setModalVisible
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export { GlobalContext, GlobalProvider };
