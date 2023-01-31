import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {COLORS, testEvents} from "../constants";
import { globalContext } from '../App';

export default function Home(props: any) {

    return (
        <globalContext.Consumer>
        {(context) => {
            return <View style={styles.appContainer}>
                <Text style={styles.headerText}>СОБЫТИЯ</Text>
                <ScrollView>
                {testEvents[0].stages.map((event, index) => {
                    return (
                        <View style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>{event.data.description}</Text>
                            <Text style={styles.eventText}>{event.data.jira}</Text>
                            <Text style={styles.eventText}>{event.start_date}</Text>
                        </View>
                    )
                })}
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
    }
});
