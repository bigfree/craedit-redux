import {FC, Fragment} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../app/store";
import {selectWorkflowById, WorkflowEntity, workflowUpdateOne} from "../../stores/workflows/workflowSlice";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, Stack, TextField} from "@mui/material";

type OwnProps = {
    workflowId: string;
}

type UpdateWorkflowForm = Pick<WorkflowEntity, 'id' | 'name'>;

const connector = connect((state: RootState, ownProps: OwnProps) => ({
    selectWorkflowById: selectWorkflowById(state, ownProps.workflowId),
    ...ownProps
}), {
    workflowUpdateOne
})

const schema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
}).required();

const WorkflowHeaderForm: FC<ConnectedProps<typeof connector>> = (props): JSX.Element => {
    const {selectWorkflowById, workflowUpdateOne} = props;
    const {control, handleSubmit} = useForm<UpdateWorkflowForm>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    if (!selectWorkflowById) {
        return <Fragment></Fragment>;
    }

    const onSubmit: SubmitHandler<UpdateWorkflowForm> = (data) => {
        workflowUpdateOne({
            id: selectWorkflowById.id,
            changes: {
                name: data.name
            }
        });
    };

    return (
        <Fragment>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Box sx={{
                py: 2,
            }}></Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction={'row'}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                    spacing={1}
                >
                    <Box sx={{
                        flexBasis: '20vw'
                    }}>
                        <Controller
                            name={'id'}
                            control={control}
                            render={(params) => (
                                <TextField
                                    label={'Workflow ID'}
                                    variant={'outlined'}
                                    color={'secondary'}
                                    size={'small'}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <Controller
                            name={'name'}
                            control={control}
                            render={(params) => (
                                <TextField
                                    label={'Workflow Name'}
                                    variant={'outlined'}
                                    color={'secondary'}
                                    size={'small'}
                                />
                            )}
                        />
                    </Box>
                </Stack>
                {/*<input {...register("id")} value={selectWorkflowById?.id}/>*/}
                {/*<p>{errors.id?.message}</p>*/}

                {/*<input {...register("name")} value={selectWorkflowById?.name}/>*/}
                {/*<p>{errors.name?.message}</p>*/}

                {/*<button type={'submit'}>Save</button>*/}
            </form>
        </Fragment>
    )
}
export default connector(WorkflowHeaderForm);