import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {COLORS} from "../constants";
import { globalContext } from '../App';
import { Accordion } from '../components/accordion';

export default function Orders(props: any) {

    return (
        <globalContext.Consumer>
        {(context) => {
            const theme = context.globalState.theme;
            const ordersContainerStyle = {...styles.ordersContainer, backgroundColor: theme === 'dark' ? COLORS.backgroundDefaultDark : COLORS.backgroundDefaultLight};
            const ordersTitleStyle = {...styles.ordersHeaderText, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
            return <View style={ordersContainerStyle}>
                <Text style={ordersTitleStyle}>ЗАКАЗ ЕДЫ</Text>
                <ScrollView>
                    <Accordion title='Корзина'></Accordion>
                    <Text>todo Баланс + историю заказов</Text>
                    <Accordion title='Меню на понедельник'></Accordion>
                    <Accordion title='Меню на вторник'></Accordion>
                    <Accordion title='Меню на среду'></Accordion>
                </ScrollView>
            </View>
        }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    ordersContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundDefaultDark
    },
    eventContainer: {
        backgroundColor: COLORS.backgroundContainer,
        padding: 10,
        marginBottom: 10,
    },
    listContainer: {
        height: 'auto'
    },
    ordersHeaderText: {
        fontFamily: 'monospace',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    eventTitle: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: COLORS.borders
    },
    eventText: {
        fontFamily: 'monospace',
        fontSize: 18,
    }
});
