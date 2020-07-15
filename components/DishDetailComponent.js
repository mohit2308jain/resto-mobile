import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
}

const RenderComments = (props) => {
    const comments = props.comments;

    const renderCommentItem = (item, index) => {
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
            {comments.map((item, index) => (
                renderCommentItem(item, index)
            ))}
        </Card>
    )
}

const RenderDish = (props) => {

    const dish = props.dish;

    if(dish){
        return(
            <Card featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
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
        favourites: []
    }

    markFavourite = (dishId) => {
        this.setState({favourites: this.state.favourites.concat(dishId)});
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favourite={this.state.favourites.some((el) => el===dishId)} 
                    onPress={() => this.markFavourite(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter(
                    (comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(DishDetail);