# Warehouse Calculator

## About

The Warehouse Calculator App was an idea brought on by shortcomings of the system I have to use at my current warehouse job.
This app is my first full project using React Native.

The app has four key features:

- **Basic Calculator**
- **Cubic Calculator**

  - Can calculate the cubic measurements of a carton, or by adding a multiplier, can also calculate the cubic weight of the carton for shipping.

- **Unit Of Measurement**

  - Based on the required amount and the carton amount, can calculate the number of cartons and the loose quantity required.

- **Pallet Estimator**

  - The most complicated feature of the app. Takes various measurements and produces a summary for the pallet.
  - Summary includes:

    - Overall pallet weight and dimensions
    - Number of cartons in total and per layer
    - Total number of carton layers
    - A recommended carton layout for the pallet and an example diagram of the layout

  - _Limitation_ - can only calculate based on a single carton size and weight

The settings screens for the Cubic Calculator and the Pallet Estimator can convert all weights between imperial and metric units.

## Things I Learned

- Basic React Native features and syntax
- Use of multiple context APIs for handling state throughout the app
- React Native navigation and drawer menu

## Changelog

### v1.0

Initial publication

### v1.1

- Minor drawer visual adjustment.
- Logic fix for brick stack type selection in Pallet Estimator.
- Pressing a number in the home calculator will now clear the screen to allow a new calculation to be started without having to tap the clear button.
