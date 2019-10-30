/* 
  Things to be added later:
    - Pallet layout diagram (do as a seperate component).
    - Add ability for calcPallet to use the carton's height as the long side.
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
    precisionPalletLength: null,
    precisionPalletWidth: null,
    precisionPalletHeight: null,
    precisionCartonLength: null,
    precisionCartonWidth: null,
    precisionCartonHeight: null,
    precisionMaxShippingHeight: null,
    usePrecisionMeasurements: false,
    precisionPalletWeight: null,
    precisionCartonWeight: null,
    precisionMaxShippingWeight: null,
    precisionTotalPalletWeight: null,
    totalPalletWeight: null,
    totalPalletHeight: null,
    heightAdjusted: false,
    error: false,
    errorType: null,
    sideLay: true
  };

  // Function that handles the conversion of measurements when the unit type is changed in settings.
  convertMeasurements = (newUnit, prevUnit) => {
    // Variables for inch calculations.
    // Storage of precision versions of any inch calculations is necessary as using rounded results only leads to incorrect conversions if the user changes unit type multiple times.
    let {
      precisionPalletLength,
      precisionPalletWidth,
      precisionPalletHeight,
      precisionCartonLength,
      precisionCartonWidth,
      precisionCartonHeight,
      precisionMaxShippingHeight
    } = this.state;

    let oldPalletLength,
      oldPalletWidth,
      oldPalletHeight,
      oldCartonLength,
      oldCartonWidth,
      oldCartonHeight,
      oldMaxShippingHeight;

    if (this.state.usePrecisionMeasurements) {
      // Set current precision measurements from state.
      // Done for instances of having to convert to/from inches.
      oldPalletLength = this.state.precisionPalletLength;
      oldPalletWidth = this.state.precisionPalletWidth;
      oldPalletHeight = this.state.precisionPalletHeight;
      oldCartonLength = this.state.precisionCartonLength;
      oldCartonWidth = this.state.precisionCartonWidth;
      oldCartonHeight = this.state.precisionCartonHeight;
      oldMaxShippingHeight = this.state
        .precisionMaxShippingHeight;
    } else {
      // Parse current measurements to integers
      oldPalletLength = parseFloat(this.state.palletLength);
      oldPalletWidth = parseFloat(this.state.palletWidth);
      oldPalletHeight = parseFloat(this.state.palletHeight);
      oldCartonLength = parseFloat(this.state.cartonLength);
      oldCartonWidth = parseFloat(this.state.cartonWidth);
      oldCartonHeight = parseFloat(this.state.cartonHeight);
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
            palletLength: (
              oldPalletLength * 100
            ).toString(),
            palletWidth: (oldPalletWidth * 100).toString(),
            palletHeight: (
              oldPalletHeight * 100
            ).toString(),
            cartonLength: (
              oldCartonLength * 100
            ).toString(),
            cartonWidth: (oldCartonWidth * 100).toString(),
            cartonHeight: (
              oldCartonHeight * 100
            ).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight * 100
            ).toString(),
            usePrecisionMeasurements: false
          });
          break;

        // inches to mm
        case 'inch':
          precisionPalletLength = oldPalletLength * 25.4;
          precisionPalletWidth = oldPalletWidth * 25.4;
          precisionPalletHeight = oldPalletHeight * 25.4;
          precisionCartonLength = oldCartonLength * 25.4;
          precisionCartonWidth = oldCartonWidth * 25.4;
          precisionCartonHeight = oldCartonHeight * 25.4;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 25.4;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
            precisionMaxShippingHeight,
            usePrecisionMeasurements: true
          });
          break;

        // metres to mm
        case 'm':
          this.setState({
            palletLength: (
              oldPalletLength * 1000
            ).toString(),
            palletWidth: (oldPalletWidth * 1000).toString(),
            palletHeight: (
              oldPalletHeight * 1000
            ).toString(),
            cartonLength: (
              oldCartonLength * 1000
            ).toString(),
            cartonWidth: (oldCartonWidth * 1000).toString(),
            cartonHeight: (
              oldCartonHeight * 1000
            ).toString(),
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
            palletLength: (
              oldPalletLength / 100
            ).toString(),
            palletWidth: (oldPalletWidth / 100).toString(),
            palletHeight: (
              oldPalletHeight / 100
            ).toString(),
            cartonLength: (
              oldCartonLength / 100
            ).toString(),
            cartonWidth: (oldCartonWidth / 100).toString(),
            cartonHeight: (
              oldCartonHeight / 100
            ).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 100
            ).toString(),
            usePrecisionMeasurements: false
          });
          break;

        // inches to cm
        case 'inch':
          precisionPalletLength = oldPalletLength * 2.54;
          precisionPalletWidth = oldPalletWidth * 2.54;
          precisionPalletHeight = oldPalletHeight * 2.54;
          precisionCartonLength = oldCartonLength * 2.54;
          precisionCartonWidth = oldCartonWidth * 2.54;
          precisionCartonHeight = oldCartonHeight * 2.54;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 2.54;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
            precisionMaxShippingHeight,
            usePrecisionMeasurements: true
          });
          break;

        // metres to cm
        case 'm':
          this.setState({
            palletLength: (
              oldPalletLength * 100
            ).toString(),
            palletWidth: (oldPalletWidth * 100).toString(),
            palletHeight: (
              oldPalletHeight * 100
            ).toString(),
            cartonLength: (
              oldCartonLength * 100
            ).toString(),
            cartonWidth: (oldCartonWidth * 100).toString(),
            cartonHeight: (
              oldCartonHeight * 100
            ).toString(),
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
          precisionPalletLength = oldPalletLength / 25.4;
          precisionPalletWidth = oldPalletWidth / 25.4;
          precisionPalletHeight = oldPalletHeight / 25.4;
          precisionCartonLength = oldCartonLength / 25.4;
          precisionCartonWidth = oldCartonWidth / 25.4;
          precisionCartonHeight = oldCartonHeight / 25.4;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 25.4;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
            precisionMaxShippingHeight,
            usePrecisionMeasurements: true
          });
          break;

        // cm to inches
        case 'cm':
          precisionPalletLength = oldPalletLength / 2.54;
          precisionPalletWidth = oldPalletWidth / 2.54;
          precisionPalletHeight = oldPalletHeight / 2.54;
          precisionCartonLength = oldCartonLength / 2.54;
          precisionCartonWidth = oldCartonWidth / 2.54;
          precisionCartonHeight = oldCartonHeight / 2.54;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 2.54;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
            precisionMaxShippingHeight,
            usePrecisionMeasurements: true
          });
          break;

        // metres to inches
        case 'm':
          precisionPalletLength = oldPalletLength * 39.37;
          precisionPalletWidth = oldPalletWidth * 39.37;
          precisionPalletHeight = oldPalletHeight * 39.37;
          precisionCartonLength = oldCartonLength * 39.37;
          precisionCartonWidth = oldCartonWidth * 39.37;
          precisionCartonHeight = oldCartonHeight * 39.37;
          precisionMaxShippingHeight =
            oldMaxShippingHeight * 39.37;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
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
            palletLength: (
              oldPalletLength / 1000
            ).toString(),
            palletWidth: (oldPalletWidth / 1000).toString(),
            palletHeight: (
              oldPalletHeight / 1000
            ).toString(),
            cartonLength: (
              oldCartonLength / 1000
            ).toString(),
            cartonWidth: (oldCartonWidth / 1000).toString(),
            cartonHeight: (
              oldCartonHeight / 1000
            ).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 1000
            ).toString(),
            usePrecisionMeasurements: false
          });
          break;

        // cm to metres
        case 'cm':
          this.setState({
            cartonLength: (
              oldCartonLength / 100
            ).toString(),
            cartonWidth: (oldCartonWidth / 100).toString(),
            cartonHeight: (
              oldCartonHeight / 100
            ).toString(),
            maxShippingHeight: (
              oldMaxShippingHeight / 100
            ).toString(),
            usePrecisionMeasurements: false
          });
          break;

        // inches to metres
        case 'inch':
          precisionPalletLength = oldPalletLength / 39.37;
          precisionPalletWidth = oldPalletWidth / 39.37;
          precisionPalletHeight = oldPalletHeight / 39.37;
          precisionCartonLength = oldCartonLength / 39.37;
          precisionCartonWidth = oldCartonWidth / 39.37;
          precisionCartonHeight = oldCartonHeight / 39.37;
          precisionMaxShippingHeight =
            oldMaxShippingHeight / 39.37;
          this.setState({
            palletLength: precisionPalletLength
              .toFixed(2)
              .toString(),
            palletWidth: precisionPalletWidth
              .toFixed(2)
              .toString(),
            palletHeight: precisionPalletHeight
              .toFixed(2)
              .toString(),
            cartonLength: precisionCartonLength
              .toFixed(2)
              .toString(),
            cartonWidth: precisionCartonWidth
              .toFixed(2)
              .toString(),
            cartonHeight: precisionCartonHeight
              .toFixed(2)
              .toString(),
            maxShippingHeight: precisionMaxShippingHeight
              .toFixed(2)
              .toString(),
            precisionPalletLength,
            precisionPalletWidth,
            precisionPalletHeight,
            precisionCartonLength,
            precisionCartonWidth,
            precisionCartonHeight,
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

    let totalPalletWeight = this.state
      .precisionTotalPalletWeight
      ? this.state.precisionTotalPalletWeight
      : parseFloat(this.state.totalPalletWeight);

    if (newUnit === 'kg' && prevUnit === 'lbs') {
      // Convert pounds to kilograms
      palletWeight = palletWeight / 2.205;
      cartonWeight = cartonWeight / 2.205;
      maxShippingWeight = maxShippingWeight / 2.205;
      totalPalletWeight = totalPalletWeight / 2.205;
    } else if (newUnit === 'lbs' && prevUnit === 'kg') {
      // Convert kilograms to pounds
      palletWeight = palletWeight * 2.205;
      cartonWeight = cartonWeight * 2.205;
      maxShippingWeight = maxShippingWeight * 2.205;
      totalPalletWeight = totalPalletWeight * 2.205;
    }

    // Pallet and carton weight are fixed to two decimal places and parsed to strings.
    // This is done outside of setState to simplify a validation check later.
    let newPalletWeight = palletWeight
      .toFixed(2)
      .toString();
    let newCartonWeight = cartonWeight
      .toFixed(2)
      .toString();
    let newTotalPalletWeight = totalPalletWeight
      .toFixed(2)
      .toString();

    /* Set results to state.
     Precision weights are stored in their current state.
     Display weights are rounded and parsed to string if they haven't already.
     An isNaN check is used for cartonWeight and palletWeight to avoid 'NaN' being displayed is the user had not entered a weight before the conversion.
    */
    this.setState({
      precisionPalletWeight: palletWeight,
      precisionCartonWeight: cartonWeight,
      precisionMaxShippingWeight: maxShippingWeight,
      precisionTotalPalletWeight: totalPalletWeight,
      palletWeight: isNaN(newPalletWeight)
        ? null
        : newPalletWeight,
      cartonWeight: isNaN(newCartonWeight)
        ? null
        : newCartonWeight,
      maxShippingWeight: Math.floor(
        maxShippingWeight
      ).toString(),
      totalPalletWeight: isNaN(newTotalPalletWeight)
        ? null
        : newTotalPalletWeight,
      weightUnit: newUnit
    });
  };

  // Handler function for inputs.
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
        this.convertMeasurements(input, prevUnit);
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

      case 'sideLay':
        this.setState({ sideLay: input });
        break;

      default:
        break;
    }
  };

  // Helper function to calculate the total height of the pallet.
  calcTotalHeight = layers => {
    console.log('1. Calculating total height');
    return (
      layers * parseInt(this.state.cartonHeight) +
      parseInt(this.state.palletHeight)
    );
  };

  /* 
    MAY NOT BE NECESSARY!
    Confirms the height of the pallet  is below or equal the set shipping maximum.
    If it is above then will decrease the layers until it is below the maximum.
  */
  verifyHeight = layers => {
    console.log('2. Verifying height');
    let totalHeight = this.calcTotalHeight(layers);
    let layersChanged = false;
    const maxHeight = parseInt(
      this.state.maxShippingHeight
    );

    console.log(
      '3. ',
      layers,
      totalHeight,
      layersChanged,
      maxHeight
    );

    if (totalHeight > maxHeight) {
      console.log('4. Adjusting Height');
      layersChanged = true;
      while (totalHeight > maxHeight) {
        layers--;
        totalHeight = this.calcTotalHeight(layers);
      }
    }

    layersChanged
      ? this.setState({
          totalPalletHeight: totalHeight.toString(),
          heightAdjusted: true
        })
      : this.setState({
          totalPalletHeight: totalHeight.toString()
        });

    if (layersChanged)
      this.verifyWeight(
        parseInt(this.state.totalBoxes),
        parseInt(this.state.boxesPerLayer)
      );
  };

  // Verify total boxes is below weight limit for shipping and adjust accordingly.
  verifyWeight = (boxes, perLayer, layers) => {
    console.log('5. Verifying weight');
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
    let newLayers = layers;

    // Calculate current pallet weight based on the current box total.
    let weight = cartonWeight * totalBoxes + palletWeight;

    // If current weight is above the maximum then calculate a new box total based on the maximum weight divided by the carton weight.
    if (weight > maxShippingWeight) {
      console.log('6. Adjusting weight');
      totalBoxes = Math.floor(
        (maxShippingWeight - palletWeight) / cartonWeight
      );
      weight = cartonWeight * totalBoxes + palletWeight;
      newLayers = Math.ceil(totalBoxes / perLayer);
    }

    // Set the results to state.
    this.setState({
      totalBoxes: totalBoxes.toString(),
      totalPalletWeight: weight.toString(),
      totalLayers: newLayers.toString()
    });

    if (this.state.heightAdjusted) {
      this.setState({ heightAdjusted: false });
    } else {
      this.verifyHeight(newLayers);
    }
  };

  // Sets the results from the calcPallet function to state.
  setResult = match => {
    console.log('7. ', match, match[0]);
    this.setState({
      boxesPerLayer: match[1].toString(),
      layoutType: match[3],
      calculatePressed: true
    });
    this.verifyWeight(match[2], match[1], match[0]);
  };

  // Calculates pallet layout and numbers.
  calcPallet = () => {
    console.log('8. Calculating....');

    // Reset result values in state. Probably not necessary. CHECK LATER!
    this.setState({
      totalBoxes: null,
      totalLayers: null,
      boxesPerLayer: null,
      error: false,
      errorType: null
    });

    const measurements = { ...this.state };

    // Check for empty carton measurement fields. Returns if any are empty.
    if (
      (measurements.cartonHeight ||
        measurements.cartonLength ||
        measurements.cartonWidth) === null
    )
      return;

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

    if (this.state.sideLay && cartonHeight > longestSide) {
      console.log('9. Side lay confirmed...');
      shortestSide = longestSide;
      longestSide = cartonHeight;
      cartonHeight = shortestSide;
    }

    let totalLayers = Math.floor(
      maxLayersHeight / cartonHeight
    );

    let stackTypes = 0;
    let types = [];
    let temp = [];

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
    let layer9 = Math.floor(
      (palletWidth % longestSide) / cartonHeight
    );
    let layer10 = Math.floor(
      (palletLength % (shortestSide * 2)) / cartonHeight
    );

    console.log(
      '10. ',
      layer1,
      layer2,
      layer3,
      layer4,
      layer5,
      layer6,
      layer7,
      layer8,
      layer9,
      layer10,
      shortestSide,
      longestSide,
      cartonHeight,
      totalLayers
    );

    const checkLayer = () => {
      if ((layer1 && layer3 && layer5 && layer7) > 1)
        return true;
      else return false;
    };

    const checkLayerRemainder = () => {
      if ((layer2 && layer4 && layer6 && layer8) > 1)
        return true;
      else return false;
    };

    // Single Stack
    if (
      (layer1 || layer5) == 1 &&
      (layer3 || layer7) == 1 &&
      checkLayerRemainder() === false
    ) {
      console.log('Single Stack');
      boxesPerLayer = 1;
      totalBoxes = boxesPerLayer * totalLayers;

      temp = [
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'single'
      ];
      types.push(temp);
      stackTypes++;

      // *FUTURE ADDITION* Set diagram of layout to be displayed.
    }

    // Square Stack
    if (
      checkLayerRemainder() === false &&
      checkLayer() === true
    ) {
      let bestFit = Math.max(layer3, layer7);
      console.log('11. bestfit = ', bestFit);
      if (bestFit == layer3)
        boxesPerLayer = bestFit * layer1;
      else if (bestFit == layer7)
        boxesPerLayer = bestFit * layer5;

      totalBoxes = boxesPerLayer * totalLayers;

      temp = [
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'square'
      ];
      types.push(temp);
      stackTypes++;

      // *FUTURE ADDITION* Set diagram of layout to be displayed.
    }

    // Triple Stack
    if (layer9 >= 1 && layer7 > 1 && layer5 == 2) {
      let outerLayersBoxes = layer7 * layer5;
      let innerLayers = layer9 * layer7;
      let totalInnerLayers = Math.floor(
        maxLayersHeight / longestSide
      );
      totalBoxes =
        outerLayersBoxes * totalLayers +
        innerLayers * totalInnerLayers;

      temp = [
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'triple'
      ];
      types.push(temp);
      stackTypes++;

      // *FUTURE ADDITION* Set diagram of layout to be displayed.
    }

    // Castle Stack
    if (layer7 >= 2 && (layer9 && layer10) == 1) {
      let totalMiddleLayers = Math.floor(
        maxLayersHeight / shortestSide
      );

      totalBoxes = totalLayers * 4 + totalMiddleLayers * 4;

      temp = [
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'castle'
      ];
      types.push(temp);
      stackTypes++;

      // *FUTURE ADDITION* Set diagram of layout to be displayed.
    }

    // Brick Stack
    //if (layer1 == layer7 && layer2 == layer8) {
    if (
      (layer8 && layer2) === 1 &&
      (layer7 && layer1) > 1
    ) {
      boxesPerLayer = layer7 * 4;
      totalBoxes = boxesPerLayer * totalLayers;

      temp = [
        totalLayers,
        boxesPerLayer,
        totalBoxes,
        'brick'
      ];
      types.push(temp);
      stackTypes++;
      // *FUTURE ADDITION* Set diagram of layout to be displayed.
    }
    console.log('12. stackTypes = ' + stackTypes);
    console.log('13. types = ' + types);
    if (stackTypes > 1) {
      // Find largest match
      let bestMatch = null;
      for (let index = 0; index < types.length; index++) {
        const element = types[index];
        if (bestMatch === null) {
          bestMatch = element;
        } else if (bestMatch !== null) {
          if (element[2] > bestMatch[2]) {
            bestMatch = element;
          }
        }
      }
      this.setResult(bestMatch);
    } else if (stackTypes == 1) {
      this.setResult(temp);
    } else if (stackTypes == 0) {
      // No match
      console.log('No match!');
      this.setState({
        error: true,
        errorType: 'No Match!'
      });
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
