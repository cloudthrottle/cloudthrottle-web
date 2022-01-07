import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GlobalProvider} from "./contexts";

const rootElement = document.getElementById('root')
ReactDOM.render(
    <GlobalProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </GlobalProvider>,
    rootElement
);
