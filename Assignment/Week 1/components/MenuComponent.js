import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { DISHES } from '../shared/dishes';

class Menu extends React.Component {

  state = {
    dishes: DISHES
  }

  render(){

    const { navigate } = this.props.navigation;
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  }
})
