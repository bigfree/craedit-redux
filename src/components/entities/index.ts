import { NodeTypesType } from "react-flow-renderer";
import ConditionPoint from "./conditionPoint";
import SyncPoint from "./syncPoint";
import TaskPoint from "./taskPoint";

export const entitiesTypes: NodeTypesType = {
    syncPoint: SyncPoint,
    taskPoint: TaskPoint,
    conditionPoint: ConditionPoint,
}