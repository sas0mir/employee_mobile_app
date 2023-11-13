import React, { useState, useRef, useEffect, PropsWithChildren, FC } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Platform,
    UIManager,
    LayoutAnimation,
    Animated
  } from 'react-native';
import { globalContext } from '../App';
import { COLORS } from '../constants';
import Icon, {Icons} from './icons';

if(Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps extends PropsWithChildren {
    children?: JSX.Element[],//React.ReactElement,
    title: string,
}

export const Accordion: FC<AccordionProps> = (props) => {

    const {children, title} = props;
    const rows = children?.length || 0;
    const [open, setOpen] = useState(false);

    const openAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(open) {
            Animated.timing(openAnimation, {
                toValue: rows ? rows * 50 : 30,
                duration: 1000,
                useNativeDriver: false,
            }).start()
        } else {
            Animated.timing(openAnimation, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }).start()
        }
    }, [open])

    return (
        <globalContext.Consumer>
            {(context) => {
                const theme = context.globalState.theme;
                console.log('CHILDREN-L->', children?.length, children);
                //const accordionContainerStyle = {...styles.accordionContainer};
                const accordionHeaderStyle = {...styles.accordionHeader, backgroundColor: theme === 'dark' ? COLORS.containerHeaderDark : COLORS.containerHeaderLight};
                const accordionTitleStyle = {...styles.accordionTitle, color: theme === 'dark' ? COLORS.textTitleDark : COLORS.textTitleLight};
                const accordionContentStyle = {...styles.accordionContent, height: openAnimation, backgroundColor: theme === 'dark' ? COLORS.containerContentDark : COLORS.containerContentLight};

                return <View style={styles.accordionContainer}>
                    <TouchableOpacity style={accordionHeaderStyle} onPress={() => setOpen(!open)}>
                        <Text style={accordionTitleStyle}>{ title }</Text>
                        <Icon type={Icons.FontAwesome} name={ open ? 'chevron-up' : 'chevron-down' } color={theme === 'dark' ? COLORS.particlesDark : COLORS.particlesLight} />
                    </TouchableOpacity>
                    <Animated.View style={accordionContentStyle}>
                        {children}
                    </Animated.View>
                </View>
            }}
        </globalContext.Consumer>
    );
}

const styles = StyleSheet.create({
    accordionContainer: {
        flex: 1,
        marginVertical: 10,
        padding: 5,
        elevation: 10
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    accordionTitle: {
        fontFamily: 'monospace',
        fontSize: 18
    },
    accordionContent: {
        padding: 10,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    }
})