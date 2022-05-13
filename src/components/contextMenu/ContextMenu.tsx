import { FC, Fragment } from "react";
import { Box, Button, ButtonGroup, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { FileUpload, History, Redo, Refresh, Save, Undo } from "@mui/icons-material";

type ContextMenuPropsType = {
    coordinates: {mouseX: number; mouseY: number} | null;
    handleClose: () => void;
}

/**
 * ContextMenu component
 * @param coordinates
 * @param handleClose
 * @constructor
 */
const ContextMenu: FC<ContextMenuPropsType> = ({coordinates, handleClose}: ContextMenuPropsType): JSX.Element => {
    return (
        <Fragment>
            <Menu
                open={null !== coordinates}
                onClose={handleClose}
                anchorReference={'anchorPosition'}
                anchorPosition={null !== coordinates ? {
                    top: coordinates.mouseY,
                    left: coordinates.mouseX,
                } : undefined}
                sx={{
                    width: 320,
                    maxWidth: '100%',
                }}
                elevation={3}
            >
                <Box
                    component={'li'}
                    sx={{
                        px: 1,
                        pb: 1,
                    }}
                >
                    <Typography
                        component={'div'}
                        sx={{
                            pb: 0.5,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}
                    >
                        Vytvorit novy:
                    </Typography>
                    <ButtonGroup
                        variant={'outlined'}
                        size={'small'}
                        disableElevation
                    >
                        <Button sx={{
                            width: 85,
                            py: 0.5,
                            fontSize: 11,
                            background: 'yellow'
                        }}>SyncPoint</Button>
                        <Button sx={{
                            width: 85,
                            py: 0.5,
                            fontSize: 11,
                            background: 'lightcyan',
                        }}>Condition</Button>
                        <Button sx={{
                            width: 85,
                            py: 0.5,
                            fontSize: 11,
                            background: 'lightgrey'
                        }}>Task</Button>
                    </ButtonGroup>
                </Box>
                <Divider sx={{
                    mb: 1
                }}/>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <Save/>
                    </ListItemIcon>
                    Ulozit
                </MenuItem>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <Refresh/>
                    </ListItemIcon>
                    Obnovit
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <Undo/>
                    </ListItemIcon>
                    Naspat
                </MenuItem>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <Redo/>
                    </ListItemIcon>
                    Dopredu
                </MenuItem>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <History/>
                    </ListItemIcon>
                    Zobrazit historiu
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose} dense={true}>
                    <ListItemIcon>
                        <FileUpload/>
                    </ListItemIcon>
                    Zobrazit JSON
                </MenuItem>
            </Menu>
        </Fragment>
    );
}

export default ContextMenu;