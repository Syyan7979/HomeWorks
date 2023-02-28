import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './homeStack.jsx';

const Stack = createStackNavigator();

export default function Navigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeStack' >

        <Stack.Screen 
          name='HomeStack' 
          component={HomeStack}
          options={{ 
            headerShown: false, 
            headerStyle: { backgroundColor: '#F9F9F9'} 
          }}
        />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

