import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import MapView from 'react-native-maps';

import Header from '../../components/transactheader';
import * as Location from 'expo-location';

export default function FinalSpecs({ route, navigation }) {
  const { service, icon }= route.params;
  let region = {
      latitude: 14.595987,
      longitude: 121.142957,
      latitudeDelta: 0.0050,
      longitudeDelta: 0.0050,
  };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert('Permission Denied', 
          'This application requires location permission for certain features. To allow this app, you may check app info.', [
          {text: 'OK'},
        ]);
        navigation.goBack();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={2}/>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Cost and Address</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{service} Service</Text>
          <Text style={[styles.content,{fontFamily: 'quicksand-bold', fontSize: 16}]}>Php 420</Text>
        </View>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5}}/>
        
        <View style={{width:'100%', height: 200, marginVertical:-4}}>
          <MapView style={{flex:1}} initialRegion={region}/>
          <View style={{top:'50%',left:'50%',position:'absolute',marginTop:-15,marginLeft:-11}}>
            <Image style={{height:30,width:22}} source={require("../../assets/pin.png")} />
          </View>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>

        <View style={styles.address}>
          <Text style={styles.location}>UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila</Text>
        </View>
        
        <Text style={styles.heading}>Service Description</Text>
        <View style={[styles.details, {marginBottom:30}]}>
          <Text style={styles.content}>Replace the door. The materials to create the door will be provided by the customer. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </View>
      
      </ScrollView>


      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
			<View style={styles.footer}>

        <TouchableWithoutFeedback onPress= {() => {
            navigation.dispatch(StackActions.popToTop()), navigation.dispatch(StackActions.popToTop()),
            navigation.navigate('ServeStack', {service: service, icon: icon})
          }}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.accept}>
              <Text style={styles.prompt}>Accept Service Specs</Text>
            </LinearGradient>      
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => { navigation.goBack(null)}}>
          <LinearGradient colors={['rgba(10,10,10,0.4)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <View style={styles.decline}>
              <Text style={[styles.prompt, {color:'#462964', fontSize: 14}]}>Go Back to Chat</Text>
            </View>         
          </LinearGradient>
        </TouchableWithoutFeedback>
			</View>
		</LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
  },

  image: {
    height: 200,
    width: '250%',
    alignSelf:'center',
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    marginHorizontal: 24,
    marginVertical: 10,
    
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'quicksand',
    width: '80%',
    fontSize: 12,
    color: '#888486',
  },


  details: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  content: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 6,
  },
  subcontent: {
    fontFamily: 'quicksand',
    fontSize: 11,
    marginBottom: 20,
    marginTop: -6,
    marginHorizontal: 24,
    color: '#888486'
  },

  footer: {
    height: 120,
    backgroundColor: '#E9E9E9',
    marginTop:6,
    justifyContent: 'center'
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6
  },
  accept: {
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8
  },
  decline: {
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#E9E9E9', 
    borderWidth: 0.6, 
    borderColor: '#462964', 
  },


  prompt: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 16
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 12,
    marginTop: -4,
    alignItems: 'center'
  }
});