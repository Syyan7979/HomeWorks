import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { dateHandler } from '../../utils/dateHandler';
import { contactHandler } from '../../utils/contactHandler'
import DatePicker from 'react-native-modern-datepicker';
import SeekerServices from '../../services/user/seeker-services'

const screenHeight = Dimensions.get('window').height;

export default function Credentials( props ) {
  const firstname = props.route.params.firstname;
  const lastname = props.route.params.lastname;
  const mail = props.route.params.mail;
  const password = props.route.params.password;

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [birthday, setBirthday] = useState('');

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage();
  };
  
  const onOpen = () => {
    setOpen(!open);
  }

  const onRegister = () => {
    let bday = 1
    let res = SeekerServices.createSeeker({
      email: mail,
      password: password,
      firstName: firstname,
      lastName: lastname,
      userName: username,
      phoneNumber: contact,
      birthdate: bday,
    })

    props.navigation.dispatch(StackActions.popToTop()),
    props.navigation.navigate('HomeStack') 
  }
  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>
      
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>Hello, {firstname} {lastname}!</Text>
        <Text style={styles.subheading}>Fill up the fields below to complete the creation of your account.</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Username"/>
        </View>
        <View style={styles.textbox}>
          <TextInput numberOfLines={1} style={styles.input} onChangeText={setContact} value={contactHandler(contact)} placeholder="Contact Number"
            onFocus={() => { if(!contact) setContact('+63') }} onBlur={() => {if(contact == '+63' || contact == '+6') setContact('')} }/>
        </View>
        <TouchableWithoutFeedback onPress={() => onOpen()}>
          <View style={styles.textbox}>
            { !birthday && <Text style={[styles.input,{color:'#A0A0A0'}]}>Birthday</Text>}
            { birthday && <Text style={styles.input}>{dateHandler(birthday)}</Text>}
          </View>
        </TouchableWithoutFeedback>

        <Modal visible={open} transparent={true} animationType='slide'>
          <View style={styles.centered}>
            <View style={styles.modal}>
              <DatePicker mode='calendar' selected={birthday} onDateChange={setBirthday}/>
              <TouchableWithoutFeedback onPress= {() => onOpen()}>
                <Text style={styles.enter}>Enter Date</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>

        <Text style={styles.govID}>Diplay Picture (Optional)</Text>
        { !image &&
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <View style={styles.uploader}>
            <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
            <Text style={styles.title}><Text style={{color:'#9C54D5', fontFamily:'quicksand-bold'}}>Click to Upload</Text> your Government ID.</Text>
            <Text style={styles.subtitle}>make sure it's clear and visible</Text>
          </View>
        </TouchableWithoutFeedback>
        }

        { image &&
        <View style={{marginHorizontal:24}}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => removeImage()}>
            <View style={styles.close}>
              <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
            </View>
          </TouchableWithoutFeedback>
        </View>
        }
        
        <TouchableWithoutFeedback onPress= {() => onRegister() }>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.register}>Submit Profile</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },

  govID:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10
  },
  uploader: {
    height: screenHeight/4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 15,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 12,
    marginTop: -2,
  },

  image: {
    height: 200, 
    borderRadius: 4, 
    marginBottom: 10,
  },
  close: {
    marginTop: -200, 
    marginLeft:'85%',
    marginBottom: 220-55, 
    backgroundColor: '#9C54D5'
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 42,
    width: 320,
    marginTop: 40,
    justifyContent:'center',
    
  },
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    alignItems: 'center',
    width: 320,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#1E1E1E',
    marginBottom: 30
  },

  textbox: {
    height: 52,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
  },

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    marginTop:-34, 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5
  }
});