import { FlowElement } from "react-flow-renderer";

/**
 * State status ENUM
 */
export enum STATE_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    PENDING = 'pending',
    FAILED = 'failed',
    SUCCESS = 'success'
}

/**
 * Element data
 */
export type IEntityDataType = {
    id: number;
    label: string;
}

/**
 * Workflow Element
 */
export type IWFEntityType = FlowElement<IEntityDataType>;