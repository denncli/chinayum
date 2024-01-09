import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Game = ({ navigation }) => {
  const [currentDishes, setCurrentDishes] = useState([]);
  const [correctDish, setCorrectDish] = useState(null);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: '' });
  const [score, setScore] = useState(0);
  const [numRounds, setNumRounds] = useState(0);
  const [correctSelectionMade, setCorrectSelectionMade] = useState(false);
  const [incorrectSelectionEverMade, setIncorrectSelectionEverMade] = useState(false);
  const [usedCorrectDishesByName, setUsedCorrectDishesByName] = useState(new Set());

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
    { name: 'Chǎomiàn - 炒面', image: require('./assets/images/food/chao-mian.jpg') },
    { name: 'Cōngyóubǐng - 葱油饼', image: require('./assets/images/food/scallion-pancake.jpg') },
    { name: 'Huíguō ròu - 回锅肉', image: require('./assets/images/food/huiguorou.jpg') },
    { name: 'Shāomài - 烧卖', image: require('./assets/images/food/shumai.jpg') },
    { name: 'Běijīng kǎoyā - 北京烤鸭', image: require('./assets/images/food/peking-duck.jpg') },
    { name: 'Yúxiāng qiézi - 鱼香茄子', image: require('./assets/images/food/qiezi.jpg') },
    { name: 'Fānqié chǎo dàn - 番茄炒蛋', image: require('./assets/images/food/tomato-egg.jpg') },
    { name: 'Bāozi - 包子', image: require('./assets/images/food/baozi.jpg') },
    { name: 'Málà jī - 麻辣鸡', image: require('./assets/images/food/baozi.jpg') },
    { name: 'Niúròu miàn - 牛肉面', image: require('./assets/images/food/beef-noodle-soup.jpg') },
    { name: 'Xiao Long Bao - 小笼包', image: require('./assets/images/food/xiaolongbao.jpg') },
    { name: 'Sheng Jian Bao - 生煎包', image: require('./assets/images/food/sheng-jian-bao.jpg') },
    { name: 'Dan Dan Mian - 担担面', image: require('./assets/images/food/dandan-mian.jpg') },
    { name: 'Ba Bao Fan - 八宝饭', image: require('./assets/images/food/ba-bao-fan.jpg') },
    { name: 'Shī Zi Tóu - 狮子头', image: require('./assets/images/food/lion-head.jpg') }
  ];

  useEffect(() => {
    pickRandomDishes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScore(0);
      setNumRounds(0);
      setUsedCorrectDishesByName(new Set());
      resetRound();
    }, [])
  );

  const pickRandomDishes = () => {
    let NUM_DISH_CHOICES = 3;
    let currentDishesIndices = new Set();
    while (currentDishesIndices.size < NUM_DISH_CHOICES) {
      let randomDishIndex = Math.floor(Math.random() * dishes.length);
      let randomDish = dishes[randomDishIndex];
      if (!usedCorrectDishesByName.has(randomDish.name)) {
        currentDishesIndices.add(randomDishIndex);
      }
    }
    let currentDishes = [];
    currentDishesIndices.forEach(index => {
      currentDishes.push(dishes[index]);
    })
    setCurrentDishes(currentDishes);
    let correctDish = currentDishes[Math.floor(Math.random() * currentDishes.length)];
    setCorrectDish(correctDish);
    setUsedCorrectDishesByName(new Set(usedCorrectDishesByName).add(correctDish.name));
  };

  const handleDishPress = dish => {
    if (dish.name === correctDish.name && !correctSelectionMade) {
      // prevent user from arbitrarily increasing score with multiple presses
      setCorrectSelectionMade(true);
      let newScore = score;
      // only award points for first try
      if (!incorrectSelectionEverMade) {
        // handle async state update
        newScore = score + 1;
        setScore(newScore);
      }
      // handle async state update
      let newNumRounds = numRounds + 1;
      setNumRounds(newNumRounds)
      setFeedback({ message: 'Correct!', isCorrect: 'true' });
      setTimeout(() => {
        let MAX_ROUNDS = 10;
        if (newNumRounds < MAX_ROUNDS) {
          resetRound();
        } else {
          navigation.navigate('Summary', { score: newScore });
        }  
      }, 1000);
    } else if (!correctSelectionMade) {
      setIncorrectSelectionEverMade(true);
      setFeedback({ message: 'Wrong, try again.', isCorrect: 'false' });
      setTimeout(() => {
        setFeedback({ message: '', isCorrect: '' });
      }, 2000);
    }
  };

  const resetRound = () => {
    setFeedback({ message: '', isCorrect: '' });
    setCorrectSelectionMade(false);
    setIncorrectSelectionEverMade(false);
    pickRandomDishes();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.roundsText}>Rounds: {numRounds}</Text>
      </View>
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
const screenHeight = Dimensions.get('window').height;
const isPortrait = screenWidth < screenHeight
const imageWidthAndHeightInPortraitMode = screenHeight * 0.28;
const imageWidthAndHeightInLandscapeMode = screenWidth * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  statsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    alignItems: 'flex-end',
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5, // Add a little space between score and rounds
  },
  roundsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18, // Slightly smaller font size for rounds
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  dishesContainer: {
    flexDirection: isPortrait ? 'column' : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: isPortrait ? imageWidthAndHeightInPortraitMode : imageWidthAndHeightInLandscapeMode,
    height: isPortrait ? imageWidthAndHeightInPortraitMode : imageWidthAndHeightInLandscapeMode,
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
  },
  scoreContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Game;