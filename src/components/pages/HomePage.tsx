import {FC, Fragment, useId} from "react";
import {useSelector} from "react-redux";
import {testAdd, testRemoveAll, testSelector} from "../../stores/playground/test";
import {useAppDispatch} from "../../app/hooks";

const HomePage: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const id = useId();
    const testNodes = useSelector(testSelector.selectAll);

    const showEntities = () => {
        console.log(testNodes);
    }

    const handleOnClick = () => {
        console.log('aaaa');
        dispatch(testAdd({
            testId: id,
            name: 'test value',
            isActive: true,
            number: 1
        }));
    }

    return (
        <Fragment>
            <div>
                <button onClick={showEntities}>Show test entities on console</button>
                <button onClick={handleOnClick}>Add test object to state</button>
                <button onClick={() => dispatch(testRemoveAll())}>Remove store</button>
            </div>
        </Fragment>
    );
}

export default HomePage;