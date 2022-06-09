import {FC, Fragment, useCallback} from "react";
import {pointSetAll, selectAllPoints} from "../../stores/point/pointSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import ReactFlow, {applyNodeChanges, NodeChange} from "react-flow-renderer";

const mapStateToProps = () => ({
    selectAllPoints
});

const connector = connect(mapStateToProps, {
    pointSetAll
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const Flow: FC<PropsFromRedux> = ({selectAllPoints, pointSetAll}: PropsFromRedux): JSX.Element => {
    const allPointsSelector = useSelector(selectAllPoints);
    // const [nodes, setNodes] = useState(allPointsSelector);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        // console.log(changes);
            // console.log(applyNodeChanges(changes, allPointsSelector));
            //     setNodes((nds: PointEntityNode[]) => applyNodeChanges(changes, nds))
            pointSetAll(applyNodeChanges(changes, allPointsSelector));
        },
        [allPointsSelector]
    );

    // const onNodesChange = (changes: NodeChange[]) => {
    //     const changedElements = applyNodeChanges(changes, allPointsSelector);
    //     pointSetAll(changedElements);
    //     // console.log(changedElements);
    // }

    // const onNodesDrag = (event: ReactMouseEvent, node: PointEntityNode, nodes: PointEntityNode[]) => {
    //     pointUpdateOne({
    //         id: node.id,
    //         changes: node
    //     });
    // }

    return (
        <Fragment>
            <ReactFlow
                nodes={allPointsSelector}
                edges={[]}
                onNodesChange={onNodesChange}
                // onNodeDrag={onNodesDrag}
                selectNodesOnDrag={false}
                elementsSelectable={false}
                fitView
            />
        </Fragment>
    )
}

export default connector(Flow)