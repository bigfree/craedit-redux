import {FC, Fragment, useEffect} from "react";
import {useParams} from "react-router-dom";
import {pointSagaActions} from "../../sagas/point";
import {connect, ConnectedProps} from "react-redux";
import Flow from "../flow/Flow";
import {Box} from "@mui/material";
import WorkflowHeader from "../workflow/WorkflowHeader";

const connector = connect(() => ({}), {
    fetchPoints: (payload: string) => ({type: pointSagaActions.FETCH_ALL_POINTS, payload})
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const WorkflowPage: FC<PropsFromRedux> = ({fetchPoints}: PropsFromRedux): JSX.Element => {
    const urlParams = useParams<{
        workflowId: string
    }>();

    useEffect(() => {
        if (!urlParams.workflowId) {
            return;
        }

        fetchPoints(urlParams.workflowId);
    }, [urlParams]);

    return (
        <Fragment>
            <WorkflowHeader/>
            <Box sx={{
                flex: '1 1 100%',
                position: 'relative',
            }}>
                <Flow/>
            </Box>
        </Fragment>
    );
}

export default connector(WorkflowPage);