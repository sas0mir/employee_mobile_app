import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import {COLORS} from "../constants";
import { globalContext } from '../App';

export default function Chat(props: any) {

    const [messages, setMessages] = useState('');

    return (
        <globalContext.Consumer>
        {(context) => {
            return <View style={styles.appContainer}>
                <Text style={styles.headerText}>ЧАТ</Text>
                <ScrollView>
                <Text>{messages}</Text>
                <TextInput multiline editable onChangeText={text => setMessages(text)} style={styles.input}/>
                </ScrollView>
            </View>
        }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundDefault
    },
    eventContainer: {
        backgroundColor: COLORS.backgroundContainer,
        padding: 10,
        marginBottom: 10,
    },
    listContainer: {
        height: 'auto'
    },
    headerText: {
        fontFamily: 'Arial',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    eventTitle: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: COLORS.borders
    },
    eventText: {
        fontFamily: 'Arial',
        fontSize: 18,
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: COLORS.borders
    }
});
