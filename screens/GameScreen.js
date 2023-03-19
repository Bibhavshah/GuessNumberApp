import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/Title';
import Card from '../components/Card';
import InstructionsText from '../components/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

const generateRandomNumber = (min, max, exclude) => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ pickedNumber, onGameOver }) {
  const intitalGuess = generateRandomNumber(1, 100, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(intitalGuess);
  const [guessRounds, setGuessRounds] = useState([intitalGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < pickedNumber) ||
      (direction === 'higher' && currentGuess > pickedNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuessRounds((currentRounds) => [nextNumber, ...currentRounds]);
  };

  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, pickedNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionsText styleProps={styles.instructionsText}>
          Higher or Lower
        </InstructionsText>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <PrimaryButton onPressButton={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name="md-remove"
                size={24}
                color="white"
              />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton
              onPressButton={nextGuessHandler.bind(this, 'higher')}
            >
              <Ionicons
                name="md-add"
                size={24}
                color="white"
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 56,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  instructionsText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 24,
  },
});
