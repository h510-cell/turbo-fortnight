import React,{Component} from 'react';
import {Header,Icon,Badge} from 'react-native-elements';
import {View,StyleSheet,Text} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class MyHeader extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            value : ""
        }
    }

    getNumberOfUnreadNotification=()=>{
        db.collection('all_notification').where('unreadNotification','==',"unread").where('take_userId','==',this.state.userId)
        onSnapshot((snapshot)=>{
            var unreadNotification = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                value : unreadNotification.length
            }) 
        })
    }

    componentDidMount(){
     this.unreadNotification()
    }

    BellIconWithBadge=()=>{
        <View>
          <Icon name="bell" type='font-awesome' color='#ffffff' size={25}
          onPress={()=>this.props.navigation.navigate('NotificationScreen')}/>
          <Badge
          value ={this.state.value}
          containerStyle={{position:'absolute',top:'-4',right:'-4'}}
          />  
        </View>    
    }

    render(){
        return(
            <View>
                <Header
                leftComponent={<Icon name="bars" type='font-awesome' color='#ffffff' onPress={()=>this.props.navigation.toggleDrawer()}/>}
                centerComponent={{text:this.props.title ,style:{color:'#ffffff',fontSize:20,fontWeight:"bold"} }}
                rightComponent={<this.BellIconWithBadge {...this.props}/>}
                backgroundColor="32867d"
                />
            </View>    
        )
    }
    
}