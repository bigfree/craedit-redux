import { FC, Fragment, MouseEvent, useState } from "react";
import ReactFlow, { Background, BackgroundVariant, Node } from "react-flow-renderer";
import { entitiesTypes } from "./entities";
import { WFEntityType } from "../types";
import { Box } from "@mui/material";
import ContextMenu from "./contextMenu/ContextMenu";
import { useAppDispatch } from "../app/hooks";
import { entitiesSelector, entityUpdated } from "../stores/entities/entitiesSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * FlowWorkspace component
 * @constructor
 */
const FlowWorkspace: FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const nodes = useSelector(entitiesSelector.selectAll)
    const navigate = useNavigate();

    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    /**
     * Open context menu
     * @param event
     */
    const handlePaneContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        setContextMenu(null === contextMenu ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        } : null);
    }

    /**
     * Close context menu
     */
    const handlePaneContextMenuClose = () => {
        setContextMenu(null);
    }

    /**
     * Update entity position
     * @param event
     * @param node
     */
    const handleNodeDragStop = (event: MouseEvent, node: WFEntityType) => {
        dispatch(entityUpdated({
            id: node.id,
            changes: {
                position: {
                    x: (node as Node).position.x,
                    y: (node as Node).position.y,
                }
            }
        }));
    }

    /**
     * Open entity detail
     * @param event
     * @param node
     */
    const handleOpenDetailEntity = (event: MouseEvent, node: WFEntityType) => {
        navigate(node.id);
    }

    return (
        <Fragment>
            <Box sx={{
                flex: '1 1 100%',
                height: '100%',
            }}>
                <ReactFlow
                    elements={nodes}
                    nodeTypes={entitiesTypes}
                    snapToGrid={true}
                    snapGrid={[2, 2]}
                    selectNodesOnDrag={false}
                    onPaneContextMenu={handlePaneContextMenu}
                    onNodeDragStop={handleNodeDragStop}
                    onElementClick={handleOpenDetailEntity}
                >
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={10}
                    />
                </ReactFlow>
            </Box>
            <ContextMenu
                coordinates={contextMenu}
                handleClose={handlePaneContextMenuClose}
            />
        </Fragment>
    );
}

export default FlowWorkspace;