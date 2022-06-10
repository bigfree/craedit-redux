export type GlobalSliceState = {
    loading: boolean;
    error: string | null;
}

// import { Node } from "react-flow-renderer";
//
// /**
//  * State status ENUM
//  */
// export enum STATE_STATUS {
//     IDLE = 'idle',
//     LOADING = 'loading',
//     PENDING = 'pending',
//     FAILED = 'failed',
//     SUCCESS = 'success'
// }
//
// export enum POINT_TYPE {
//     AUTOMATIC = 'A',
//     MANUAL = 'M',
//     AUTOMATIC_MANUAL = 'AM'
// }
//
// export enum TERM_TYPE {
//     DAY = 'day',
//     HOUR = 'hour',
//     WORK_DAY = 'work_day',
//     WORK_HOUR = 'work_hour'
// }
//
// export enum SYNC_TYPE {
//     NONE = 'NONE',
//     SEMI = 'SEMI',
//     FULL = 'FULL'
// }
//
// export type ValidationErrorsType = {
//     message: string
//     fieldErrors: Record<string, string>
// }
//
// /**
//  * SyncPoint data types
//  */
// export type EntitySyncPointType = {
//     syncPointType?: POINT_TYPE
//     urgent?: boolean
//     syncType?: SYNC_TYPE
// }
//
// /**
//  * TaskPoint data types
//  */
// export type EntityTaskPointType = {
//     id: string
//     name: string
//     taskType?: POINT_TYPE
//     workplaceId?: string | null
//     setupActionId?: string
//     termValue?: number
//     termType?: TERM_TYPE
//     nestedWorkflow?: string[]
//     canRedo?: boolean
//     notSendEmail?: boolean
//     urgent?: boolean
//     outOfWorkflow?: boolean
//     params?: string
//     autoFinishMessage?: string
//     autoWorkedOutAfterTerm?: boolean
//     cancelOnGlobalCancel?: boolean
//     disableControls?: boolean
// }
//
// /**
//  * ConditionPoint data types
//  */
// export type EntityConditionPointType = {
//     conditionType?: string
// }
//
// /**
//  * Entity data types
//  */
// export type EntityDataType = EntitySyncPointType & EntityConditionPointType & EntityTaskPointType;
//
// /**
//  * Workflow entity
//  */
// export type WFEntityType = Node<EntityDataType>;
//
// /**
//  * Workflow element
//  */
// export type WorkflowType = {
//     id: string;
//     name: string;
// }