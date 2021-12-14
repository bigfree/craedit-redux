import React, { FC } from "react";
import ReactFlow, { Background, BackgroundVariant } from "react-flow-renderer";
import { useAppDispatch } from "../app/hooks";
import { store } from "../app/store";
import { entityAdded, selectEntities } from "../features/entities/entitiesSlice";

const FlowWorkspace: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();

    console.log(selectEntities.selectAll(store.getState()));

    const fetchNodes = () => {
        dispatch(entityAdded({
            id: '1',
            type: 'input',
            data: {
                id: 123,
                label: 'test'
            },
            position: {
                x: 250,
                y: 25
            }
        }));
        dispatch(entityAdded({
            id: '2',
            data: {
                id: 2,
                label: 'Another Node'
            },
            position: { x: 100, y: 125 },
        }));
        console.log(selectEntities.selectAll(store.getState()));
    }

    return (
        <React.Fragment>
            <div>
                <button onClick={ fetchNodes }>Fetch nodes!</button>
            </div>
            <div style={ { height: 600 } }>
                <ReactFlow
                    elements={ selectEntities.selectAll(store.getState()) }
                >
                    <Background
                        variant={ BackgroundVariant.Dots }
                        gap={ 12 }
                    />
                </ReactFlow>
            </div>
        </React.Fragment>
    );
}
export default FlowWorkspace;