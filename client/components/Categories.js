import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import globalStyles from '../assets/style';

const Categories = ({ onCategoryPress }) => {
  const categories = ["Coffee", "Sport", "Music", "Food", "Travel"];

  const opacity = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonContainer}
          onPress={() => {
            onCategoryPress(category)
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Animated.View style={[globalStyles.button, { opacity }]}>
            <Text style={globalStyles.buttonText}>{category}</Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 75,
    margin: 10,
    height: 40
  },
});

export default Categories;
