import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { postFavorite, postComment } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favourites: state.favourites
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        postFavorite: (dishId) => {
            return dispatch(postFavorite(dishId));
        },
        postComment: (dishId, rating, author, comment) => {
            return dispatch(postComment(dishId, rating, author, comment));
        }
    })
}

const RenderComments = (props) => {
    const comments = props.comments;

    const renderCommentItem = (item, index) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={20} readonly
                    startingValue={item.rating} style={styles.rating}/>
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
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon 
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o' }
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorited') : props.markFavorite()}
                    />
                    <Icon 
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.openCommentForm()}
                    />
                </View>
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
        rating: 3,
        author: '',
        comment: '',
        showCommentForm: false
    }

    markFavourite = (dishId) => {
        this.props.postFavorite(dishId);
    }

    resetCommentForm(){
        this.setState({rating: 3,
            author: '',
            comment: '',
            showCommentForm: false});
    }

    handleComment(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetCommentForm();
    }

    openCommentForm(){
        this.setState({showCommentForm: true})
    }

    setRating(rating) {
        this.setState({rating})
    }

    setAuthor(author) {
        this.setState({author})
    }

    setComment(comment) {
        this.setState({comment})
    }

    render(){
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favourite={this.props.favourites.some((el) => el === dishId)} 
                    markFavorite={() => this.markFavorite(dishId)}
                    openCommentForm={() => this.openCommentForm()} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showCommentForm}
                    onDismiss={() => {this.resetCommentForm()}}
                    onRequestClose={() => {this.resetCommentForm()}} >
                    <View style={styles.modal}>
                        <Rating 
                            minValue={1}
                            startingValue={5}
                            fractions={0}
                            showRating={true}
                            onFinishRating={(rating) => this.setRating(rating)}
                        />
                        <Input 
                            placeholder="Author"
                            leftIcon={
                                <Icon 
                                    name='user-o'
                                    type='font-awesome'
                                />
                            }
                            onChangeText={(author) => this.setAuthor(author)}
                        />
                        <Input 
                            placeholder="Comment"
                            leftIcon={
                                <Icon 
                                    name='comment-o'
                                    type='font-awesome'
                                />
                            }
                            onChangeText={(comment) => this.setComment(comment)}
                        />  
                        <View style={{margin: 20}}>
                            <Button
                                onPress={() => {this.handleComment(dishId)}}
                                color='#512DA8' title='SUBMIT' />
                        </View>
                        <View style={{margin: 20}}>
                            <Button
                            onPress={() => {this.resetCommentForm()}}
                            color='#6c757d' title='CANCEL' />
                        </View>                      
                    </View>
                </Modal>                
                <RenderComments 
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

const styles = StyleSheet.create({
    rating: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        fontSize: 12
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color:  'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});