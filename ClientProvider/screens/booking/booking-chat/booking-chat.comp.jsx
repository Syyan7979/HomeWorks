import { View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './booking-chat.style';
import hook from './booking-chat.hook';


export default function Chat({ navigation, route }) {
  const {
    value, loading, seekerName, seekerDP, 
    data, onChangeText, onDecline,
  } = hook( navigation, route );

  if (loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Back navigation={navigation}/>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.profileIcon} source={seekerDP} />
            <Text style={styles.names}>{seekerName}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => onDecline()}>
            <View style={styles.decline}>
                <Text style={styles.content}>Decline</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        
        <View style={{backgroundColor:'#E9E9E9'}}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('BookingSpecs', {data})}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.next}>Finalize Cost and Details</Text>
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        </View>
        

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <ScrollView style={{flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:'60%'}}>
              <Text style={{fontFamily: 'lexend', fontSize: 15, textTransform:'uppercase'}}>Chat!</Text>
          </View>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
          </View>
        </View>
      </View> 
        
    </View>
  );
}
