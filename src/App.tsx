import {FC, Fragment} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LayoutPage from "./components/pages/LayoutPage";
import PlaygroundPage from "./components/pages/PlaygroundPage";
import WorkflowPage from "./components/pages/WorkflowPage";

/**
 * App component
 * @constructor
 */
const App: FC = (): JSX.Element => {
    return (
        <Fragment>
            <Routes>
                <Route element={<LayoutPage/>}>
                    {/*Workflow page*/}
                    <Route path={'/'} element={<HomePage/>}>
                        <Route path={':workflowId'} element={<WorkflowPage/>}/>
                    </Route>
                    {/*Playground page*/}
                    <Route path={'/playground'} element={<PlaygroundPage/>}/>
                    {/*404 page*/}
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
