import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import './custom-fonts.css';

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
    { name: 'Xiā Jiǎo - 虾饺', image: require('./assets/images/food/xia-jiao.jpg') },
    { name: 'Gān Biān Sì Jì Dòu - 干煸四季豆', image: require('./assets/images/food/gan-bian-si-ji-dou.jpg') },
    { name: 'Hóng Shāo Ròu - 红烧肉', image: require('./assets/images/food/hong-shao-rou.jpg') },
    { name: 'Dàn Tǎ - 蛋挞', image: require('./assets/images/food/dan-ta.jpg') },
    { name: 'Mápó Dòufu - 麻婆豆腐', image: require('./assets/images/food/mapo-tofu.jpg') },
    { name: 'Yánshuǐ Yā - 盐水鸭', image: require('./assets/images/food/yan-shui-ya.jpg') },
    { name: 'Qīngcài / Xiǎo Báicài - 青菜 / 小白菜', image: require('./assets/images/food/qing-cai.jpg') },
    { name: 'Húntun Tāng - 馄饨汤', image: require('./assets/images/food/wonton-soup.jpg') },
    { name: 'Chǎofàn - 炒饭', image: require('./assets/images/food/fried-rice.jpg') },
    { name: 'Jiǎozi - 饺子', image: require('./assets/images/food/dumplings.jpg') },
    { name: 'Huǒguō - 火锅', image: require('./assets/images/food/hot-pot.jpg') },
    { name: 'Chǎomiàn - 炒面', image: require('./assets/images/food/chao-mian.jpg') },
    { name: 'Cōngyóubǐng - 葱油饼', image: require('./assets/images/food/scallion-pancake.jpg') },
    { name: 'Huíguō Ròu - 回锅肉', image: require('./assets/images/food/huiguorou.jpg') },
    { name: 'Shāomài - 烧卖', image: require('./assets/images/food/shumai.jpg') },
    { name: 'Běijīng Kǎoyā - 北京烤鸭', image: require('./assets/images/food/peking-duck.jpg') },
    { name: 'Yúxiāng Qiézi - 鱼香茄子', image: require('./assets/images/food/qiezi.jpg') },
    { name: 'Fānqié Chǎo Dàn - 番茄炒蛋', image: require('./assets/images/food/tomato-egg.jpg') },
    { name: 'Bāozi - 包子', image: require('./assets/images/food/baozi.jpg') },
    { name: 'Málà Jī - 麻辣鸡', image: require('./assets/images/food/mala-chicken.jpg') },
    { name: 'Niúròu Miàn - 牛肉面', image: require('./assets/images/food/beef-noodle-soup.jpg') },
    { name: 'Xiǎo Lóng Bāo - 小笼包', image: require('./assets/images/food/xiaolongbao.jpg') },
    { name: 'Shēng Jiān Bāo - 生煎包', image: require('./assets/images/food/sheng-jian-bao.jpg') },
    { name: 'Dàn Dàn Miàn - 担担面', image: require('./assets/images/food/dandan-mian.jpg') },
    { name: 'Bā Bǎo Fàn - 八宝饭', image: require('./assets/images/food/ba-bao-fan.jpg') },
    { name: 'Shī Zi Tóu - 狮子头', image: require('./assets/images/food/lion-head.jpg') },
    { name: 'Zhá Jiàng Miàn - 炸酱面', image: require('./assets/images/food/zha-jiang-mian.jpg') },
    { name: 'Lóngjǐng Xiārén - 龙井虾仁', image: require('./assets/images/food/long-jing-xia-ren.jpg') },
    { name: 'Yú Xiāng Ròu Sī - 鱼香肉丝', image: require('./assets/images/food/yu-xiang-rou-si.jpg') },
    { name: 'Xūn Yú - 熏鱼', image: require('./assets/images/food/xun-yu.jpg') },
    { name: 'Jiāo Yán Pái Gǔ - 椒盐排骨', image: require('./assets/images/food/jiao-yan-pai-gu.jpg') },
    { name: 'Làzǐ Jī Dīng - 辣子鸡丁', image: require('./assets/images/food/la-zi-ji-ding.jpg') },
    { name: 'Fèng Zhǎo - 鳯爪', image: require('./assets/images/food/feng-zhao.jpg') },
    { name: 'Jiāo Yán Níu Ròu - 椒盐牛肉', image: require('./assets/images/food/jiao-yan-niu-rou.jpg') },
    { name: 'Níu Ròu Tāng - 牛肉汤', image: require('./assets/images/food/niu-rou-tang.jpg') },
    { name: 'Táng Cù Pái Gǔ - 糖醋排骨', image: require('./assets/images/food/tang-cu-pai-gu.jpg') },
    { name: 'Kōnɡ Bǎo Jī Dīng - 宫保鸡丁', image: require('./assets/images/food/kong-pao-ji-ding.jpg') },
    { name: 'Shuǐ Zhǔ Yú - 水煮鱼', image: require('./assets/images/food/shui-zhu-yu.jpg') },
    { name: 'Zòng Zǐ - 粽子', image: require('./assets/images/food/zonzi.jpg') },
    { name: 'Zhōu - 粥', image: require('./assets/images/food/zhou.jpg') },
    { name: 'Dào Xiāo Miàn - 刀削面', image: require('./assets/images/food/dao-xiao-mian.jpg') },
    { name: 'Yóu Tiáo - 油条', image: require('./assets/images/food/you-tiao.jpg') },
    { name: 'Sūn Jiān - 笋尖', image: require('./assets/images/food/sun-jian.jpg') },
    { name: 'Nǎi Huáng Bāo - 奶黄包', image: require('./assets/images/food/nai-huang-bao.jpg') },
    { name: 'Hēi Zhīma Jī - 黑芝麻鸡', image: require('./assets/images/food/sesame-chicken.jpg') },
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
      setFeedback({ message: 'Wrong, try again', isCorrect: 'false' });
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
      {correctDish && <Text style={styles.title}>{correctDish.name}</Text>}
      <View style={styles.statsContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.roundsText}>Rounds: {numRounds}</Text>
      </View>
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
const imageWidthAndHeightInPortraitMode = screenHeight * 0.27;
const imageWidthAndHeightInLandscapeMode = screenWidth * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF5CD',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center', // Centers in the parent container
    width: 210,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: isPortrait ? 4 : '3%',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Nunito',
  },
  roundsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Nunito',
  },
  title: {
    fontSize: 28,
    marginBottom: isPortrait ? 0 : 10,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
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
    resizeMode: 'cover',
    borderRadius: 8,
    margin: 3
  },
  feedbackText: {
    fontFamily: 'Nunito',
    marginBottom : 4,
    fontSize: 22,
  },
  correctFeedback: {
    color: 'green',
  },
  incorrectFeedback: {
    color: 'red',
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  }
});

export default Game;