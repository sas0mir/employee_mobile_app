import React, { useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Orders from "../screens/Orders";
import Chat from "../screens/Chat";
import { COLORS } from "../constants";
import NavTabButton from "./navTabButton";
import {Icons} from '../components/icons';
import { globalContext } from "../App";

const NavRoutes = [
    { route: 'Settings', label: 'Настройки', type: Icons.FontAwesome, activeIcon: 'gears', inActiveIcon: 'gear', component: Settings },
    { route: 'Chat', label: 'Chat', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: Chat },
    { route: 'Orders', label: 'Orders', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: Orders },
    { route: 'Home', label: 'События', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Home },
  ];

const Tab = createBottomTabNavigator();

export default function Navigator(props: any) {

    const [_open, _setOpen] = useState(false);

    const navBtnDimension = Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14);

    const toggleOpen = () => {
        _setOpen(!_open);
    };
    
    return (
        <globalContext.Consumer>
            {(context) => <View style={styles.nav_container}>
            <NavigationContainer>
            {_open && 
                <View style={styles.info_container}>
                    <Text style={styles.info_text}>{context.globalState.user.name}</Text>
                    <Text style={styles.info_subtext}>{context.globalState.user.email}</Text>
                    <Text style={styles.info_subtext}>{context.globalState.user.roles.length ? context.globalState.user.roles[0] : ''}</Text>
                    <Image source={require('../assets/images/heartbeat.gif')} style={styles.info_gif}/>
                    <Text style={styles.info_text}>События на сегодня:</Text>
                    <Text style={styles.info_text}>Уведомления:</Text>
                </View>
            }
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: -9,
                            right: Math.round(Dimensions.get('screen').width * 0.05),
                            left: 'auto',
                        }
                    }}
                >
                {NavRoutes.map((item, index) => {
                    const indexPosition = (index + 1) * navBtnDimension;
                    const indexPositionMultiplicator = (index + 1) * 10;
                    return (
                      <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                          tabBarShowLabel: true,
                          title: item.label,
                          tabBarButton: (props) => <NavTabButton {...props} item={item} visible={_open} visible_position={indexPosition + indexPositionMultiplicator} />
                        }}
                      />
                    )
                  })}
                </Tab.Navigator>
            </NavigationContainer>
            <TouchableWithoutFeedback onPress={toggleOpen}>
                <View style={styles.tab_button}>
                    <Image source={require('../assets/images/gosling.png')} style={styles.avatar}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
        }
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    nav_container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'yellow',
        padding: 0
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 30
    },
    tab_button: {
        width: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        height: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.borders,
        shadowOpacity: 0.8,
        shadowRadius: 3,
        borderWidth: 3,
        borderColor: COLORS.borders,
        borderRadius: 30,
        backgroundColor: COLORS.backgroundContainer,
        position: "absolute",
        bottom: Math.round(Dimensions.get('screen').width * 0.05),
        right: Math.round(Dimensions.get('screen').width * 0.05),
    },
    info_container: {
        position: 'absolute',
        top: 70,
        left: 0,
        width: Dimensions.get('screen').width,
        padding: 10,
        zIndex: 9999,
        color: 'white'
    },
    info_text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Math.round(Dimensions.get('screen').width * 0.1),
        fontFamily: 'Impact'
    },
    info_subtext: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Math.round(Dimensions.get('screen').width * 0.07),
        fontFamily: 'Impact'
    },
    info_gif: {
        width: '100%',
        height: Math.round(Dimensions.get('screen').width * 0.3),
        opacity: 0.5
    }
});

AppRegistry.registerComponent("Navigator", () => Navigator);
