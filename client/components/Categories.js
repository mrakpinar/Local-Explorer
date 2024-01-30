import React from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import globalStyles from '../assets/style';

const Categories = ({ onCategoryPress }) => {
  const categories = ["Coffee", "Sport", "Music", "Food", "Travel"]; // İstediğiniz kadar kategori ekleyin

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((category, index) => (
        <TouchableHighlight
          key={index}
          style={styles.buttonContainer}
          underlayColor="#D3D3D3"
          onPress={() => {
            // onPress işlemleri
            onCategoryPress(category)
          }}
        >
          <View style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>{category}</Text>
          </View>
        </TouchableHighlight>
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
