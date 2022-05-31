// TODO: create new test node to store
import {ChangeEvent, FC, Fragment, SyntheticEvent, useState} from "react";
import {testAddOne} from "../../stores/playground/testSlice";
import {connect, ConnectedProps} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    testAddOne
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const AddTestNodeForm: FC<PropsFromRedux> = (props: PropsFromRedux): JSX.Element => {
    const {testAddOne} = props;
    const [testNodeName, setTestNodeName] = useState<string>('');

    const formOnSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if ('' === testNodeName) {
            console.log('Name is empty!');
            return;
        }

        testAddOne({
            id: nanoid(),
            name: testNodeName
        });
    };

    const inputTestNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTestNodeName(event.target.value);
    };

    return (
        <Fragment>
            <p style={{margin: 0}}>Add test node:</p>
            <form onSubmit={formOnSubmit}>
                <input
                    type={'text'}
                    placeholder={'Add test node name'}
                    value={testNodeName}
                    onChange={inputTestNameOnChange}
                />
                &nbsp;&nbsp;
                <button type={'submit'}>Add test node</button>
            </form>
        </Fragment>
    )
}
export default connector(AddTestNodeForm);