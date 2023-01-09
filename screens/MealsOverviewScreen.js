import { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import { useRoute } from "@react-navigation/native";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation }) {
  // const route = useRoute(); //can be used for route.params as well
  //note! route.params is the object {categoryId: itemData.item.id} in MealsOverviewScreen
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    // console.log(mealItem.categoryIds.indexOf(catId) + " is the return value from index")
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    //alternative for getting the id for the header within this screen
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId,navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
