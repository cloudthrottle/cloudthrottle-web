import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./components";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const rootElement = document.getElementById('root')
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App/>}/>
        </Routes>
    </BrowserRouter>,
    rootElement
);
