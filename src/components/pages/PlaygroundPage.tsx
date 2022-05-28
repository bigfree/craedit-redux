import {FC, Fragment} from "react";
import {useSelector} from "react-redux";
import {testAdd, testRemoveAll, testSelector, testUpdateOne} from "../../stores/playground/test";
import {workflowAddOne, workflowRemoveAll, workflowSelector} from "../../stores/workflows/workflowSlice";
import {useAppDispatch} from "../../app/hooks";

/**
 * Playground page
 * @returns {JSX.Element}
 * @constructor
 */
const PlaygroundPage: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const testNodes = useSelector(testSelector.selectAll);
    const workflowNodes = useSelector(workflowSelector.selectAll);

    const showEntities = () => {
        console.log('test nodes:', testNodes);
        console.log('workflow nodes:', workflowNodes);
    }

    const handleOnClick = () => {
        dispatch(testAdd({
            testId: 'abc',
            name: 'test value',
            isActive: true,
            number: 1
        }));

        dispatch(workflowAddOne({
            id: 'abc',
            name: 'test workflow',
            data: testNodes,
        }));
    }

    const updateTestEntity = () => {
        dispatch(testUpdateOne({
            id: 'abc',
            changes: {
                name: 'update name value'
            }
        }));
    }

    return (
        <Fragment>
            <div>
                <button onClick={showEntities}>Show test entities on console</button>
                <button onClick={handleOnClick}>Add test object to state</button>
                <button onClick={updateTestEntity}>Update test entity</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button onClick={() => dispatch(testRemoveAll())}>Remove test nodes from store</button>
                <button onClick={() => dispatch(workflowRemoveAll())}>Remove workflow nodes from store</button>
            </div>
            <div>
                <p>Test nodes:</p>
                {JSON.stringify(testNodes)}
            </div>
            <div>
                <p>Workflow nodes:</p>
                {JSON.stringify(workflowNodes)}
            </div>
        </Fragment>
    );
};
export default PlaygroundPage