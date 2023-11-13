import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import {COLORS} from "../constants";
import { globalContext } from '../App';
import Icon, {Icons} from '../components/icons';

export default function Chat(props: any) {

    const [messages, setMessages] = useState('');

    //todo ws

    return (
        <globalContext.Consumer>
        {(context) => {
            const theme = context.globalState.theme;
            const borderColor = {borderColor: theme === 'dark' ? COLORS.particlesDark : COLORS.particlesLight};
            const chatContainerStyle = {...styles.chatContainer, backgroundColor: theme === 'dark' ? COLORS.backgroundDefaultDark : COLORS.backgroundDefaultLight};
            const chatWindowStyle = {...styles.chatWindow, backgroundColor: theme === 'dark' ? COLORS.containerHeaderDark : COLORS.containerHeaderLight, ...borderColor};
            const chatInputContainerStyle = {...styles.chatInputContainer, backgroundColor: theme === 'dark' ? COLORS.containerContentDark : COLORS.containerContentLight, ...borderColor};
            const chatInputStyle = {...styles.chatInput, ...borderColor};
            const chatMessageStyle = {...styles.chatMessage, ...borderColor, backgroundColor: theme === 'dark' ? COLORS.containerContentDark : COLORS.containerContentLight, color: theme === 'dark' ? COLORS.textDark : COLORS.textLight};
            return <View style={chatContainerStyle}>
                <View style={chatWindowStyle}>
                    <ScrollView>
                        <Text style={chatMessageStyle}>todo chat</Text>
                        <Text style={chatMessageStyle}>test message</Text>
                    </ScrollView>
                </View>
                <View style={chatInputContainerStyle}>
                    <TextInput multiline editable onChangeText={text => setMessages(text)} style={chatInputStyle}/>
                    <Icon type={Icons.FontAwesome} name="paper-plane" color={theme === 'dark' ? COLORS.particlesDark : COLORS.particlesLight}/>
                </View>
            </View>
        }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
    },
    chatWindow: {
        borderWidth: 1,
        height: '80%'
    },
    chatMessage: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 8,
        maxWidth: '50%',
        fontSize: 16,
    },
    chatInputContainer: {
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatInput: {
        borderBottomWidth: 1,
    }
});
