import React, { Component } from 'react';

const PalletContext = React.createContext();

class PalletProvider extends Component {
  state = {
    palletLength: '117',
    palletWidth: '117',
    palletHeight: '14.5',
    measurementUnit: 'cm',
    cartonLength: '',
    cartonWidth: '',
    cartonHeight: '',
    maxShippingHeight: '180',
    totalBoxes: null,
    totalLayers: null,
    boxesPerLayer: null,
    calculatePressed: false,
    precisionLength: null,
    precisionWidth: null,
    precisionHeight: null,
    precisionMaxShippingHeight: null,
    usePrecision: false
  };

  convertSettingsMeasurements = (newUnit, prevUnit) => {
    // Variables for inch calculations.
    // Storage of precision versions of any inch calculations is necessary as using rounded results only leads to incorrect conversions if the user changes unit type multiple times.
    let {
      precisionLength,
      precisionWidth,
      precisionHeight,
      precisionMaxShippingHeight
    } = this.state;

    let oldLength,
      oldWidth,
      oldHeight,
      oldMaxShippingHeight;

    if (this.state.usePrecision) {
      // Set current precision measurements from state.
      // Done for instances of having to convert to/from inches.
      oldLength = this.state.precisionLength;
      oldWidth = this.state.precisionWidth;
      oldHeight = this.state.precisionHeight;
      oldMaxShippingHeight = this.state
        .precisionMaxShippingHeight;
    } else {
      // Parse current measurements to integers
      oldLength = parseInt(this.state.palletLength);
      oldWidth = parseInt(this.state.palletWidth);
      oldHeight = parseInt(this.state.palletHeight);
      oldMaxShippingHeight = parseInt(
        this.state.maxShippingHeight
      );
    }

    // Convert measurements and set the results.
    if (newUnit === 'mm') {
      switch (prevUnit) {
        // cm to mm
        case 'cm':
          this.setState({
            palletLength: (oldLength * 100).toString(),
            palletWidth: (oldWidth * 100).toString(),
            palletHeight: (oldHeight * 100).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight * 100
            ).toString(),
            usePrecision: false
          });
          break;

        // inches to mm
        case 'inch':
          precisionLength = oldLength * 25.4;
          precisionWidth = oldWidth * 25.4;
          precisionHeight = oldHeight * 25.4;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 25.4;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        // metres to mm
        case 'm':
          this.setState({
            palletLength: (oldLength * 1000).toString(),
            palletWidth: (oldWidth * 1000).toString(),
            palletHeight: (oldHeight * 1000).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight * 1000
            ).toString(),
            usePrecision: false
          });
          break;

        default:
          break;
      }
    } else if (newUnit === 'cm') {
      switch (prevUnit) {
        // mm to cm
        case 'mm':
          this.setState({
            palletLength: (oldLength / 100).toString(),
            palletWidth: (oldWidth / 100).toString(),
            palletHeight: (oldHeight / 100).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 100
            ).toString(),
            usePrecision: false
          });
          break;

        // inches to cm
        case 'inch':
          precisionLength = oldLength * 2.54;
          precisionWidth = oldWidth * 2.54;
          precisionHeight = oldHeight * 2.54;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 2.54;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        // metres to cm
        case 'm':
          this.setState({
            palletLength: (oldLength * 100).toString(),
            palletWidth: (oldWidth * 100).toString(),
            palletHeight: (oldHeight * 100).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight * 100
            ).toString(),
            usePrecision: false
          });
          break;

        default:
          break;
      }
    } else if (newUnit === 'inch') {
      switch (prevUnit) {
        // mm to inches
        case 'mm':
          precisionLength = oldLength / 25.4;
          precisionWidth = oldWidth / 25.4;
          precisionHeight = oldHeight / 25.4;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 25.4;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        // cm to inches
        case 'cm':
          precisionLength = oldLength / 2.54;
          precisionWidth = oldWidth / 2.54;
          precisionHeight = oldHeight / 2.54;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 2.54;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        // metres to inches
        case 'm':
          precisionLength = oldLength * 39.37;
          precisionWidth = oldWidth * 39.37;
          precisionHeight = oldHeight * 39.37;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 39.37;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        default:
          break;
      }
    } else if (newUnit === 'm') {
      switch (prevUnit) {
        // mm to metres
        case 'mm':
          this.setState({
            palletLength: (oldLength / 1000).toString(),
            palletWidth: (oldWidth / 1000).toString(),
            palletHeight: (oldHeight / 1000).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 1000
            ).toString(),
            usePrecision: false
          });
          break;

        // cm to metres
        case 'cm':
          this.setState({
            palletLength: (oldLength / 100).toString(),
            palletWidth: (oldWidth / 100).toString(),
            palletHeight: (oldHeight / 100).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 100
            ).toString(),
            usePrecision: false
          });
          break;

        // inches to metres
        case 'inch':
          precisionLength = oldLength / 39.37;
          precisionWidth = oldWidth / 39.37;
          precisionHeight = oldHeight / 39.37;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 39.37;
          this.setState({
            palletLength: precisionLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionLength,
            precisionWidth,
            precisionHeight,
            precisionMaxShippingHeight,
            usePrecision: true
          });
          break;

        default:
          break;
      }
    }
  };

  handleUnitChange = (param, input, prevUnit) => {
    switch (param) {
      case 'palletLength':
        this.setState({ palletLength: input });
        break;

      case 'palletWidth':
        this.setState({ palletWidth: input });
        break;

      case 'palletHeight':
        this.setState({ palletHeight: input });
        break;

      case 'cartonLength':
        this.setState({ cartonLength: input });
        break;

      case 'cartonWidth':
        this.setState({ cartonWidth: input });
        break;

      case 'cartonHeight':
        this.setState({ cartonHeight: input });
        break;

      case 'measurementUnit':
        this.setState({ measurementUnit: input });
        this.convertSettingsMeasurements(input, prevUnit);
        break;

      case 'maxShippingHeight':
        this.setState({ maxShippingHeight: input });
        break;

      default:
        break;
    }
  };

  setResult = (totalLayers, boxesPerLayer, totalBoxes) => {
    this.setState({
      totalLayers: totalLayers.toString(),
      boxesPerLayer: boxesPerLayer.toString(),
      totalBoxes: totalBoxes.toString(),
      calculatePressed: true
    });
  };

  calcPallet = () => {
    const measurements = { ...this.state };

    // Check for empty carton measurement fields. Returns if any are empty.
    if (
      (measurements.cartonHeight ||
        measurements.cartonLength ||
        measurements.cartonWidth) === null
    )
      return;

    // Reset result values in state. Probably not necessary. CHECK LATER!
    this.setState({
      totalBoxes: null,
      totalLayers: null,
      boxesPerLayer: null
    });

    let maxLayersHeight =
      // Gives result in cm.
      parseInt(measurements.maxShippingHeight) -
      parseInt(measurements.palletHeight);

    let cartonLength = parseInt(measurements.cartonLength);
    let cartonWidth = parseInt(measurements.cartonWidth);
    let cartonHeight = parseInt(measurements.cartonHeight);
    let palletLength = parseInt(measurements.palletLength);
    let palletWidth = parseInt(measurements.palletWidth);
    let boxesPerLayer, totalBoxes;

    if (measurements.measurementUnit !== 'cm') {
      // Convert current cm measurements to users selected
    }

    let totalLayers = Math.floor(
      maxLayersHeight / cartonHeight
    );

    let layer1 = Math.floor(palletWidth / cartonWidth);
    let layer2 = Math.floor(palletWidth % cartonWidth);
    let layer3 = Math.floor(palletLength / cartonWidth);
    let layer4 = palletLength % cartonWidth;

    if (layer2 > 0) {
      layer2 = Math.floor(layer2 / cartonLength);
    }

    if (layer2 == 0) {
      // Check for double row or triple row
      let flatRows = Math.floor(
        palletLength / cartonLength
      );
      let verticalRows = Math.floor(flatRows % flatRows);
      if (verticalRows >= 1) {
        // Triple layer
        console.log('triple layer');
        let verticalRowsHeight = Math.floor(
          maxLayersHeight / cartonLength
        );
        let verticalRowsBoxes = layer1 * verticalRows;
        boxesPerLayer =
          flatRows * layer1 +
          verticalRowsBoxes * verticalRowsHeight;
        totalBoxes = boxesPerLayer * totalLayers;
        this.setResult(
          totalLayers,
          boxesPerLayer,
          totalBoxes
        );
        // *FUTURE ADDITION* Set diagram of layout to be displayed.
        return;
      }
    }

    if (layer4 >= 1) {
      layer4 = Math.floor(layer4 / cartonLength);
    }

    if (layer1 == layer3 && layer2 == layer4) {
      // Square pattern
      console.log('square pattern');
      boxesPerLayer = (layer1 + layer2) * 2;
      totalBoxes = boxesPerLayer * totalLayers;
      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes
      );
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
      return;
    }

    if ((layer1 && layer3) == 1) {
      // Single stack.
      console.log('Single stack');
    }
  };

  render() {
    return (
      <PalletContext.Provider
        value={{
          ...this.state,
          handleUnitChange: this.handleUnitChange,
          calcPallet: this.calcPallet
        }}
      >
        {this.props.children}
      </PalletContext.Provider>
    );
  }
}

export { PalletContext, PalletProvider };
