import {FC, Fragment} from "react";
import {Outlet} from "react-router-dom";
import TabNavigation from "../tabNavigation/TabNavigation";

const HomePage: FC = (): JSX.Element => {
    return (
        <Fragment>
            <TabNavigation/>
            <h1>Home page</h1>
            <Outlet/>
        </Fragment>
    );
}

export default HomePage;