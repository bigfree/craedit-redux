import {FC, Fragment} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Box} from "@mui/material";
import {blue} from "@mui/material/colors";

const connector = connect(() => ({}), {

});

const WorkflowHeader: FC<ConnectedProps<typeof connector>> = (): JSX.Element => {
    return (
        <Fragment>
            <Box sx={{
                px: 2,
                backgroundColor: blue['A400'],
                minHeight: '54px'
            }}>
                workflow header
            </Box>
        </Fragment>
    )
}
export default connector(WorkflowHeader);