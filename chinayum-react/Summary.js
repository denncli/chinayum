import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import './custom-fonts.css';

const Summary = ({ navigation, route }) => {
  const { score } = route.params;

  const handleReplay = () => {
    // Navigate back to Game and reset the game state if necessary
    navigation.navigate('Game');
  };

  const handleExit = () => {
    navigation.navigate('Instructions'); // if you have a home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Summary</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <TouchableOpacity onPress={handleReplay} style={styles.button}>
        <Text style={styles.buttonText}>Replay</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleExit} style={[styles.button, styles.exitButton]}>
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light grey background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text for contrast
    fontFamily: 'Nunito',
  },
  score: {
    fontSize: 24,
    color: '#666', // Slightly lighter text color
    marginBottom: 40,
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#007bff', // Bright blue for primary action
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  exitButton: {
    backgroundColor: '#d9534f', // Red for exit or secondary action
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 18,
    fontFamily: 'Nunito',
  },
});

export default Summary;