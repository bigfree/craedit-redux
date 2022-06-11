import {FC, Fragment} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Box} from "@mui/material";
import {blue} from "@mui/material/colors";
import {RootState} from "../../app/store";
import WorkflowHeaderForm from "./WorkflowHeaderForm";

type OwnProps = {
    workflowId: string;
}

const connector = connect((state: RootState, ownProps: OwnProps) => ({
    ...ownProps
}), {});

const WorkflowHeader: FC<ConnectedProps<typeof connector>> = ({workflowId}): JSX.Element => {
    return (
        <Fragment>
            <Box sx={{
                px: 2,
                backgroundColor: blue['A400'],
                minHeight: '54px',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: blue[800],
            }}>
                <WorkflowHeaderForm workflowId={workflowId}/>
            </Box>
        </Fragment>
    )
}
export default connector(WorkflowHeader);