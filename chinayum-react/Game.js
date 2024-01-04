import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Game = () => {
  const [currentDishes, setCurrentDishes] = useState([]);
  const [correctDish, setCorrectDish] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: '' });

  const dishes = [
    { name: 'Xiā jiǎo - 虾饺', image: require('./assets/images/food/xia-jiao.jpg') },
    { name: 'Gān biān sì jì dòu - 干煸四季豆', image: require('./assets/images/food/gan-bian-si-ji-dou.jpg') },
    { name: 'Hóng shāo ròu - 红烧肉', image: require('./assets/images/food/hong-shao-rou.jpg') },
    { name: 'Dàn tǎ - 蛋挞', image: require('./assets/images/food/dan-ta.jpg') },
    { name: 'Mápó dòufu - 麻婆豆腐', image: require('./assets/images/food/mapo-tofu.jpg') },
    { name: 'Yánshuǐ yā - 盐水鸭', image: require('./assets/images/food/yan-shui-ya.jpg') },
    { name: 'Qīngcài / Xiǎo báicài - 青菜 / 小白菜', image: require('./assets/images/food/qing-cai.jpg') },
    { name: 'Húntun tāng - 馄饨汤', image: require('./assets/images/food/wonton-soup.jpg') },
    { name: 'Chǎofàn - 炒饭', image: require('./assets/images/food/fried-rice.jpg') },
    { name: 'Jiǎozi - 饺子', image: require('./assets/images/food/dumplings.jpg') },
    { name: 'Huǒguō - 火锅', image: require('./assets/images/food/hot-pot.jpg') },
    { name: 'Chǎomiàn - 炒面', image: require('./assets/images/food/chao-mian.png') },
    { name: 'Cōngyóubǐng - 葱油饼', image: require('./assets/images/food/scallion-pancake.jpg') }
  ];

  useEffect(() => {
    pickRandomDishes();
  }, []);

  const pickRandomDishes = () => {
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
      setFeedback({ message: 'Correct!', isCorrect: 'true' });
      setTimeout(() => {
        setFeedback({ message: '', isCorrect: '' });
        pickRandomDishes();
      }, 1000);
    } else {
      setFeedback({ message: 'Wrong, try again.', isCorrect: 'false' });
      setTimeout(() => {
        setFeedback({ message: '', isCorrect: '' });
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      {correctDish && <Text style={styles.title}>{correctDish.name}</Text>}
      <Text style={[styles.feedbackText, feedback.isCorrect === 'false' ? styles.incorrectFeedback : styles.correctFeedback]}>
        {feedback.message}
      </Text>
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

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dishesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  image: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    margin: 5,
    resizeMode: 'contain',
  },
  feedbackText: {
    fontSize: 18,
    marginBottom: 20,
  },
  correctFeedback: {
    color: 'green',
  },
  incorrectFeedback: {
    color: 'red',
  }
});

export default Game;