import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import {COLORS} from "../constants";
import { globalContext } from '../App';
import { Accordion } from '../components/accordion';

export default function Balance(props: any) {

    return (
        <globalContext.Consumer>
        {(context) => {
            const theme = context.globalState.theme;
            const balanceContainerStyle = {...styles.balanceContainer, backgroundColor: theme === 'dark' ? COLORS.backgroundDefaultDark : COLORS.backgroundDefaultLight};
            const balanceTitleStyle = {...styles.balanceHeaderText, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
            const balanceBtnStyle = {...styles.balanceButton, backgroundColor: theme === 'dark' ? COLORS.btnDark : COLORS.btnLight};
            const balanceHeaderContainerStyle = {};
            return <View style={balanceContainerStyle}>
                <Text style={balanceTitleStyle}>БАЛАНС РАБОЧЕГО ВРЕМЕНИ</Text>
                <View style={balanceHeaderContainerStyle}>
                    <Text>Отмечено с 06.11 по 12.11 32 часа (из 32)</Text>
                    <Text>Отмечено за пятницу, 10 ноября 8 часов (из 8)</Text>
                    <Pressable onPress={() => {}} style={balanceBtnStyle}>
                        <Text>Hасчет баланса</Text>
                    </Pressable>
                </View>
                <ScrollView>
                    <Text>todo Баланс по задачам</Text>
                </ScrollView>
            </View>
        }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    balanceContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundDefaultDark
    },
    balanceHeaderText: {
        fontFamily: 'monospace',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    balanceButton: {

    }
});
