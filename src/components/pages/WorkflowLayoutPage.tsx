import {FC, Fragment} from "react";
import {Outlet} from "react-router-dom";

const WorkflowLayoutPage: FC = (): JSX.Element => {
    return (
        <Fragment>
            <Outlet/>
        </Fragment>
    );
}
export default WorkflowLayoutPage;