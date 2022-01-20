import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "./states";
import {Provider} from "react-redux";

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>,
    rootElement
);
export {handleParsedResult} from "./utils/HandleParsedCommandResult";