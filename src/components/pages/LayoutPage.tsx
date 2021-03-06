import {FC, Fragment} from "react";
import {Outlet} from "react-router-dom";
import Header from "../header/Header";
import {Box, CssBaseline} from "@mui/material";

const LayoutPage: FC = (): JSX.Element => {
    return (
        <Fragment>
            <CssBaseline/>
            <Box sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexFlow: 'column',
            }}>
                <Header/>
                <Box sx={{
                    flex: '1 1 auto',
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'stretch',
                }}>
                    <Outlet/>
                </Box>
            </Box>
        </Fragment>
    );
}

export default LayoutPage;