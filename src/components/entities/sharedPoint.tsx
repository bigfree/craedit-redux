import { Box, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { FC, Fragment } from "react";
import { Handle, Position } from "react-flow-renderer";
import { EntityDataType } from "../../types";

type SharedPointPropsType = {
    sx: SxProps<Theme>
    data: EntityDataType
}

const SharedPoint: FC<SharedPointPropsType> = ({sx, data}: SharedPointPropsType): JSX.Element => {
    return (
        <Fragment>
            <Box
                sx={{
                    width: 190,
                    padding: 1.2,
                    borderColor: '#1a192b',
                    background: 'white',
                    boxShadow: '0 0 0 0.8px #1a192b',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    ...sx
                }}
            >
                <Box sx={{
                    mr: 1,
                    position: 'relative',
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                    backgroundColor: '#888',
                    border: '1px solid #1a192b',
                    '& > *': {
                        visibility: 'hidden',
                        opacity: 0
                    }
                }}>
                    <Handle type={'target'} position={Position.Top}/>
                    <Handle type={'source'} position={Position.Bottom}/>
                </Box>
                <Typography
                    variant={'body2'}
                    component={'div'}
                    sx={{
                        flex: 1,
                        textAlign: 'left'
                    }}
                >
                    {data.name}
                </Typography>
            </Box>
        </Fragment>
    )
}

export default SharedPoint;