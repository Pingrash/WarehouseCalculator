/* 
  Things to be added later:
    - Pallet layout diagram (do as a seperate component)
*/

import React, { Component } from 'react';

const PalletContext = React.createContext();

class PalletProvider extends Component {
  state = {
    palletLength: '117',
    palletWidth: '117',
    palletHeight: '14.5',
    palletWeight: '30',
    measurementUnit: 'cm',
    cartonLength: '',
    cartonWidth: '',
    cartonHeight: '',
    cartonWeight: '',
    maxShippingHeight: '180',
    maxShippingWeight: '1000',
    weightUnit: 'kg',
    totalBoxes: '',
    totalLayers: null,
    boxesPerLayer: null,
    layoutType: null,
    calculatePressed: false,
    precisionLength: null,
    precisionWidth: null,
    precisionHeight: null,
    precisionMaxShippingHeight: null,
    usePrecisionMeasurements: false,
    precisionPalletWeight: null,
    precisionCartonWeight: null,
    precisionMaxShippingWeight: null,
    totalPalletWeight: null
  };

  // Function that handles the conversion of measurements when the unit type is changed in settings.
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

    if (this.state.usePrecisionMeasurements) {
      // Set current precision measurements from state.
      // Done for instances of having to convert to/from inches.
      oldLength = this.state.precisionLength;
      oldWidth = this.state.precisionWidth;
      oldHeight = this.state.precisionHeight;
      oldMaxShippingHeight = this.state
        .precisionMaxShippingHeight;
    } else {
      // Parse current measurements to integers
      oldLength = parseFloat(this.state.palletLength);
      oldWidth = parseFloat(this.state.palletWidth);
      oldHeight = parseFloat(this.state.palletHeight);
      oldMaxShippingHeight = parseFloat(
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: true
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: true
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: true
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
            usePrecisionMeasurements: true
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
            usePrecisionMeasurements: true
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: false
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
            usePrecisionMeasurements: true
          });
          break;

