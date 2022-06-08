import {FC, Fragment, useEffect} from "react";
import {useParams} from "react-router-dom";
import {pointSagaActions} from "../../sagas/point";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {selectAllPoints} from "../../stores/point/pointSlice";

type WorkflowParams = {
    workflowId: string;
}

const mapStateToProps = () => ({
    selectAllPoints,
});

const mapDispatchToProps = {
    fetchPoints: (payload: string) => ({type: pointSagaActions.FETCH_ALL_POINTS, payload})
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const WorkflowPage: FC<PropsFromRedux> = ({fetchPoints, selectAllPoints}: PropsFromRedux): JSX.Element => {
    const allPointsSelector = useSelector(selectAllPoints);
    const params = useParams<WorkflowParams>();

    useEffect(() => {
        console.log(params);
        fetchPoints(params.workflowId ?? '');
    }, [params])

    return (
        <Fragment>
            <h1>Workflow page: {params.workflowId}</h1>
            <hr/>
            {JSON.stringify(allPointsSelector)}
        </Fragment>
    );
}

export default connector(WorkflowPage);