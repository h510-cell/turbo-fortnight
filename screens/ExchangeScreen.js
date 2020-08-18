import React from 'react';
import { StyleSheet, 
    Text,
    View,
    Modal,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView
         } from 'react-native';
import firebase from 'firebase';
import db from '../Config'
import MyHeader from '../components/MyHeader'

export default class ExchangeScreen extends React.Component{
    constructor(){
        super(
            this.state={
                firstname:"",
                lastname:"",
                itemName:"iPhoneX",
                itemDescription:"",
                reasonToRequest:"",
                exchangeId:'',
                IsExchangeRequestActive:false
            }
        )
    }

  

    createUniqueId(){
        return Math.random().toString(5)
    }

    addItem=()=>{
        db.collection('addItem').where('itemName','==',"iPhoneX").add()
        .onSnapshot((snapshot)=>{
            var itemName = snapshot.docs.map((docs)=>doc.data())
            var exchangeId = this.createUniqueId();
              this.setState({
                  itemName:itemName,
                  exchangeId:exchangeId
              })
            })
    }

        sendNotification=()=>{
          //to get the first name and the last name
          db.collection('users').where('emailId','==',this.state.userId).get()
          .then((snapshot)=>{
              snapshot.forEach((doc)=>{
                  var firstname = doc.data().firstname,
                  var lastname = doc.data().lastname

                  //To get ExchangerId and Item Name
                  db.collection('all_notification').where('exchangeId','==',this.state.exchangeId).get()
                  .then((snapshot)=>{
                      snapshot.forEach((doc)=>{
                        var donor_id = doc.data().donor_id,
                        var itemName = doc.data().itemName
                      })

                      //take userId Is the donor_idto send notification to the user
                      db.collection('all_notification').add({
                          "take_userId":donor_id,
                          "message":firstname + "" + lastname + "recieved the item" + itemName,
                          "notification_status" : "unread",
                          "itemName" : itemName
                      });
                  });
              });
          });
        };

    getIsExchangeRequestActive(){
        db.collection('users')
        .add()
        .where('emailId','==',this.state.userId)
        .onSnapshot(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            this.setState({
                IsExchangeRequestActive:doc.data().IsExchangeRequestActive
            })
          }) 
        })
        }

    componentDidMount(){
        this.addItem()
    }

    render(){
        if(this.state.IsExchangeRequestActive===true){
    return(
        //Exchange Screen Status
        <View style={{flex:1,justifyContent:"center"}}>
          <View style={{backgroundColor:'orange',borderWidth:2,justifyContent:"center",alignItems:"center",padding:10}}>
              <Text>Item Name</Text>    
          </View>      
          <View style={{backgroundColor:'orange',borderWidth:2,justifyContent:"center",alignItems:"center",padding:10}}>
              <Text>Exchanger Status</Text>
              <Text>{this.state.Exchanger_status}</Text>
          </View>    
            <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:'orange',width:300,alignSelf:"center",height:100,}}
            onPress={()=>{
                db.collection('users').update({
                    IsExchangeRequestActive:this.state.IsExchangeRequestActive
                })
                this.sendNotification()
            }}
            >
               <Text style={styles.text}>I recieved the item</Text>
          </TouchableOpacity>    
        </View>
    )
        }
        else{
            return(
                //Form Screen
                <View style={{flex:1}}>
                <MyHeader title="Request Item" navigation={this.props.navigation}/>
                <ScrollView>
                    <KeyboardAvoidingView style={styles.KeyBoardStyle}>
                        <TextInput
                        style={styles.TextInput}
                        placeholder={"Enter Item Name"}
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({
                                itemName:text
                            })
                        }}
                        />
                        <TextInput
                         style={styles.TextInput}
                         multiline
                         numberOfLines={8}
                         placeholder={"Why Do You Need The Item"}
                         onChangeText={(text)=>{
                             this.setState({
                                 reasonToRequest:text
                             })
                         }}
                        />
                    </KeyboardAvoidingView>    
                </ScrollView>    
                </View>    
            )
        }
    }
render(){
    return(
        <Modal>
        <KeyboardAvoidingView>
        <View>
          <TextInput
          placeholder={"itemName"}
          maxLength={8}
          onChangeText={(text)=>{
              this.setState({
                  itemName:text
              })
          }}
          />
          <TextInput
          placeholder={"itemDescription"}
          maxLength={8}
          onChangeText={(text)=>{
              this.setState({
                  itemDescription:text
              })
          }}
          />
        </View>
        <View>
         <TouchableOpacity style={styles.AddItembutton}
         onPress={()=>
        this.addItem()
        }>
           <Text>AddItem</Text>
         </TouchableOpacity>       
        </View>    
       </KeyboardAvoidingView>
       </Modal>   
    )
}
}

const styles = StyleSheet.create({
    AddItembutton:{
        width:300,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgb(0,0,225)"
    }
})