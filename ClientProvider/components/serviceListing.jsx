import { StyleSheet, View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import ServiceServices from '../services/service/service-services';

import { getUserID } from '../utils/get-userID';

export default function Listing( props ) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    ( async() => {  
      try {
        setServices(props.listings)
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [props]);

  const changeEnabled = async(data) => {
    try {
      let serviceEnabled =  -1 * (data.serviceEnabled-3);
      let newServices = [...services];

      for (let i=0; i<newServices.length; i++) 
        if (newServices[i].serviceID == data.serviceID)
          newServices[i].serviceEnabled = serviceEnabled;

      await ServiceServices.patchService(data.serviceID, {serviceEnabled: serviceEnabled});
      setServices(newServices);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'  ]} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.typeID}>
        <View style={styles.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <View style={styles.top}>
                <Text style={styles.service}>{data.typeName}</Text>
                { data.serviceEnabled == 1 &&
                  <View>
                    { data.serviceRating &&
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
                      <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
                      <Text style={styles.rating}> {parseFloat(data.serviceRating).toFixed(1)}</Text>
                    </View>
                    }
                    { !data.serviceRating && <Text style={styles.rating}>New</Text> }
                  </View>
                }
                { data.serviceEnabled == 2 && <Text style={[styles.rating, {color: '#D00000'}]}>Disabled</Text> }
              </View>
              <Text style={styles.cost}>Cost starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {parseFloat(data.initialCost).toFixed(2)}</Text></Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => changeEnabled(data)}>
            <View>
            { data.serviceEnabled == 1 &&
              <View style={[styles.button, {borderWidth:1, borderColor: '#000000', height:24}]}>
                  <Text style={[styles.next, {color: '#000000'}]}>Disable Getting Requests</Text>
              </View>
            }
            { data.serviceEnabled == 2 &&
              <View style={[styles.button, {borderWidth:1, borderColor: '#009000', height:24}]}>
                  <Text style={[styles.next, {color: '#009000'}]}>Allow Getting Requests</Text>
              </View>
            }
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ServicePage', { serviceID: data.serviceID })}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>View Details</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>

        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {services.map((value, index) => {
      return servicesList(value);
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 190,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 190,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  texts: {
    marginLeft: 10,
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  service: {
    fontFamily: 'notosans',
    fontSize: 20,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  rating: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 13,
  },
  cost: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.5,
    color: '#323941',
  },

  button: {
    height: 40,
    marginTop: 8,
    borderRadius: 4,
    justifyContent: 'center'
  },
  ledge: {
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    color: '#606060',
    fontSize:12,
  },
});