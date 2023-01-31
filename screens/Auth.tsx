import { View, Image, Text, StyleSheet, Button, NativeSyntheticEvent, Dimensions, Pressable, AppRegistry } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import {MutableRefObject, useRef, useState} from "react";
import { globalContext } from "../App";
import { testUser, COLORS } from "../constants";
import { WebViewMessage } from "react-native-webview/lib/WebViewTypes";

export default function Auth(props: any) {

    const [authType, setAuthType] = useState('');

    let webViewRef: MutableRefObject<any> = useRef();
    const uri = 'https://some-develop.blabla.com/hr/auth';
    const userinfo = 'https://some-develop.blabla.com/api/userInfo';

    const CHECK_COOKIE: string = `ReactNativeWebView.postMessage("Cookie: " + document.cookie + "DECODEDCOOKIE->" + decodeURIComponent(document.cookie));true;`;

    const onNavigationStateChange = (navigationState: WebViewNavigation) => {
        if(webViewRef.current) {
            webViewRef.current.injectJavaScript('window.fetch = async (...args) => {let [resource, config] = args;ReactNativeWebView.postMessage("REQUEST-RESOURCE->" + resource + "REQ-CONFIG->", config);const response = await originalFetch(resource, config);eactNativeWebView.postMessage("RESPONSE->" + resource);return response;};true;')
        }
    };

    const onMessage = async (event: NativeSyntheticEvent<WebViewMessage>) => {
        const { data } = event.nativeEvent;
        console.log('AUTH-ONMESSAGE->', data);
        if (data.includes('Cookie:')) {
            console.log('COOKIE->', data);
            //setAuthType(data);
        }
    };

    return (
        <globalContext.Consumer>
        {(context) => {
            const inactiveColor = context.globalState.theme === 'light' ? COLORS.inactiveLight : COLORS.inactive;
            const activeColor = context.globalState.theme === 'light' ? COLORS.activeLight : COLORS.active;
            const backgroundContainerColor = context.globalState.theme === 'light' ? COLORS.backgroundContainerLight : COLORS.backgroundContainer;
            return <View style={{...styles.authContainer, backgroundColor: context.globalState.theme === 'light' ? COLORS.backgroundDefaultLight : COLORS.backgroundDefault}}>
                <Image source={require("../assets/logo1.png")} style={styles.authLogo} />
                <Text style={styles.authTitle}>АВТОРИЗАЦИЯ</Text>
                <Pressable onPress={() => setAuthType('portal')} style={{...styles.authButton, backgroundColor: backgroundContainerColor}}>
                    <Text>через портал</Text>
                </Pressable>
                <Text style={styles.authTitle}>ИЛИ</Text>
                <Pressable onPress={() => setAuthType('telegram')} style={{...styles.authButton, backgroundColor: backgroundContainerColor}}>
                    <Text>с помощью UUID</Text>
                </Pressable>
                <Pressable onPress={() => context.setUser(testUser)} style={{...styles.authButton, backgroundColor: backgroundContainerColor}}>
                    <Text>Войти с тестовыми данными</Text>
                </Pressable>
                {authType === 'portal' ? <View style={styles.authModal}>
                    <WebView
                        ref={webViewRef}
                        source={{uri: uri}}
                        style={styles.authWebView}
                        injectedJavaScriptBeforeContentLoaded="
                        window.ReactNativeWebView.postMesssage('Cookies before load' + document.cookies);
                        "
                        onNavigationStateChange={onNavigationStateChange}
                        onMessage={onMessage}
                    />
                </View> : authType === 'telegram' ? <View style={{...styles.authModal, backgroundColor: backgroundContainerColor}}>
                    <Text>UUID авторизация пока не готова</Text>
                </View> : null}
                {['portal', 'telegram'].includes(authType) ? <View style={styles.closeAuthBtn}><Button color="white" title="X" onPress={() => setAuthType('')} /></View> : null}
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
        fontFamily: 'Arial',
        fontSize: 16
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
        backgroundColor: COLORS.backgroundDefault,
    },
    authWebView: {
        width: Dimensions.get('screen').width,
        height: '100%'
    }
})

AppRegistry.registerComponent("Auth", () => Auth);