import React, { Component } from 'react';
import { GlobalContext } from './GlobalContext';

const CubicContext = React.createContext();

class CubicProvider extends Component {
  static contextType = GlobalContext;

  state = {
    cubicInputUnitType: 'cm',
    cubicOutputUnitType: 'm'
  };

  handleUnitChange = (io, type) => {
    switch (io) {
      case 'input':
        this.setState({ cubicInputUnitType: type });
        break;

      case 'output':
        this.setState({ cubicOutputUnitType: type });
        break;
      default:
        break;
    }
  };

  render() {
    const { modalVisible, setModalVisible } = this.context;

    return (
      <CubicContext.Provider
        value={{
          ...this.state,
          handleUnitChange: this.handleUnitChange,
          setModalVisible,
          modalVisible
        }}
      >
        {this.props.children}
      </CubicContext.Provider>
    );
  }
}

export { CubicContext, CubicProvider };
