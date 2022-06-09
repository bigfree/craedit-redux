import {FC, Fragment, useEffect} from "react";
import {useParams} from "react-router-dom";
import {pointSagaActions} from "../../sagas/point";
import {connect, ConnectedProps} from "react-redux";
import Flow from "../flow/Flow";
import {Box} from "@mui/material";

type WorkflowParams = {
    workflowId: string;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    fetchPoints: (payload: string) => ({type: pointSagaActions.FETCH_ALL_POINTS, payload})
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const WorkflowPage: FC<PropsFromRedux> = ({fetchPoints}: PropsFromRedux): JSX.Element => {
    const params = useParams<WorkflowParams>();

    useEffect(() => {
        console.log(params);
        fetchPoints(params.workflowId ?? '');
    }, [params])

    return (
        <Fragment>
            <Box sx={{
                flex: '1 1 100%',
            }}>
                <Flow/>
            </Box>
        </Fragment>
    );
}

export default connector(WorkflowPage);