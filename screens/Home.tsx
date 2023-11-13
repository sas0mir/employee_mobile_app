import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {COLORS, testEvents} from "../constants";
import { globalContext } from '../App';

export default function Home(props: any) {

    const [events, setEvents] = useState(testEvents);

    useEffect(() => {
        //events request here
    }, [])
    
    return (
        <globalContext.Consumer>
        {(context) => {
            const theme = context.globalState.theme;
            const homeContainerStyle = {...styles.homeContainer, backgroundColor: theme === 'dark' ? COLORS.backgroundDefaultDark : COLORS.backgroundDefaultLight};
            const homeTitleStyle = {...styles.headerText, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
            const eventHeaderStyle = {...styles.eventHeader, backgroundColor: theme === 'dark' ? COLORS.containerHeaderDark : COLORS.containerHeaderLight};
            const eventHeaderTextStyle = {...styles.eventHeaderText, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
            const stageContainerStyle = {...styles.stageContainer, backgroundColor: theme === 'dark' ? COLORS.containerContentDark : COLORS.containerContentLight, borderColor: theme === 'dark' ? COLORS.particlesDark : COLORS.particlesLight};
            const stageTitleStyle = {...styles.stageTitle, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
            const stageTextStyle = {...styles.stageText, color: theme === 'dark' ? COLORS.textDark : COLORS.textLight};
            return <View style={homeContainerStyle}>
                <Text style={homeTitleStyle}>СОБЫТИЯ</Text>
                <ScrollView>
                    {events.map((event => {
                        return (
                            <View style={styles.eventContainer} key={event.id}>
                                <View style={eventHeaderStyle}>
                                    <Text style={eventHeaderTextStyle}>Адаптация {event.eventTypeId}</Text>
                                    <Text style={eventHeaderTextStyle}>{event.start_date}</Text>
                                    <Text style={eventHeaderTextStyle}>HR: {event.data.hr}</Text>
                                </View>
                                {event.stages.map((event, index) => {
                                    return (
                                        <View style={stageContainerStyle} key={event.id}>
                                            <Text style={stageTitleStyle}>{event.data.description}</Text>
                                            <Text style={stageTextStyle}>{event.data.jira}</Text>
                                            <Text style={stageTextStyle}>{event.start_date}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    }))}
                </ScrollView>
            </View>
        }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
    },
    eventContainer: {
        padding: 0,
        marginBottom: 10,
    },
    eventHeader: {
        padding: 10
    },
    eventHeaderText: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerText: {
        fontFamily: 'monospace',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    stageContainer: {
        paddingHorizontal: 15
    },
    stageTitle: {
        fontFamily: 'monospace',
        fontSize: 18,
    },
    stageText: {
        fontFamily: 'monospace',
        fontSize: 16,
    }
});
