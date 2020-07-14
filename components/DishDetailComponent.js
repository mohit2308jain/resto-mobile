import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import { DISHES } from '../shared/dishes';

const RenderDish = ({ dish }) => {

    if(dish){
        return(
            <Card featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
            </Card>
        )
    }
    else{
        return(
            <View></View>
        )
    }
}

class DishDetail extends React.Component {

    state = {
        dishes: DISHES
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <RenderDish dish={this.state.dishes[+dishId]} />
        )
    }
}

export default DishDetail;