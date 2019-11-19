import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { PalletContext } from "../context/PalletContext";
import LayoutPreview from "./LayoutPreview";

export default class PalletSummary extends Component {
  static contextType = PalletContext;

  render() {
    const {
      totalLayers,
      boxesPerLayer,
      totalBoxes,
      totalPalletWeight,
      weightUnit,
      measurementUnit,
      layoutType,
      totalPalletHeight,
      palletLength,
      palletWidth
    } = this.context;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Layout Summary</Text>
        <Text style={styles.text}>Total Layers: {totalLayers}</Text>
        <Text style={styles.text}>Boxes Per Layer: {boxesPerLayer}</Text>
        <Text style={[styles.text, styles.endSection]}>
          Total Boxes: {totalBoxes}
        </Text>
        <Text style={styles.headerText}>Pallet Summary</Text>
        <Text style={styles.text}>
          Total Pallet Weight: {totalPalletWeight}
          {weightUnit}
        </Text>
        <Text style={[styles.text, styles.endSection]}>
          Pallet Dimensions:{" "}
          {`${palletLength}x${palletWidth}x${totalPalletHeight}${measurementUnit}`}
        </Text>
        <Text style={[styles.text, styles.cap]}>Layout Type: {layoutType}</Text>
        <Text style={styles.text}>Example:</Text>
        <LayoutPreview />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: "#f1f1f1"
  },
  cap: {
    textTransform: "capitalize"
  },
  headerText: {
    fontSize: 30,
    color: "#f1f1f1",
    textTransform: "capitalize",
    textDecorationLine: "underline",
    textDecorationColor: "#f1f1f1"
  },
  endSection: {
    paddingBottom: 12
  },
  container: {
    paddingLeft: 20,
    backgroundColor: "#353C51"
  }
});
