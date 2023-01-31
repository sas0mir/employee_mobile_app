import { useRef, useEffect, MutableRefObject, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, AppRegistry, Dimensions } from "react-native";
import Icon from "../components/icons";
import { globalContext } from "../App";
import { COLORS } from "../constants";

export default function NavTabButton(props: any) {

    const {item, accessibilityState, onPress, visible, visible_position} = props;
    const focused = accessibilityState.selected;
    const viewRef: MutableRefObject<any> = useRef(null);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const openedInterpolate = animation.interpolate({
        inputRange: [-(visible_position), 0],
        outputRange: [0, -(visible_position)],
      });
      
      const openedStyle = {
        transform: [
          {
            scale: animation,
          },
          {
            translateY: openedInterpolate,
          },
        ],
      };

      const scaleInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 35],
    });

    const bgStyle = {
        transform: [{scale: scaleInterpolate,},],
    };

    useEffect(() => {
        if(viewRef.current) {
            const toValue = visible ? 1 : 0;
            Animated.timing(animation, {toValue,duration: 200,useNativeDriver:false}).start();
        }
    }, [visible])

    return (
        <globalContext.Consumer>
            {(context) => <TouchableOpacity onPress={onPress} activeOpacity={1} style={[styles.nav_container, {display: visible ? 'flex' : 'none'}]}>
            {item.route === 'Settings' && 
                <Animated.View style={[styles.animated_background, bgStyle]} />
            }
            <Animated.View ref={viewRef} style={[styles.nav_container, openedStyle]}>
                <Icon type={item.type}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    color={focused ? COLORS.borders : COLORS.backgroundContainer}
                />
            </Animated.View>
        </TouchableOpacity>}
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    nav_container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundDefault,
        borderRadius: 30,
        height: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        width: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    animated_background: {
        backgroundColor: "rgba(0,0,0,.9)",
        position: "absolute",
        width: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        height: Math.round(Dimensions.get('screen').width * 0.14) > 60 ? 60 : Math.round(Dimensions.get('screen').width * 0.14),
        bottom: 0,
        right: 0,
        borderRadius: 30,
    },
});

AppRegistry.registerComponent("NavTabButton", () => NavTabButton);
