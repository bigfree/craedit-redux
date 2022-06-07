import {FC, Fragment} from "react";
import {useParams} from "react-router-dom";

type WorkflowParams = {
    workflowId: string;
}

const WorkflowPage: FC = (): JSX.Element => {
    const params = useParams<WorkflowParams>();

    return (
        <Fragment>
            <h1>Workflow page: {params.workflowId}</h1>
        </Fragment>
    );
}

export default WorkflowPage;