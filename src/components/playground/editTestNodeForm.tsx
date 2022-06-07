import {ChangeEvent, FC, Fragment, SyntheticEvent, useState} from "react";
import {selectTestById, testUpdateOne} from "../../stores/playground/testSlice";
import {connect, ConnectedProps} from "react-redux";
import {store} from "../../app/store";

const mapStateToProps = () => ({
    findTestNodeById: selectTestById
});

const mapDispatchToProps = {
    testUpdateOne
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * EditTestNodeForm component
 * @param props
 * @constructor
 */
const EditTestNodeForm: FC<PropsFromRedux> = (props): JSX.Element => {
    const {findTestNodeById, testUpdateOne} = props;
    const [testNodeId, setTestNodeId] = useState<string>('');
    const [testNodeName, setTestNodeName] = useState<string>('');

    const formOnSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const testNode = findTestNodeById(store.getState(), testNodeId);

        if (!testNode) {
            console.log(`Test node with id: ${testNodeId} not exist`);
            return;
        }

        if (testNodeName === testNode.name) {
            console.log(`Test node with id: ${testNodeId} is same name!`);
            return;
        }

        testUpdateOne({
            id: testNodeId,
            changes: {
                name: testNodeName
            }
        });
    }

    return (
        <Fragment>
            <p style={{margin: 0}}>Test node name updater:</p>
            <form onSubmit={formOnSubmit}>
                <input
                    type={'text'}
                    placeholder={'Test node id'}
                    value={testNodeId}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTestNodeId(event.target.value)}
                />
                &nbsp;&nbsp;
                <input
                    type={'text'}
                    placeholder={'Name'}
                    value={testNodeName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTestNodeName(event.target.value)}
                />
                &nbsp;&nbsp;
                <button type={'submit'}>Update</button>
            </form>
        </Fragment>
    );
}
export default connector(EditTestNodeForm)