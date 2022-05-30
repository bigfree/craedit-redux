import {FC, Fragment} from "react";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {selectAllTest, testAddOne, testRemoveAll, testUpdateOne} from "../../stores/playground/testSlice";
import {workflowAddOne, workflowRemoveAll} from "../../stores/workflows/workflowSlice";
import {nanoid} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Divider} from "@mui/material";
import EditTestNodeForm from "../playground/editTestNodeForm";

const mapStateToProps = (state: RootState) => ({
    testNodes: selectAllTest,
    workflowNodes: state.workflow.entities,
    testPastNodes: state.test.past,
    testFutureNodes: state.test.future,
    canUndo: state.test.past.length > 0,
    canRedo: state.test.future.length > 0
});

const mapDispatchToProps = {
    testAddOne,
    testUpdateOne,
    testRemoveAll,
    workflowAddOne,
    doUndo: () => ({type: 'TEST_UNDO'}),
    doRedo: () => ({type: 'TEST_REDO'}),
    testClearHistory: () => ({type: 'TEST_CLEAR_HISTORY'}),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Playground page
 * @returns {JSX.Element}
 * @constructor
 */
const PlaygroundPage: FC<PropsFromRedux> = (
    {
        testNodes,
        workflowNodes,
        testPastNodes,
        testFutureNodes,
        canUndo,
        canRedo,
        testAddOne,
        testUpdateOne,
        testRemoveAll,
        workflowAddOne,
        doUndo,
        doRedo,
        testClearHistory,
    }: PropsFromRedux
): JSX.Element => {
    const testNodesSelector = useSelector(testNodes);

    const showEntities = () => {
        console.log('test nodes:', testNodesSelector);
        console.log('workflow nodes:', workflowNodes);
    }

    // useEffect(() => {
    //     if (!selectWorkflowById(store.getState(), '123')) {
    //         workflowAddOne({
    //             id: '123',
    //             name: 'test workflow',
    //         });
    //     }
    // });

    // useEffect(() => {
    //     dispatch(workflowUpdateOne({
    //         id: '123',
    //         changes: {
    //             data: testNodes
    //         }
    //     }));
    //
    //     // if (testNodes.length) {
    //     //     dispatch(addHistory({
    //     //         present: testNodes
    //     //     }));
    //     // }
    //
    // }, [testNodes]);

    // useEffect(() => {
    //     console.log(historyNodes);
    //     dispatch(testSetAll(historyNodes));
    // }, [historyNodes])

    /**
     * Add new entity and workflow
     */
    const handleOnClick = () => {
        testAddOne({
            id: nanoid(),
            name: '123'
        });
    }

    const handleClearState = () => {
        testRemoveAll();
    }

    return (
        <Fragment>
            <div style={{padding: '15px 5px', borderBottom: '1px solid black'}}>
                <button onClick={showEntities}>Show test entities on console</button>
                <button onClick={handleOnClick}>Add test object to state</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button onClick={handleClearState}>Remove test nodes from store</button>
                <button onClick={() => workflowRemoveAll()}>Remove workflow nodes from store</button>
                <button onClick={testClearHistory}>Clear history</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button
                    onClick={doUndo}
                    disabled={!canUndo}
                >undo
                </button>
                <button
                    onClick={doRedo}
                    disabled={!canRedo}
                >redo
                </button>
            </div>
            <div style={{
                padding: '15px 0',
                borderBottom: '1px solid black',
                display: 'flex'
            }}>
                <div style={{flex: 1, borderRight: '1px solid black', padding: '5px'}}>
                    <EditTestNodeForm/>
                </div>
                <div style={{flex: 1, padding: '5px'}}>
                    aaaa
                </div>
            </div>
            <div>
                <p><strong>Test nodes:</strong></p>
                {JSON.stringify(testNodesSelector)}
            </div>
            <div>
                <p><strong>Workflow nodes:</strong></p>
                {JSON.stringify(workflowNodes)}
            </div>
            <br/>
            <Divider/>
            <div>
                <p><strong>Test past nodes: {testPastNodes.length}</strong></p>
                {JSON.stringify(testPastNodes)}
            </div>
            <div>
                <p><strong>Test future nodes: {testFutureNodes.length}</strong></p>
                {JSON.stringify(testFutureNodes)}
            </div>
        </Fragment>
    );
};
export default connector(PlaygroundPage)