import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

import Home from "../screens/Home";
import Calendar from "../screens/Calendar";
import Library from "../screens/Library";
import MyPage from "../screens/MyPage";

function BottomTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarLabel: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarLabel: "Library",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons name="picture-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPage}
          options={{
            tabBarLabel: "MyPage",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcons
                name="user-circle-o"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabs;
