import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import './custom-fonts.css';
import logo from './assets/logo.jpg';

const Summary = ({ navigation, route }) => {
  const { score } = route.params;

  const handleReplay = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.title}>Game Summary</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
      <TouchableOpacity onPress={handleReplay} style={styles.button}>
        <Text style={styles.buttonText}>Replay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF5CD',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333', // Dark text for contrast
    fontFamily: 'Nunito',
  },
  score: {
    fontSize: 27,
    color: '#666', // Slightly lighter text color
    marginBottom: 15,
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#4D8764',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 7,
    width : 80,
    height : 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    borderRadius: 26,
  },
  buttonText: {
    color: '#fff', // White text for buttons
    fontSize: 20,
    fontFamily: 'Nunito',
  },
  logo: {
    width: '100%', // arbitrarily high so that height controls size 
    height: '60%',
    resizeMode: 'contain',
  },
});

export default Summary;