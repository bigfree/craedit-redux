import { FC, Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from "./components/pages/HomePage";
import LayoutPage from "./components/pages/LayoutPage";
import WorkSpacePage from "./components/pages/WorkSpacePage";

/**
 * App component
 * @constructor
 */
const App: FC = (): JSX.Element => {
    return (
        <Fragment>
            <Routes>
                <Route path={'/'} element={<LayoutPage/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={':workflowId'} element={<WorkSpacePage/>}/>
                    <Route
                        path={'*'}
                        element={
                            <div><p>Theres nothing here!</p></div>
                        }
                    />
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App;
