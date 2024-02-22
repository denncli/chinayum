import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import logo from './assets/logo.jpg';

const Instructions = ({ navigation }) => {
  const [hidePinyin, setHidePinyin] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        Select the correct dish
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Game', { hidePinyin: hidePinyin })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Hide Pinyin</Text>
        <Switch
          value={hidePinyin}
          onValueChange={(newValue) => setHidePinyin(newValue)}
          style={styles.switch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FEF5CD',
  },
  logo: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Nunito',
  },
  switch: {
    // Custom styles for the switch if needed
  },
});

export default Instructions;