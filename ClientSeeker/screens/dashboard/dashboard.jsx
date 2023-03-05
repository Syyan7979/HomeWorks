import { StyleSheet, View, Text, Image, ScrollView, } from 'react-native';
import { EvilIcons  } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Grid  from '../../components/grid';
import Listing from '../../components/listing';
import Header from '../../components/dashheader';
import Back from '../../hooks/back';


export default function Dashboard({navigation}) {
  const services = [
    {key: 'Carpentry', icon: 'hammer-screwdriver'},
    {key: 'Car Mechanic', icon: 'car-wrench'},
    {key: 'Plumbing', icon: 'water-pump'},
    {key: 'House Cleaning', icon: 'broom'},
    {key: 'Baby Sitting', icon: 'human-baby-changing-table'},
    {key: 'Electrician', icon: 'power-plug'},
  ]

  const featured = [
    {key: 'Alex Guerrero', location: 'Taguig City', ratings: '4.3', service: 'Car Mechanic', price: 'min Php 420', src: require("../../assets/providers/provider-a.png")},
    {key: 'Precious Trinidad', location: 'Los Baños', ratings: '4.6', service: 'House Cleaning', price: 'min Php 360', src: require("../../assets/providers/provider-b.png")},
    {key: 'Fe Mercado', location: 'Antipolo', ratings: '4.2', service: 'Laundry', price: 'min Php 330', src: require("../../assets/providers/provider-c.png")},
  ]

  const explore = [
    {key: 'Edgardo Dela Cena', location: 'Bacoor City', ratings: '4.8', service: 'Roof Cleaning', price: 'min Php 410', src: require("../../assets/providers/provider-d.png")},
    {key: 'Ricardo Pollicar', location: 'Mandaluyong City', ratings: '4.4', service: 'Meal Preparation', price: 'min Php 300', src: require("../../assets/providers/provider-e.png")},
    {key: 'Ced Montenegro', location: 'Manila', ratings: '4.6', service: 'Plumbing', price: 'min Php 350', src: require("../../assets/providers/provider-f.png")},
  ]


  return (
    <ScrollView style={styles.container}>
      <Back navigation={navigation}/>
      <View style={styles.search}>
        <View style={styles.searchbar}>
          <EvilIcons name='search' color='#616161' size={32}/>
          <Text style={styles.searchtext}>Search for services</Text>
        </View>
      </View>
      

      <View style={styles.sections.services}>
        <Header title={'Services'} navigation={navigation}/>
        <Grid listings={services} navigation={navigation}/>
      </View>

      <Header title={'Featured'} navigation={navigation}/>
      <View style={styles.sections}>
        <Listing listings={featured}/>
      </View>

      <Header title={'Explore'} navigation={navigation}/>
      <View style={styles.sections}>
        <Listing listings={explore}/>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  search: {
    height: 40,
    width: "100%",
    backgroundColor: "#E4E4E4",
    alignItems: 'center',
  },
  searchbar:{
    height: 50,
    width: "75%",
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 4,
  },
  searchtext:{
    fontFamily: 'montserrat',   
    fontSize: 16,
    marginTop: 2.5,
    marginLeft: 4,
    color: '#616161',
  },

  sections:{
    marginTop: -10,
    marginHorizontal: 8,
    services: {
      paddingTop: 38,
      marginVertical: 20,
    }
  },

});