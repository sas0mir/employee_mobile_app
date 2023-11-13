import { View, Text, StyleSheet, Pressable, Switch, Button, ScrollView } from "react-native";
import { globalContext } from "../App";
import { testUser, COLORS } from "../constants";
import React, {useEffect, useState} from "react";
import {Accordion} from "../components/accordion";

interface ISettingsProps {
    user: any
}

export default function Settings(props: any) {

    const {user} = props;

    const [darkTheme, setTheme] = useState(true);

    return (
        <globalContext.Consumer>
            {(context) => {
                const theme = context.globalState.theme;

                const settingsContainerStyle = {...styles.settingsContainer, backgroundColor: theme === 'dark' ? COLORS.backgroundDefaultDark : COLORS.backgroundDefaultLight};
                const optionRowStyle = {...styles.option_row};
                const optionLabelStyle = {...styles.option_label, color: theme === 'dark' ? COLORS.textDark : COLORS.textLight};
                const optionSwitchStyle = {...styles.option_switch};

                const changeTheme = () => {
                    context.changeTheme(context.globalState.theme === 'light' ? 'dark' : 'light');
                    setTheme(!darkTheme);
                }

                return <ScrollView contentContainerStyle={settingsContainerStyle}>
                    <Accordion title="Основные настройки">
                        <View style={optionRowStyle}>
                            <Text style={optionLabelStyle}>Тема:</Text>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={optionLabelStyle}>светлая</Text>
                                <Switch trackColor={{false: '#767577', true: '#81b0ff'}}
                                    thumbColor={theme === 'dark' ? COLORS.particlesDark : COLORS.particlesLight}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={changeTheme}
                                    value={darkTheme}
                                    style={optionSwitchStyle}
                                />
                                <Text style={optionLabelStyle}>темная</Text>
                            </View>
                        </View>
                        <View style={optionRowStyle}>
                            <Text style={optionLabelStyle}>Размер текста:</Text>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                
                            </View>
                        </View>
                    </Accordion>
                    <Accordion title="Аккаунт">
                        <View style={optionRowStyle}>
                            <Pressable onPress={() => context.setUser(null)} style={{...styles.button, backgroundColor: COLORS.backgroundContainerLight}}>
                                <Text>логаут</Text>
                            </Pressable>
                        </View>
                        <View style={optionRowStyle}></View>
                    </Accordion>
            </ScrollView>
            }}
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundNavigatorDark,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    option_row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    option_label: {
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 'bold'
    },
    option_switch: {
        //zIndex: -1
    },
    button: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        shadowRadius: 10,
        shadowColor: 'grey',
        shadowOpacity: 1,
        color: COLORS.active,
        fontSize: 16,
        fontWeight: 'bold'
    }
})