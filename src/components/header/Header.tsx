import { FC, Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import TabNavigation from "../tabNavigation/TabNavigation";

/**
 * Header component
 * @constructor
 */
const Header: FC = (): JSX.Element => {
    return (
        <Fragment>
            <AppBar
                position={'static'}
            >
                <Toolbar>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                    >
                        WFEditor
                    </Typography>
                    <TabNavigation/>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Header;