        default:
          break;
      }
    }
  };

  // Weight conversion function for when the weight unit is changed in settings.
  // Both a precision and a rounded version of the new weight are stored in state. The rounded one is parsed to string to be displayed on screen. The precision one is utilised for cases where they change the unit back to give accurate conversions based on their original input.
  convertWeights = (newUnit, prevUnit) => {
    // If the precision version is present in state then that is used. Otherwise the normal weight can be used as it can be assumed that it is the original user entry.
    let palletWeight = this.state.precisionPalletWeight
      ? parseFloat(this.state.precisionPalletWeight)
      : parseFloat(this.state.palletWeight);

    let cartonWeight = this.state.precisionCartonWeight
      ? parseFloat(this.state.precisionCartonWeight)
      : parseFloat(this.state.cartonWeight);

    let maxShippingWeight = this.state
      .precisionMaxShippingWeight
      ? parseFloat(this.state.precisionMaxShippingWeight)
      : parseFloat(this.state.maxShippingWeight);

    if (newUnit === 'kg' && prevUnit === 'lbs') {
      // Convert pounds to kilograms
      palletWeight = palletWeight / 2.205;
      cartonWeight = cartonWeight / 2.205;
      maxShippingWeight = maxShippingWeight / 2.205;
    } else if (newUnit === 'lbs' && prevUnit === 'kg') {
      // Convert kilograms to pounds
      palletWeight = palletWeight * 2.205;
      cartonWeight = cartonWeight * 2.205;
      maxShippingWeight = maxShippingWeight * 2.205;
    }

    // Pallet and carton weight are fixed to two decimal places and parsed to strings.
    // This is done outside of setState to simplify a validation check later.
    palletWeight = palletWeight.toFixed(2).toString();
    cartonWeight = cartonWeight.toFixed(2).toString();

    /* Set results to state.
     Precision weights are stored in their current state.
     Display weights are rounded and parsed to string if they haven't already.
     An isNaN check is used for cartonWeight and palletWeight to avoid 'NaN' being displayed is the user had not entered a weight before the conversion.
    */
    this.setState({
      precisionPalletWeight: palletWeight,
      precisionCartonWeight: cartonWeight,
      precisionMaxShippingWeight: maxShippingWeight,
      palletWeight: isNaN(palletWeight)
        ? null
        : palletWeight,
      cartonWeight: isNaN(cartonWeight)
        ? null
        : cartonWeight,
      maxShippingWeight: Math.floor(
        maxShippingWeight
      ).toString(),
      weightUnit: newUnit
    });
  };

  // Handler function for measurement inputs.
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

      case 'cartonWeight':
        this.setState({ cartonWeight: input });
        break;

      case 'palletWeight':
        this.setState({ palletWeight: input });
        break;

      case 'weightUnit':
        this.convertWeights(input, prevUnit);
        break;

      default:
        break;
    }
  };

  // Verify total boxes is below weight limit for shipping and adjust accordingly.
  verifyWeight = boxes => {
    const maxShippingWeight = parseFloat(
      this.state.maxShippingWeight
    );
    const cartonWeight = parseFloat(
      this.state.cartonWeight
    );
    const palletWeight = parseFloat(
      this.state.palletWeight
    );
    let totalBoxes = boxes;

    // Calculate current pallet weight based on the current box total.
    let weight = cartonWeight * totalBoxes + palletWeight;

    // If current weight is above the maximum then calculate a new box total based on the maximum weight divided by the carton weight.
    if (weight > maxShippingWeight) {
      totalBoxes = Math.floor(
        (maxShippingWeight - palletWeight) / cartonWeight
      );
      weight = cartonWeight * totalBoxes + palletWeight;
    }

    // Set the results to state.
    this.setState({
      totalBoxes: totalBoxes.toString(),
      totalPalletWeight: weight.toString()
    });
  };

  // Sets the results from the calcPallet function to state.
  setResult = (
    totalLayers,
    boxesPerLayer,
    totalBoxes,
    layoutType
  ) => {
    this.setState({
      totalLayers: totalLayers.toString(),
      boxesPerLayer: boxesPerLayer.toString(),
      layoutType,
      calculatePressed: true
    });
    this.verifyWeight(totalBoxes);
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

    let cartonLength = parseFloat(
      measurements.cartonLength
    );
    let cartonWidth = parseFloat(measurements.cartonWidth);
    let cartonHeight = parseFloat(
      measurements.cartonHeight
    );
    let palletLength = parseFloat(
      measurements.palletLength
    );
    let palletWidth = parseFloat(measurements.palletWidth);
    let boxesPerLayer, totalBoxes;

    let maxLayersHeight =
      parseFloat(measurements.maxShippingHeight) -
      parseFloat(measurements.palletHeight);

    let longestSide =
      cartonLength > cartonWidth
        ? cartonLength
        : cartonWidth;
    let shortestSide =
      cartonLength < cartonWidth
        ? cartonLength
        : cartonWidth;

    let totalLayers = Math.floor(
      maxLayersHeight / cartonHeight
    );

    let stackTypes = 0;
    let types = [];

    let layer1 = Math.floor(palletWidth / shortestSide);
    let layer2 = Math.floor(
      (palletWidth % shortestSide) / longestSide
    );
    let layer3 = Math.floor(palletLength / longestSide);
    let layer4 = Math.floor(
      (palletLength % longestSide) / shortestSide
    );
    let layer5 = Math.floor(palletWidth / longestSide);
    let layer6 = Math.floor(
      (palletWidth % longestSide) / shortestSide
    );
    let layer7 = Math.floor(palletLength / shortestSide);
    let layer8 = Math.floor(
      (palletLength % shortestSide) / longestSide
    );
    let layer9 = Math.floor(palletWidth % cartonHeight);
    let layer10 = Math.floor(palletLength % shortestSide);

    // Single Stack
    if (
      (layer1 || layer5) == 1 &&
      (layer3 || layer7) == 1 &&
      (layer2 && layer4 && layer6 && layer8) < 1
    ) {
      console.log('Single Stack');
      boxesPerLayer = 1;
      totalBoxes = boxesPerLayer * totalLayers;
      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'single'
      );
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
      stackTypes++;
    }

    // Square Stack
    if ((layer2 && layer4 && layer6 && layer8) < 1) {
      let bestFit = Math.max(layer3, layer7);
      if (bestFit == layer3)
        boxesPerLayer = bestFit * layer5;
      else if (bestFit == layer7)
        boxesPerLayer = bestFit * layer1;

      totalBoxes = boxesPerLayer * totalLayers;
      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'square'
      );
      console.log('Square Stack');
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
      return;
    }

    // Triple Stack
    if (layer9 >= 1) {
      let outerLayersBoxes = layer7 * layer5;
      let innerLayers = layer9 * layer10;
      let totalInnerLayers = Math.floor(
        maxLayersHeight / longestSide
      );
      //let innerHeight = cartonWidth * innerLayers;
      totalBoxes =
        outerLayersBoxes * totalLayers +
        innerLayers * totalInnerLayers;

      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'triple'
      );
      console.log('Triple Stack');
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
      return;
    }

    // Castle Stack
    if ((layer2 || layer4 || layer6 || layer8) == 1) {
      let totalMiddleLayers = Math.floor(
        maxLayersHeight / shortestSide
      );

      totalBoxes = totalLayers * 4 + totalMiddleLayers * 4;

      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'castle'
      );
    }

    // Brick Stack
    if (layer1 == layer3 && layer2 == layer4) {
      console.log('Brick Stack');
      boxesPerLayer = layer7 * 4;
      totalBoxes = boxesPerLayer * totalLayers;
      this.setResult(
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'brick'
      );
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
      return;
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
