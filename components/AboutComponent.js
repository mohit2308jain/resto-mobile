import React from 'react';
import { Text, ScrollView, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

import { LEADERS } from '../shared/leaders';

const History = () => {
    const name = "Our History";
    return(
        <Card title={name}>
            <Text style={{margin: 10, fontWeight: 'bold'}}>Started in 2010, Ristorante con Fusion quickly established itself as a 
                culinary icon par excellence in Hong Kong. With its unique brand of world 
                fusion cuisine that can be found nowhere else, it enjoys patronage from the 
                A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs 
                in the world, you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{margin: 10, fontWeight: 'bold'}}>The restaurant traces its humble beginnings to The Frying Pan, 
                a successful chain started by our CEO, Mr. Peter Pan, that featured 
                for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    )
}

class AboutComponent extends React.Component{

    state = {
        leaders: LEADERS
    }

    render(){
        const name = "Corporate Leadership";
        const leaders = this.state.leaders;
        return(
            <ScrollView style={{margin: 10}}>
                <History />
                <Card title={name}>
                    {leaders.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            leftAvatar={{ source: require("./images/alberto.png") }}
                        />
                    ))}
                </Card>
            </ScrollView>
        )
    }
}

export default AboutComponent;