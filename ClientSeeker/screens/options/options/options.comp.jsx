import { View, Text } from 'react-native';


import styles from './options.style';
import hook from './options.hook';

export default function Options({ navigation }) {
  const {} = hook( navigation );

  return (
    <View style={styles.container}>
      <Text style={styles.content}> Options!</Text>
    </View>
  );
}