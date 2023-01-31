import { createContext, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import {StatusBar} from "expo-status-bar";
import Auth from "./screens/Auth";
import {testUser, COLORS} from './constants'
import Navigator from './components/navigator';

const initialState = {
    theme: 'dark',
    authorized: false,
    user: testUser,//{}
    events: [],
};

//реактовский useReducer для работы с контекстом
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'setUser':
            let newState = {...state};
            newState.user = action.payload;
            newState.authorized = true;
            return newState;
        case 'setEvents':
            return {events: action.payload, ...state};
        case 'changeTheme':
            return {theme: action.payload, ...state};
        default:
            return state
    }
};

//контекст для глобальных переменных, например цветовой темы
export const globalContext = createContext({
    globalState: initialState,
    setUser: (user: any) => {},
    setEvents: (events: any[]) => {},
    changeTheme: (theme: string) => {},
});


export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    //console.log('APPSTATE->', state);
  return (
      <View style={{...styles.appContainer, backgroundColor: state.theme === 'light' ? COLORS.backgroundDefaultLight : COLORS.backgroundDefault}}>
          <globalContext.Provider value={{
              globalState: state,
              setUser: (user: any) => {dispatch({type: 'setUser', payload: user})},
              setEvents: (events: any[]) => dispatch({type: 'setEvents'}),
              changeTheme: (theme: string) => dispatch({type: 'changeTheme', payload: theme})
            }}>
          <StatusBar style="auto" />
              {!state.authorized ? <Auth /> : <Navigator />}
          </globalContext.Provider>
      </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
      height: '100%',
      width: '100%',
  },
});
