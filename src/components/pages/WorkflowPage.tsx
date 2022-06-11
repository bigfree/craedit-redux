import {FC, Fragment, useEffect} from "react";
import {useParams} from "react-router-dom";
import {pointSagaActions} from "../../sagas/point";
import {connect, ConnectedProps} from "react-redux";
import Flow from "../flow/Flow";
import {Box} from "@mui/material";
import WorkflowHeader from "../workflow/WorkflowHeader";
import {workflowSagaActions} from "../../sagas/workflowSaga";

const connector = connect(() => ({}), {
    fetchPoints: (payload: string) => ({type: pointSagaActions.FETCH_ALL_POINTS, payload}),
    fetchWorkflow: (payload: string) => ({type: workflowSagaActions.FETCH_WORKFLOW, payload}),
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const WorkflowPage: FC<PropsFromRedux> = ({fetchPoints, fetchWorkflow}: PropsFromRedux): JSX.Element => {
    const urlParams = useParams<{
        workflowId: string
    }>();

    useEffect(() => {
        const workflowId = urlParams.workflowId;

        if (!workflowId) {
            return;
        }

        fetchPoints(workflowId);
        fetchWorkflow(workflowId);
    }, [urlParams]);

    return (
        <Fragment>
            <WorkflowHeader workflowId={urlParams.workflowId ?? ''}/>
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