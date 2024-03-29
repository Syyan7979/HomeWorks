import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import socketService from '../services/sockets/sockets-services';

export default function Listing( props ) {
  const services = props.listings;
  
  const onSelect = (data) => {
    socketService.offReceiveSpecs();
    props.navigation.navigate('RequestSpecs', {data});
  }
  
  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'  ]} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.specsID}>
        <View style={data.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <View style={styles.top}>
                <Text style={styles.service}>{data.typeName}</Text>
                <View style={{alignItems:'flex-end'}}>
                  { data.specific && <Text style={[styles.time, {fontSize:10, lineHeight:10, color:'black'}]}>{data.specific}</Text> }
                  <Text style={styles.time}>{(data.seconds/60).toFixed(0)}m ago</Text>
                </View>
                
              </View>
              <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>{ data.referencedID }</Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => onSelect(data)}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>View Request Details</Text>
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
    height: 160,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center'
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
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  time: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 11,
    lineHeight: 11
  },
  address: {
    fontFamily: 'quicksand',
    fontSize: 12,
    color: '#323941',
    marginTop: 4
  },

  button: {
    height: 40,
    marginTop: 14,
    borderRadius: 10,
  },
  ledge: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  }
});