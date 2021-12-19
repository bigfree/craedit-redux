import React, { FC } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import FlowWorkspace from "./components/flowWorkspace";
import Home from "./components/home";

const App: FC = (): JSX.Element => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/:workflowId'} element={<FlowWorkspace/>}/>
            </Routes>
        </React.Fragment>
    );
}

export default App;
