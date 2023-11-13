import { View, Image, Text, StyleSheet, Dimensions, Pressable, AppRegistry, TextInput } from "react-native";
import { globalContext } from "../App";
import { testUser, COLORS } from "../constants";
import _ from 'lodash';
import React from "react";

export default function Auth() {

    const setTestData = (field: string, value: string) => {
        if (field === 'login') {
            testUser.name = value;
        }
    }

    return (
        <globalContext.Consumer>
        {(context) => {
            
            console.log('AUTH-CONTEXT->', context);

            return <View style={{...styles.authContainer, backgroundColor: COLORS.backgroundDefaultLight}}>
                <Image source={require("../assets/logo1.png")} style={styles.authLogo} />
                <Text style={styles.authTitle}>АВТОРИЗАЦИЯ</Text>
                <TextInput style={styles.textInput} placeholder='почта' onChangeText={(value) => setTestData('login', value)}/>
                <TextInput style={styles.textInput} placeholder='пароль' onChangeText={(value) => setTestData('pass', value)}/>
                <Pressable onPress={() => context.setUser(testUser)} style={{...styles.authButton, backgroundColor: COLORS.backgroundContainerLight}}>
                    <Text>ВОЙТИ</Text>
                </Pressable>
            </View>
        }}
        </globalContext.Consumer>
    )
};

const styles = StyleSheet.create({
    authContainer: {
        height: '100%',
        padding: 0,
        paddingTop: '25%',
        alignItems: 'center',
    },
    authLogo: {
        height: 40,
        width: '60%',
        marginBottom: '10%'
    },
    authTitle: {
        fontFamily: 'monospace',
        fontSize: 18
    },
    textInput: {
        width: '50%',
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        paddingBottom: 1,
        marginTop: 10
    },
    authButton: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        shadowRadius: 10,
        shadowColor: 'grey',
        shadowOpacity: 1,
        color: COLORS.active,
        fontSize: 16,
        fontWeight: 'bold'
    },
    authModal: {
        //position: 'absolute',
        //top: 0,
        //left: 0,
        //flex: 1,
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    closeAuthBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        //padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.backgroundDefaultLight,
    },
    authWebView: {
        width: Dimensions.get('screen').width,
        height: '100%'
    }
})

AppRegistry.registerComponent("Auth", () => Auth);