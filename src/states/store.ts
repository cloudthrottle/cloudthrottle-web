import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import commandSaga from "./actions";
import {commandReducer} from "./reducers/command_reducer";
import {rostersReducer} from "./reducers/locos_reducer";
import {powersReducer} from "./reducers/power_reducer";
import {Middleware} from "redux";
import {userClearLocalStorage} from "./actions/stores";
import {buttonMapsReducer} from "./reducers/button_maps_reducer";

const sagaMiddleware = createSagaMiddleware()

const localStorageMiddleware: Middleware = ({getState}) => {
    return (next) => (action) => {
        const result = next(action);

        if (action.type === userClearLocalStorage.type) {
            localStorage.removeItem('applicationState')
        } else {
            localStorage.setItem('applicationState', JSON.stringify(
                getState()
            ));
        }

        return result;
    };
};

const loadLocalState = () => {
    const localState = localStorage.getItem('applicationState')
    if (localState === null) {
        return
    }

    return JSON.parse(localState)
}

export const store = configureStore({
    reducer: {
        powers: powersReducer,
        communications: commandReducer,
        roster: rostersReducer,
        buttonMaps: buttonMapsReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            sagaMiddleware,
            localStorageMiddleware
        );
    },
    preloadedState: loadLocalState()
})

sagaMiddleware.run(commandSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
