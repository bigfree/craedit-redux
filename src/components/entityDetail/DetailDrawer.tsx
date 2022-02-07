import { FC, Fragment, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultRootState, useSelector } from "react-redux";
import { entitiesSelector } from "../../stores/entities/entitiesSlice";

type UrlParamsType = {
    entityId: string;
    workflowId: string;
}

const DetailDrawer: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const urlParams = useParams<UrlParamsType>();
    const [open, setOpen] = useState<boolean>(true);

    /** Get entity from store by ID */
    const node = useSelector((state: DefaultRootState) => {
        return entitiesSelector.selectById(state, urlParams.entityId ?? '');
    });

    useEffect(() => {
        if (!open) {
            /**
             * If Drawer transition end navigate to flow workspace
             * 200ms is an estimate time
             */
            setTimeout(() => {
                navigate(`/${urlParams.workflowId ?? ''}`);
            }, 200);
        }
    }, [open]);

    /**
     * Close drawer
     */
    const handleCloseDrawer = () => {
        setOpen(false);
    }

    return (
        <Fragment>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={handleCloseDrawer}
            >
                <Box
                    role={'presentation'}
                    sx={{
                        width: 450,
                    }}
                >
                    <pre>
                        {JSON.stringify(node, null, 4)}
                    </pre>
                </Box>
            </Drawer>
        </Fragment>
    );
}

export default DetailDrawer;