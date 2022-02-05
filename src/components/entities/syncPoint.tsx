import { FC, Fragment, PropsWithChildren } from "react";
import { NodeProps } from "react-flow-renderer";
import { EntityDataType } from "../../types";
import SharedPoint from "./sharedPoint";

const SyncPoint: FC<NodeProps> = (props: PropsWithChildren<NodeProps<EntityDataType>>): JSX.Element => {
    const {data} = props;
    return (
        <Fragment>
            <SharedPoint
                data={data}
                sx={{
                    background: 'yellow',
                }}
            />
        </Fragment>
    )
}

export default SyncPoint;