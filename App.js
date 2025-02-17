import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
    .then(() => {
      setDbInitialized(true);
    })
    .catch((error) => {
      console.log("에러")
      console.log(error);
    })
  }, []);

  if(!dbInitialized) return <AppLoading />;
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            options={({ navigation }) => ({
              title: "당신이 즐겨찾는 장소",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => { navigation.navigate('AddPlace') }}
                />
              )
            })}
            name="AllPlaces"
            component={AllPlaces}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "장소 추가"
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}