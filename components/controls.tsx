import React, { useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
//import Icon from 'rneui/themed';

export default function Controls (props: any) {

    const { user } = props;

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [_open, _setOpen] = useState(false);

    const toggleOpen = () => {
        const toValue = _open ? 0 : 1;
        Animated.timing(animation, {toValue,duration: 200,useNativeDriver:false}).start();
        _setOpen(!_open);
    };

  const reloadInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });
  
  const orderInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });
  
  const reloadStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: reloadInterpolate,
      },
    ],
  };
  
  const orderStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: orderInterpolate,
      },
    ],
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90],
  });
  
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });
  
  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });
  
  const bgStyle = {
    transform: [
      {
        scale: scaleInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]} />
        <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, orderStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>Order</Animated.Text>
            <Icon name="food-fork-drink" size={20} color="#555" />
        </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.other, reloadStyle]}>
            <Animated.Text style={[styles.label, labelStyle]}>Reload</Animated.Text>
            <Icon name="reload" size={20} color="#555" />
        </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleOpen}>
        <View style={[styles.button, styles.pay]}>
            <Animated.Text style={[styles.label, labelStyle]}>{user.name}</Animated.Text>
            <Image source={require('../assets/images/dummyuser.png')} style={styles.avatar}/>
        </View>
        </TouchableWithoutFeedback>
    </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: "#FFF",
    position: "absolute",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  button: {
      width: 60,
      height: 60,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#333",
      shadowOpacity: 0.1,
      shadowOffset: { width: 2, height: 0 },
      shadowRadius: 2,
      borderRadius: 30,
      position: "absolute",
      bottom: 20,
      right: 20,
    },
    payText: {
      color: "#FFF",
    },
    pay: {
      backgroundColor: "#00B15E",
    },
    other: {
        backgroundColor: "#FFF",
    },
    background: {
        backgroundColor: "rgba(0,0,0,.2)",
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 20,
        right: 20,
        borderRadius: 30,
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 50
    }
});

AppRegistry.registerComponent("Controls", () => Controls);