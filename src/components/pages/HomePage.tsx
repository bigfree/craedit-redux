import {FC, Fragment} from "react";
import {Outlet} from "react-router-dom";

const HomePage: FC = (): JSX.Element => {
    return (
        <Fragment>
            <h1>Home page</h1>
            <Outlet/>
        </Fragment>
    );
}

export default HomePage;