import React, { FC } from "react";
import ReactFlow, { Background, BackgroundVariant } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { entitiesSelector, entityAdded } from "../features/entities/entitiesSlice";

const FlowWorkspace: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const nodes = useSelector(entitiesSelector.selectAll);

    console.log(nodes);

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
        console.log(nodes);
    }

    return (
        <React.Fragment>
            <div>
                <button onClick={ fetchNodes }>Fetch nodes!</button>
            </div>
            <div style={ { height: 600 } }>
                <ReactFlow
                    elements={ nodes }
                >
                    <Background
                        variant={ BackgroundVariant.Dots }
                        gap={ 12 }
                    />
                </ReactFlow>
            </div>
            <div>
                { JSON.stringify(nodes) }
            </div>
        </React.Fragment>
    );
}
export default FlowWorkspace;