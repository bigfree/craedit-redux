import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { WFEntityType } from "../types";

/**
 * CraEdit API
 */
export const craEditApi = createApi({
    reducerPath: 'craEditApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
    }),
    endpoints: (builder: EndpointBuilder<any, any, any>) => ({
        getEntitiesByWorkflowId: builder.query<WFEntityType[], string>({
            query: (workflowId: string) => {
                if ('' === workflowId) {
                    return {
                        error: {
                            reason: 'Invalid ID provided'
                        }
                    }
                }

                return `${workflowId}.json`;
            }
        }),
    }),
});

export const {useGetEntitiesByWorkflowIdQuery} = craEditApi;