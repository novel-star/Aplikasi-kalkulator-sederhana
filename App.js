import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Function to handle button presses
  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
      return;
    }
    if (value === '=') {
      try {
        // Evaluate the expression safely
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch (e) {
        setResult('Error');
      }
      return;
    }

    // Prevent multiple operators in a row
    const operators = ['+', '-', '*', '/'];
    const lastChar = input.slice(-1);

    if (
      operators.includes(value) &&
      (input === '' || operators.includes(lastChar))
    ) {
      // Prevent operator if input empty or last char is operator
      return;
    }

    setInput(input + value);
    setResult('');
  };

  // Buttons layout
  const buttons = [
    ['C', '/', '*', '-'],
    ['7', '8', '9', '+'],
    ['4', '5', '6', '='],
    ['1', '2', '3', '0'],
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result || input || '0'}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonsRow}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  button === 'C' ? styles.buttonClear : null,
                  button === '=' ? styles.buttonEqual : null,
                ]}
                onPress={() => handlePress(button)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.buttonText,
                    (button === 'C' || button === '=') ? styles.buttonTextSpecial : null,
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    justifyContent: 'center',
    padding: 12,
  },
  resultContainer: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#393E46',
    borderRadius: 12,
  },
  resultText: {
    fontSize: 48,
    color: '#EEEEEE',
  },
  buttonsContainer: {
    // marginTop: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00ADB5',
    flex: 1,
    marginHorizontal: 6,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClear: {
    backgroundColor: '#FF5722',
  },
  buttonEqual: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 28,
    color: '#EEEEEE',
    fontWeight: 'bold',
  },
  buttonTextSpecial: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

