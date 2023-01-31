import { View, Text, StyleSheet, Pressable, Button, ScrollView } from "react-native";
import { globalContext } from "../App";
import { testUser, COLORS } from "../constants";

interface ISettingsProps {
    user: any
}

export default function Settings(props: any) {

    const {user} = props;

    return (
        <globalContext.Consumer>
            {(context) => <ScrollView contentContainerStyle={styles.settingsContainer}>
            <Text>{context.globalState.user.name}</Text>
            <Text>Тема: {context.globalState.theme}</Text>
            <Button title="Сменить цветовую тему" onPress={(e) => context.changeTheme(context.globalState.theme === 'light' ? 'dark' : 'light')} />
        </ScrollView>}
        </globalContext.Consumer>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 16,
        backgroundColor: COLORS.backgroundDefault
    },
})