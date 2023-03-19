import { View, Image, StyleSheet, Text } from 'react-native';
import Colors from '../constants/colors';
import Title from '../components/Title';
import PrimaryButton from '../components/PrimaryButton';

function gameOverScreen({ numberOfRounds, pickedNumber, onRestartGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/success.png')}
        />
      </View>
      <Text style={styles.summaryText}>
        You phone needed <Text style={styles.highlight}>{numberOfRounds}</Text>{' '}
        rounds to guess the Number{' '}
        <Text style={styles.highlight}>{pickedNumber}</Text>
      </Text>
      <PrimaryButton onPressButton={onRestartGame}>
        Start a New Game
      </PrimaryButton>
    </View>
  );
}

export default gameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary700,
  },
});
