import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import MenuButton from '../components/MenuButton';

export default class Home extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '',
      leftBracket: false,
      bracketGroups: 0
    };
    this.lastChar;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /*
    Set the last character of the resultText string as a variable.
    This is used multiple times throughout the app for logic checks.
  */
  updateLastChar() {
    char = this.state.resultText.split('').pop();
    if (isNaN(char)) {
      this.lastChar = char;
    } else {
      this.lastChar = parseInt(char);
    }
  }

  // Validation function
  // Ensures an operator is not the last character in the resultText.
  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

  /*
    Result calculation function that depending on wether the equal button is pressed will either set the current evaluation in resultText or into calculationText.

    Results from the eval function must be parsed into a string when set into state so it can be displayed properly.
  */
  calculateResult(equal) {
    const text = this.state.resultText;
    try {
      if (equal) {
        this.setState({
          resultText: eval(text).toString(),
          calculationText: ''
        });
      } else if (!equal) {
        if (text.length > 1 && !this.state.leftBracket) {
          this.setState({
            calculationText: eval(text).toString()
          });
        }
      }
    } catch (error) {
      null;
    }
  }

  /* 
    Event handler function for a number button press.
    Awaits the new number to be added to resultText in state before calling the calculateResult function.
  */
  numberPress = async text => {
    (await this._isMounted)
      ? this.setState({
          resultText: this.state.resultText + text
        })
      : null;
    this.calculateResult(false);
    (await this._isMounted) ? this.updateLastChar() : null;
  };

  /*
    Button press handler function. Comprises of a large switch statement that uses the text of the button to determine the action required.

    Throughout the switch many calls for setState and the updateLastChar fucntion are set to await.
    This was done as functions were not completing in time before the next ste p resulting in incorrect results.
    As these functions are only small and simple no performance loss has been noticed due to awaits compared to when not set.
  */
  async buttonPressed(text) {
    switch (text) {
      default:
        this.numberPress(text);
        break;

      case 'del':
        /*
        Check if last character in the result string is a right bracket.
        If true then set leftBracket back to true so correct bracket is inputed on next bracket button press.
        */
        if (this.state.resultText.split('').pop() === ')')
          this.setState({ leftBracket: true });

        // Create a new substring leaving out the last character from the current result string.
        let newText = this.state.resultText.substring(
          0,
          this.state.resultText.length - 1
        );
        // Set the new result string.
        this.setState({ resultText: newText });
        (await this._isMounted)
          ? this.updateLastChar()
          : null;
        return (
          this.validate() && this.calculateResult(false)
        );

      case 'C':
        // Clear text and counter state fields and reset leftBracket to false
        this.setState({
          resultText: '',
          calculationText: '',
          leftBracket: false,
          bracketGroups: 0
        });
        this.lastChar = null;
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        // Break if at the start of a new bracket group.
        if (this.lastChar == '(') break;

        // Try to evaluate the current resultText.
        // If an error occurs then nothing is returned to avoid a crash.
        let evaluation = this.state.resultText;
        try {
          evaluation = this.calculateResult(false);
        } catch (error) {
          null;
        }

        /* 
          Sometimes when brackets are used they may appear in the evaluation result. 
          This if statement will remove them using a regular expression to check for it.
        */
        if (evaluation)
          evaluation = evaluation.replace(/[\(\)]+/g, '');

        /*
          Set a regular expression variable for validation testing.
          Checks for any instance of double operators.
        */
        const regExp = /[\+\*\-\/][\+\*\-\/]/g;

        /* 
          Update text in the state based on results from validation.
          First stage of validation checks for:
            - if resultText exists
            - ensure the operator text does not match the last character in resultText (avoid ++, etc)
            - not in the middle of an open set of brackets
          Second stage checks for operator characters in the evaluation result. This prevents a bug where eval sometimes just returns the equation.
        */
        (await this._isMounted)
          ? this.state.resultText &&
            text !== this.lastChar &&
            text !== '('
            ? !regExp.test(evaluation)
              ? this.setState({
                  calculationText: evaluation,
                  resultText: this.state.resultText + text
                })
              : this.setState({
                  resultText: this.state.resultText + text
                })
            : null
          : null;
        (await this._isMounted)
          ? this.updateLastChar()
          : null;
        break;

      case '()':
        /* 
          Contains multiple validation checks to determine what action is required.

          1. If leftBracket is true OR more if any bracket groups exist  AND  the last character is a number OR a right bracket.
            THEN a right bracket is set.
          2. If leftBracket is false OR the last character is not a number (allows for multiple bracket groups)
            THEN a left bracket is set.
        */
        if (
          (this.state.leftBracket ||
            this.state.bracketGroups > 0) &&
          (!isNaN(this.lastChar) || this.lastChar == ')')
        ) {
          (await this._isMounted)
            ? this.setState({
                resultText: this.state.resultText + ')',
                leftBracket: false,
                bracketGroups: this.state.bracketGroups - 1
              })
            : null;
        } else if (
          !this.state.leftBracket ||
          isNaN(this.lastChar)
        ) {
          (await this._isMounted)
            ? this.setState({
                resultText: this.state.resultText + '(',
                leftBracket: true,
                bracketGroups: this.state.bracketGroups + 1
              })
            : null;
        }
        (await this._isMounted)
          ? this.updateLastChar()
          : null;
        break;

      case '%':
        // Return if no reultText or if % was pressed immediatly after an operator.
        if (!this.state.resultText || isNaN(this.lastChar))
          return;

        /*
          Check for a single number by testing for an operator.
          If no operator is there then the number is divided by 100 to display as a percentage.
        */
        let operatorCheck = /[\+\-\/\*]/g;
        if (!operatorCheck.test(this.state.resultText)) {
          let percent =
            parseInt(this.state.resultText) / 100;
          this.setState({
            resultText: percent
          });
          break;
        }
        // Create an array of all number sets in resultText.
        let numbers = this.state.resultText.match(
          /[^\d()]+|[\d.]+/g
        );
        let number = parseInt(numbers[numbers.length - 3]);
        let multiplier = parseInt(
          numbers[numbers.length - 1]
        );
        let percentageNumber = number * (multiplier / 100);
        (async () => {
          (await this._isMounted)
            ? this.setState({
                resultText: this.state.resultText.replace(
                  multiplier,
                  percentageNumber
                )
              })
            : null;
          this.calculateResult(true);
        })();
        break;

      case '+/-':
        // Set all number sets in resultText to an array.
        let numberSets = this.state.resultText.match(
          /(\(-\d+\))|\d+/g
        );
        // Set the last result of the numberSets array and parse to string.
        let num = numberSets[
          numberSets.length - 1
        ].toString();
        // Set num to a new variable for use later in the replace function.
        let originalNum = num;
        // Simple regEx pattern to look for '-'.
        let patt = /\-/g;
        /*
          Test num against the regEx pattern and use the result to decide on how to handle the number inversion.

          If test returns positive then a substring is created of num to remove the brackets and the '-'.
          If test returns false then num is set in brackets and '-' added to the start.
        */
        patt.test(num)
          ? (num = num.substring(2, num.length - 1))
          : (num = '(-' + num + ')');
        /*
          Set the new num to resultText.
          New resultString is set be creating a substring of resultText minus the length of the originalNum, then adding the new num to the end.
          Doing it this way instead of using a function like replace avoids issues that arise due to multiple occurances of the same number.
        */
        (await this._isMounted)
          ? this.setState({
              resultText:
                this.state.resultText.substring(
                  0,
                  this.state.resultText.length -
                    originalNum.length
                ) + num
            })
          : null;
        this.calculateResult(false);
        break;

      case '=':
        return (
          this.validate() && this.calculateResult(true)
        );
    }
  }

  render() {
    /*
      The buttons are generated by iterating over arrays of each button text and assigning them to TouchableOpacity objects.
      At the end of each array of numbers the buttons are pushed to a row array which is then rendered.
      By doing this there is significantly less boiler plate code required and it becomes very easy to add/remove a button if required in the future.
    */
    let rows = [];
    let nums = [
      ['C', '()', '%', '/'],
      [7, 8, 9, '*'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      ['+/-', 0, '.', '=']
    ];
    let numbers = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      '0',
      '.',
      '+/-'
    ];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            style={
              numbers.find(num => num === nums[i][j]) ||
              nums[i][j] === 0
                ? [styles.button, styles.number]
                : [styles.button, styles.operations]
            }
            onPress={() => this.buttonPressed(nums[i][j])}
          >
            <Text
              style={
                nums[i][j] === 'C'
                  ? [
                      styles.buttonText,
                      styles.clearButtonText
                    ]
                  : isNaN(nums[i][j]) &&
                    nums[i][j] !== '.' &&
                    nums[i][j] !== '+/-'
                  ? [styles.buttonText, styles.operatorText]
                  : styles.buttonText
              }
            >
              {nums[i][j]}
            </Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View style={styles.row} key={i}>
          {row}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.resultText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <View style={styles.menu}>
            <MenuButton
              navigation={this.props.navigation}
            />
          </View>
          {this.state.resultText ? (
            <View style={styles.delButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.buttonPressed('del')}
              >
                <Text style={styles.delButtonText}>
                  DEL
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.calculationTextContainer}>
            <Text style={styles.calculationText}>
              {this.state.calculationText}
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>{rows}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 3,
    backgroundColor: '#081B33',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingRight: 20
  },
  calculation: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#081B33',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  calculationTextContainer: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  menu: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  delButton: {
    flex: 1
  },
  buttons: {
    flex: 5.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 80,
    margin: 3
  },
  number: {
    backgroundColor: '#767D92'
  },
  operations: {
    backgroundColor: '#506680' // #545454
  },
  calculationText: {
    fontSize: 34,
    color: 'white'
  },
  resultText: {
    fontSize: 40,
    color: 'white'
  },
  buttonText: {
    fontSize: 34,
    color: 'white'
  },
  clearButtonText: {
    color: '#ff4621'
  },
  operatorText: {
    color: '#34d126',
    letterSpacing: 5
  },
  delButtonText: {
    fontSize: 28,
    color: 'white'
  }
});
