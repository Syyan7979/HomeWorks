import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Animated, Easing, View } from 'react-native';

export default function Loading () {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue, {
        toValue: 1, duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={styles.waiting}>
      <Animated.View style={{transform:[{rotate:spin}]}}>
        <MaterialCommunityIcons name={'loading'} size={60} color={'#9C54D5'}/>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  waiting: {
    position: 'absolute', justifyContent: 'center', alignItems: 'center',
    top: 0, left: 0, right: 0, bottom: 0, zIndex: 20,
    height: '100%', width: '100%', backgroundColor: '#FFFFFF90'
  },
})