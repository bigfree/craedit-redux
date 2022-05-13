import { FC, Fragment } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

/**
 * Header component
 * @constructor
 */
const Header: FC = (): JSX.Element => {
    return (
        <Fragment>
            <AppBar
                position={'static'}
                sx={{
                    backgroundColor: '#ffffff',
                    zIndex: 999,
                }}
            >
                <Toolbar>
                    <Typography
                        variant={'h6'}
                        component={'div'}
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        WFEditor
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Header;