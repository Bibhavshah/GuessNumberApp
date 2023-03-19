import { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import Card from '../components/Card';
import InstructionsText from '../components/InstructionText';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';
import Colors from '../constants/colors';

function StartGameScreen({ onPickNumber }) {
  const [originalNumber, setOriginalNumber] = useState('');
  function numberInputHandler(eneterdNumber) {
    setOriginalNumber(eneterdNumber);
  }

  function resetInputHanlder() {
    setOriginalNumber('');
  }

  function confirmEnteredNumberHandler() {
    const chosenNumber = parseInt(originalNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Your choosen number should must be between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHanlder }]
      );
      return;
    }

    // console.log('Reached here');
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionsText>Enter a Number</InstructionsText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          onChangeText={numberInputHandler}
          value={originalNumber}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PrimaryButton onPressButton={resetInputHanlder}>
              Reset
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPressButton={confirmEnteredNumberHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },

  numberInput: {
    height: 50,
    width: 50,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    borderBottomWidth: 2,
    marginVertical: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});
