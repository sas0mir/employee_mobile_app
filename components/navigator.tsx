import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import Orders from "../screens/Orders";
import Chat from "../screens/Chat";
import Balance from "../screens/Balance";
import { COLORS } from "../constants";
import NavTabButton from "./navTabButton";
import {Icons} from '../components/icons';
import { globalContext } from "../App";

const NavRoutes = [
    { route: 'Home', label: 'События', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: Home },
    { route: 'Work', label: 'Расчет времени', type: Icons.MaterialCommunityIcons, activeIcon: 'clock', inActiveIcon: 'clock-outline', component: Balance },
    { route: 'Chat', label: 'Чат', type: Icons.MaterialCommunityIcons, activeIcon: 'chat', inActiveIcon: 'chat-outline', component: Chat },
    { route: 'Orders', label: 'Заказ еды', type: Icons.MaterialCommunityIcons, activeIcon: 'cupcake', inActiveIcon: 'cupcake', component: Orders },
    { route: 'Settings', label: 'Настройки', type: Icons.FontAwesome, activeIcon: 'gears', inActiveIcon: 'gear', component: Settings, position: 'horizontal' },
  ];

const Tab = createBottomTabNavigator();

export default function Navigator(props: any) {

    const [_open, _setOpen] = useState(false);

    const toggleOpen = () => {
        _setOpen(!_open);
    };

    useEffect(() => {
        //todo подгрузка уведомлений
        
    }, [])

    return (
        <globalContext.Consumer>
            {(context) => {
                const user = context.globalState.user;
                const theme = context.globalState.theme;
                const tabBtnStyle = {...styles.tab_button, backgroundColor: theme === 'dark' ? COLORS.btnDark : COLORS.btnLight}
                
                return <View style={styles.nav_container}>
                    <TouchableWithoutFeedback onPress={toggleOpen}>
                    <View style={tabBtnStyle}>
                    <Image source={require('../assets/logo_inovus.png')} style={styles.avatar}/>
                    </View>
                        </TouchableWithoutFeedback>
                <NavigationContainer>
                    
                    <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarStyle: {
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                height: 0
                            }
                        }}
                    >
                    {NavRoutes.map((item, index) => {
                        const indexPosition = item.position === 'horizontal' ? 60  : (index + 1) * 60;
                        const indexPositionMultiplicator = item.position === 'horizontal' ? 13 : (index + 1) * 13;
                        return (
                          <Tab.Screen key={index} name={item.route} component={item.component}
                            options={{
                              tabBarShowLabel: false,
                              title: item.label,
                              tabBarButton: (props) => <NavTabButton {...props} item={item} visible={_open} close={() => _setOpen(false)} visible_position={indexPosition + indexPositionMultiplicator} />
                            }}
                          />
                        )
                      })}
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
            }
        }
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    nav_container: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'red',
        padding: 0,
        margin: 0,
    },
    avatar: {
        width: "70%",
        height: "70%",
        borderRadius: 10,
    },
    tab_button: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderRadius: 50,
        position: "absolute",
        zIndex: 99,
        bottom: 47,
        right: 15,
    },
});

AppRegistry.registerComponent("Navigator", () => Navigator);
