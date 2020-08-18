import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert,Modal } from 'react-native';
import firebase from 'firebase';

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super(
            this.state={
            email :'',
            password :'',
            }
        )
    }
 userLogin=(()=>{
     if(password){
         Alert.alert("User Login Succesful")
         this.setState({
             email:"",
             password:""
         })
     }
    }
 )

render(){
return(
    <Modal>
    <KeyboardAvoidingView style={{alignItems:'center',marginTop:20}}>
    <View>
    <TextInput
     style={styles.loginBox}
     placeholder="username"
     keyboardType='email-address'
     onChangeText={(text)=>{
         this.setState({
             email:text
         })
     }}
    />
    <TextInput
    style={styles.loginBox}
    secureTextEntry={true}
    placeholder="password"
    onChangeText={(text)=>{
        this.setState({
            password:text
        })
    }}
    />
    </View>
    <View>
    <TouchableOpacity style={{height:30,width:90,borderWidth:1,margin:20,paddingTop:5,borderRadius:7}}>
        <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{height:30,width:90,borderWidth:1,margin:50,paddingTop:5,borderRadius:7}}>
        <Text>Sign Up</Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </Modal>
)
}
}

const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        broderWidth:1.5,
        margin:10,
        paddingLeft:10
    },
})