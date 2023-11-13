import { useRef, useEffect, MutableRefObject, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, AppRegistry, Text, Dimensions, ScrollView } from "react-native";
import Icon from "../components/icons";
import { globalContext } from "../App";
import { COLORS, testNotify } from "../constants";
import React from "react";

export default function NavTabButton(props: any) {

    const {item, accessibilityState, onPress, close, visible, visible_position} = props;
    const focused = accessibilityState.selected;
    const viewRef: MutableRefObject<any> = useRef(null);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const scaleXAnimation = useRef(new Animated.Value(0)).current;
    const scaleYAnimation = useRef(new Animated.Value(0)).current;
    const opacityAnimation = useRef(new Animated.Value(1)).current;

    const openedInterpolate = animation.interpolate({
        inputRange: [-(visible_position), 0],
        outputRange: [0, -(visible_position)],
      });
      
      const openedVerticalStyle = {
        transform: [
          {
            scale: animation,
          },
          {
            translateY: openedInterpolate,
          },
        ],
      };

      const openedHorizontalStyle = {
        transform: [
          {
            scale: animation,
          },
          {
            translateX: openedInterpolate,
          },
        ],
      };

    useEffect(() => {
        if(visible) {
            console.log('OPEN ANIMATIONS!!!!');
            Animated.parallel([
                Animated.timing(opacityAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleXAnimation, {
                    toValue: Dimensions.get('screen').width,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(scaleYAnimation, {
                    toValue: Dimensions.get('screen').height,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver:false
                })
            ]).start();
        } else {
            console.log('CLOSE ANIMATIONS!!!!');
            Animated.parallel([
                Animated.timing(opacityAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleXAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(scaleYAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver:false
                })
            ]).start();
        }
        if(viewRef.current) {
            //const toValue = visible ? 1 : 0;
            //Animated.timing(animation, {toValue,duration: 1000,useNativeDriver:false}).start();
        }
    }, [visible])

    return (
        <globalContext.Consumer>
            {(context) => {

                const user = context.globalState.user;
                const theme = context.globalState.theme;
                let infoTextStyle = {...styles.info_text, color: theme === 'dark' ? '#feffdf' : '#004445'};
                let infoNotifyLabelStyle = {...styles.info_label, color: theme === 'dark' ? '#feffdf' : '#004445'};
                let infoSubTextStyle = {...styles.info_subtext, color: theme === 'dark' ? 'white' : 'black'};
                let infoSubTextCenterStyle = {...styles.info_subtext_center, color: theme === 'dark' ? 'white' : 'black'};
                let infoNotifyTextStyle = {...styles.info_notifytext, color: theme === 'dark' ? 'white' : 'black'};
                const navAnimatedContainerStyle = {...styles.nav_animated_container, backgroundColor: theme === 'dark' ? COLORS.btnDark : COLORS.btnLight}//display: visible ? 'flex' : 'none'

                return <TouchableOpacity onPress={onPress} activeOpacity={1} onPressOut={close} style={[styles.nav_container, {opacity: opacityAnimation}]}>
                {item.route === 'Home' ? 
                    <Animated.View style={{...styles.info_container, width: scaleXAnimation, height: scaleYAnimation, borderTopLeftRadius: scaleYAnimation, backgroundColor: theme === 'dark' ? COLORS.backgroundNavigatorDark : COLORS.backgroundNavigatorLight}}>
                        <Animated.View style={{...styles.text_container, display: visible ? 'flex' : 'none', opacity: fadeAnimation}}>
                            <Text style={infoTextStyle}>{user.name}</Text>
                            <Text style={infoSubTextStyle}>{user.email}</Text>
                            <Text style={infoSubTextStyle}>{user.roles.length ? context.globalState.user.roles[0] : ''}</Text>
                            <Text style={{...infoSubTextCenterStyle, marginTop: 20}}>Баланс {28} iC</Text>
                            <Text style={infoSubTextCenterStyle}>Получено {33} стикеров</Text>
                            <Text style={infoSubTextCenterStyle}>Остаток отпуска {5} дней</Text>
                            <Text style={infoNotifyLabelStyle}>Уведомления:</Text>
                                {testNotify.length && testNotify.map((notify) => {
                                    return <Text style={infoNotifyTextStyle}>{`${notify.username}: ${notify.data}`}</Text>
                                })}
                        </Animated.View>
                    </Animated.View>
                    : null
                }
                <Animated.View ref={viewRef} style={[navAnimatedContainerStyle, item.position === 'horizontal' ? openedHorizontalStyle : openedVerticalStyle]}>
                    <Icon type={item.type}
                        name={focused ? item.activeIcon : item.inActiveIcon}
                        color={focused ? COLORS.borders : COLORS.backgroundContainer}
                    />
                </Animated.View>
            </TouchableOpacity>
            }}
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    nav_container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundDefaultDark,
        borderRadius: 30,
        height: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        width: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 30
    },
    nav_animated_container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundDefaultDark,
        borderRadius: 30,
        height: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        width: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 99,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    info_container: {
        position: 'absolute',
        bottom: -30,
        right: -20,
        padding: 10,
        zIndex: 40,
        color: 'white'
    },
    text_container: {
        position: 'absolute',
        top: 40,
        left: 0,
        zIndex: 50,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 70
    },
    info_text: {
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    info_label: {
        width: Math.round(Dimensions.get('screen').width * 0.65),
        marginTop: '20%',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'monospace'
    },
    info_subtext: {
        width: Math.round(Dimensions.get('screen').width * 0.65),
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'monospace',
        textAlign: 'right'
    },
    info_subtext_center: {
        width: Math.round(Dimensions.get('screen').width * 0.65),
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'monospace',
        textAlign: 'center'
    },
    info_notifytext: {
        marginTop: 10,
        marginRight: 70,
        width: Math.round(Dimensions.get('screen').width * 0.70),
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'monospace',
        textAlign: 'left'
    },
});

AppRegistry.registerComponent("NavTabButton", () => NavTabButton);
