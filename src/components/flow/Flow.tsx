import {FC, Fragment, useCallback} from "react";
import {pointSetAll, pointUpdateOne, selectAllPoints} from "../../stores/point/pointSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import ReactFlow, {applyNodeChanges, Background, NodeChange} from "react-flow-renderer";
import {grey} from "@mui/material/colors";

const connector = connect(() => ({
    selectAllPoints
}), {
    pointSetAll,
    pointUpdateOne,
});

const Flow: FC<ConnectedProps<typeof connector>> = (props): JSX.Element => {
    const {pointSetAll, selectAllPoints} = props;
    const allPointsSelector = useSelector(selectAllPoints);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
            pointSetAll(applyNodeChanges(changes, allPointsSelector));
        },
        [allPointsSelector]
    );

    return (
        <Fragment>
            <ReactFlow
                nodes={allPointsSelector}
                edges={[]}
                onNodesChange={onNodesChange}
                selectNodesOnDrag={false}
                elementsSelectable={false}
                zoomOnScroll={false}
                zoomActivationKeyCode={'Space'}
                snapToGrid={true}
            >
                <Background
                    gap={10}
                    color={grey['A400']}
                />
            </ReactFlow>
        </Fragment>
    )
}

export default connector(Flow)