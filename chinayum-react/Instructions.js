import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from './assets/logo.jpg';
import './custom-fonts.css';

const Instructions = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      source={logo}
      style={styles.logo}
    />
    <Text style={styles.instructions}>
      Select the correct dish
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Game')} style={styles.button}>
      <Text style={styles.buttonText}>Play</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FEF5CD',
  },
  logo: {
    width: '100%', // arbitrarily high so that height controls size 
    height: '60%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  instructions: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#4D8764',
    padding: 15,
    borderRadius: 26,
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Nunito',
  },
});

export default Instructions;