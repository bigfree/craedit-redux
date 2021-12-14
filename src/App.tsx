import React, { FC } from 'react';
import './App.css';
import { useAppDispatch } from "./app/hooks";
import { store } from "./app/store";
import FlowWorkspace from "./components/flowWorkspace";
import { entitiesLoading, entitiesReceived, entityAdded, entityUpdated } from "./features/entities/entitiesSlice";

const App: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const onClickEvent = () => {
        console.log(store.getState().entities);
        dispatch(entityAdded({
            id: "622f65c7-76f0-4cd1-ace5-f9d078d7aaae",
            type: "syncPoint",
            data: {
                id: 123,
                label: 'test'
            },
            position: {
                "x": 250,
                "y": 25
            }
        }));
        console.log(store.getState().entities);
        dispatch(entityUpdated({
            id: '622f65c7-76f0-4cd1-ace5-f9d078d7aaae',
            changes: {
                data: {
                    id: 123,
                    label: 'test2'
                }
            }
        }));
        dispatch(entitiesLoading());
        dispatch(entitiesReceived([
            {
                id: "622f65c7-76f0-4cd1-ace5-f9d078d7aaa1",
                type: "syncPoint",
                data: {
                    id: 312,
                    label: 'abcdefgh'
                },
                position: {
                    "x": 250,
                    "y": 25
                }
            }
        ]))
        console.log(store.getState().entities);
    }

    return (
        <React.Fragment>
            <FlowWorkspace/>
        </React.Fragment>
    );
}

export default App;
