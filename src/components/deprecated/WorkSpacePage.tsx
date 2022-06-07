// import { FC, Fragment, useEffect } from "react";
// import {Box, Paper} from "@mui/material";
// import FlowWorkspace from "../flowWorkspace";
// import { useAppDispatch } from "../../app/hooks";
// import { Outlet, useParams } from "react-router-dom";
// import { useGetEntitiesByWorkflowIdQuery } from "../../stores/api";
// import { entitiesReceived } from "../../stores/entities/entitiesSlice";
//
// type UrlParamsType = {
//     workflowId: string;
// }
//
// /**
//  * WorkflowSpace page
//  * @constructor
//  */
// const WorkSpacePage: FC = (): JSX.Element => {
//     const dispatch = useAppDispatch();
//     const urlParams = useParams<UrlParamsType>();
//
//     const {data, error, isLoading} = useGetEntitiesByWorkflowIdQuery(urlParams.workflowId as string);
//
//     useEffect(() => {
//         if (data) {
//             dispatch(entitiesReceived(data));
//         }
//     }, [data]);
//
//
//     /**
//      * @deprecated
//      */
//     const fetchNodes = () => {
//         // dispatch(entitiesLoading());
//         // dispatch(entitiesReceived([
//         //     {
//         //         id: nanoid(),
//         //         type: 'input',
//         //         data: {
//         //             id: 'TA_SrPreCompleteServiceInformationCancel',
//         //             name: 'test'
//         //         },
//         //         position: {
//         //             x: 250,
//         //             y: 25
//         //         }
//         //     },
//         //     {
//         //         id: nanoid(),
//         //         data: {
//         //             id: 'TA_SrPreCompleteServiceInformationCancel',
//         //             name: 'Another Node'
//         //         },
//         //         position: {x: 100, y: 125},
//         //     },
//         //     {
//         //         id: nanoid(),
//         //         data: {
//         //             id: 'TA_SrPreCompleteServiceInformationCancel',
//         //             name: 'ABCD'
//         //         },
//         //         position: {x: 125, y: 300},
//         //     }
//         // ]));
//     }
//
//     return (
//         <Fragment>
//             <Paper
//                 sx={{
//                     flex: '1 1 100%',
//                     position: 'relative',
//                     display: 'flex',
//                     flexWrap: 'nowrap',
//                     alignItems: 'flex-start',
//                     justifyItems: 'flex-start',
//                     marginTop: 1,
//                     marginLeft: 1,
//                     marginRight: 1.5,
//                     marginBottom: 1.5,
//                     backgroundColor: '#ffffff',
//                     borderTopLeftRadius: 0,
//                     borderBottomLeftRadius: 0,
//                 }}
//                 elevation={2}
//             >
//                 <Box sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     zIndex: 99,
//                 }}>
//                     <button onClick={fetchNodes}>Fetch nodes!</button>
//                 </Box>
//
//                 <FlowWorkspace/>
//                 <Outlet/>
//             </Paper>
//         </Fragment>
//     );
// }
//
// export default WorkSpacePage;