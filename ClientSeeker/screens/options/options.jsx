import { StyleSheet, View, Text, } from 'react-native';

// to be placed in folder
export default function Options() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}> Options!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  }
});