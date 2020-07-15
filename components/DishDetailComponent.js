import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

const RenderComments = (props) => {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Card title='Comments'>
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()} />
        </Card>
    )
}

const RenderDish = (props) => {

    const dish = props.dish;

    if(dish){
        return(
            <Card featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon raised
                    reverse name={props.favourite ? 'heart':'heart-o'}
                    type='font-awesome' color='#F50'
                    onPress={() => props.favourite ? console.log('Already favourite') : props.onPress()} />
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
        dishes: DISHES,
        comments: COMMENTS,
        favourites: []
    }

    markFavourite = (dishId) => {
        this.setState({favourites: this.state.favourites.concat(dishId)});
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} 
                    favourite={this.state.favourites.some((el) => el===dishId)} 
                    onPress={() => this.markFavourite(dishId)} />
                <RenderComments comments={this.state.comments.filter(
                    (comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default DishDetail;