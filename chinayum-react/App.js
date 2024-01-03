import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [currentDishes, setCurrentDishes] = useState([]);
  const [correctDish, setCorrectDish] = useState(null);

  // Static dish data with required images
  const dishes = [
    { name: 'Xiā jiǎo - 虾饺', image: require('./assets/images/food/xia-jiao.jpg') },
    { name: 'Gān biān sì jì dòu - 干煸四季豆', image: require('./assets/images/food/gan-bian-si-ji-dou.jpg') },
    { name: 'Hóng shāo ròu - 红烧肉', image: require('./assets/images/food/hong-shao-rou.jpg') },
    { name: 'Dàn tǎ - 蛋挞', image: require('./assets/images/food/dan-ta.jpg') }
    // ... more dishes
  ];

  useEffect(() => {
    pickRandomDishes();
  }, []);

  const pickRandomDishes = () => {
    // Fisher-Yates shuffle algo (?)
    let shuffled = [...dishes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    let selected = shuffled.slice(0, 3);
    setCurrentDishes(selected);
    setCorrectDish(selected[Math.floor(Math.random() * selected.length)]);
  };

  const handleDishPress = dish => {
    if (dish.name === correctDish.name) {
      alert('Correct!', 'You have selected the right dish.', [{ text: 'Next', onPress: pickRandomDishes }]);
      pickRandomDishes();
    } else {
      alert('Wrong', 'Try again.');
    }
  };

  return (
    <View style={styles.container}>
      {correctDish && <Text style={styles.title}>{correctDish.name}</Text>}
      <View style={styles.dishesContainer}>
        {currentDishes.map((dish, index) => (
          <TouchableOpacity key={index} onPress={() => handleDishPress(dish)}>
            <Image source={dish.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Added padding for overall container
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dishesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Set the container to full width
  },
  image: {
    width: screenWidth * 0.3, // Each image takes up 30% of screen width
    height: screenWidth * 0.3, // Height is the same to keep the aspect ratio
    margin: 5,
    resizeMode: 'contain', // Ensures the image scales correctly within the given dimensions
  },
});

export default App;