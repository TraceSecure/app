import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './App/Views/Home';
import NameScreen from './App/Views/Name';
import EventsScreen from './App/Views/Events';
import PeopleScreen from './App/Views/People';
import TimelinesScreen from './App/Views/Timelines';
import {getName} from './realmQueries';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarPlus,
  faUsers,
  faHistory,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import Realm from 'realm';
import {NameSchema} from './realmSchemas';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{width: 160, height: 50}}
      source={require('./assets/logo-text.png')}
    />
  );
}

const HomeStackScreen = () => (
  <Tab.Navigator
    initialRouteName="Landing"
    headerMode="none"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let icon;
        if (route.name === 'Landing') {
          icon = faHome;
        }
        if (route.name === 'AddPeople') {
          icon = faUsers;
        }
        if (route.name === 'AddEvent') {
          icon = faCalendarPlus;
        }
        if (route.name === 'AddTimeline') {
          icon = faHistory;
        }
        return (
          <FontAwesomeIcon
            icon={icon}
            size={20}
            color={focused ? 'tomato' : 'gray'}
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabStyle: {
        flexDirection: 'column',
      },
    }}>
    <Tab.Screen
      name="Landing"
      component={HomeScreen}
      options={{title: 'Home'}}
    />
    <Tab.Screen
      name="AddPeople"
      component={PeopleScreen}
      options={{title: 'People'}}
    />
    <Tab.Screen
      name="AddEvent"
      component={EventsScreen}
      options={{title: 'Events'}}
    />
    <Tab.Screen
      name="AddTimeline"
      component={TimelinesScreen}
      options={{title: 'Reports'}}
    />
  </Tab.Navigator>
);

const App = () => {
  const [userName, updateUserName] = useState('');

  console.disableYellowBox = true;

  useEffect(() => {
    let realm;

    async function fetchName() {
      const response = await getName();
      updateUserName(response);

      if (response.length > 0) {
        realm.removeAllListeners();
      }
    }

    async function setListener() {
      realm = await Realm.open({
        schema: [NameSchema],
      });

      realm.addListener('change', fetchName);
    }

    setListener();
    fetchName();
  }, [userName]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {userName.length <= 0 ? (
          <>
            <Stack.Screen
              name="AddName"
              component={NameScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPeople"
              component={PeopleScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              title: 'Home',
              headerTitle: props => <LogoTitle {...props} />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
