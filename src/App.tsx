import {FC, Fragment} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LayoutPage from "./components/pages/LayoutPage";

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
