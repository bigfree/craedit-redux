import {ThemeProvider} from '@mui/material/styles';
import {StrictMode} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {store} from './app/store';
import * as serviceWorker from './serviceWorker';
import {theme} from "./theme";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {createRoot} from "react-dom/client";

const persistor = persistStore(store);
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
