import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import './custom-fonts.css';

const Instructions = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Learn Chinese Dishes</Text>
    <Text style={styles.instructions}>
      Select the correct dish
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Game')} style={styles.button}>
      <Text style={styles.buttonText}>Start</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Nunito',
  },
});

export default Instructions;