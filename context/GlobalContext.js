import React, { Component } from 'react';

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
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
