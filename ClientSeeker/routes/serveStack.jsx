import { createStackNavigator } from '@react-navigation/stack';

import Serving from '../screens/transaction/serving';
import Payment from '../screens/transaction/payment';

const Stack = createStackNavigator();


export default function ServeStack({ route }) {
  const { service, icon } = route.params;

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      display: "none"
    },
  }

  return (
      <Stack.Navigator initialRouteName='Serving' >

        <Stack.Screen 
          name='Serving' 
          component={Serving}
          initialParams={{ service: service, icon: icon}}
          options={() => header}
        />

        <Stack.Screen 
          name='Payment' 
          component={Payment}
          options={() => header}
        />

      </Stack.Navigator>
  );
}