import { Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

function InstructionsText({ children, styleProps }) {
  return <Text style={[styles.instructionsText, styleProps]}>{children}</Text>;
}

export default InstructionsText;

const styles = StyleSheet.create({
  instructionsText: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: 'open-sans',
  },
});
