import { nanoid } from '@reduxjs/toolkit'
import React, { FC } from "react";
import ReactFlow, { Background, BackgroundVariant, Connection, Edge } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import {
    entitiesLoading,
    entitiesOnConnect,
    entitiesReceived,
    entitiesSelector,
    fetchEntitiesByWfId
} from "../features/entities/entitiesSlice";
import { entitiesTypes } from "./entities";

const FlowWorkspace: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const nodes = useSelector(entitiesSelector.selectAll);

    console.log(nodes);

    const fetchNodes = () => {
        dispatch(entitiesLoading());
        dispatch(entitiesReceived([
            {
                id: nanoid(),
                type: 'input',
                data: {
                    id: 'TA_SrPreCompleteServiceInformationCancel',
                    name: 'test'
                },
                position: {
                    x: 250,
                    y: 25
                }
            },
            {
                id: nanoid(),
                data: {
                    id: 'TA_SrPreCompleteServiceInformationCancel',
                    name: 'Another Node'
                },
                position: {x: 100, y: 125},
            },
            {
                id: nanoid(),
                data: {
                    id: 'TA_SrPreCompleteServiceInformationCancel',
                    name: 'ABCD'
                },
                position: {x: 125, y: 300},
            }
        ]));
        console.log(nodes);
    }

    const fetchAsyncNodes = async () => {
        await dispatch(fetchEntitiesByWfId('test'));
    }

    return (
        <React.Fragment>
            <div>
                <button onClick={fetchNodes}>Fetch nodes!</button>
                <button onClick={fetchAsyncNodes}>Fetch async nodes!</button>
            </div>
            <div style={{height: 600}}>
                <ReactFlow
                    elements={nodes}
                    onConnect={(params: Edge | Connection) => dispatch(entitiesOnConnect(params))}
                    nodeTypes={entitiesTypes}
                >
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={12}
                    />
                </ReactFlow>
            </div>
            <div>
                {JSON.stringify(nodes)}
            </div>
        </React.Fragment>
    );
}
export default FlowWorkspace;