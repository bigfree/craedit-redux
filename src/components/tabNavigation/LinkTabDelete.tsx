import {FC, SyntheticEvent, useEffect, useState} from "react";
import {IconButton} from "@mui/material";
import {RootState, store} from "../../app/store";
import {selectTabById, TabEntity, tabRemoveOne} from "../../stores/tabNavigation/tabNavigationSlice";
import {connect, ConnectedProps} from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import {useLocation, useNavigate} from "react-router-dom";

type LinkDeleteTypeOwnProps = {
    tabId: string;
}

const mapStateToProps = (state: RootState, ownProps: LinkDeleteTypeOwnProps) => ({
    selectTabById,
    ...ownProps
});

const connector = connect(mapStateToProps, {
    tabRemoveOne
});

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * LinkTabDelete component
 * @param tabId
 * @param tabRemoveOne
 * @param selectTabById
 * @constructor
 */
const LinkTabDelete: FC<PropsFromRedux> = ({tabId, tabRemoveOne, selectTabById}: PropsFromRedux): JSX.Element => {
    const [tabSelector, setTabSelector] = useState<TabEntity>();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setTabSelector(selectTabById(store.getState(), tabId));
    }, [tabId]);

    const handleOnClick = (event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!tabSelector) {
            return;
        }

        tabRemoveOne(tabId);

        if (location.pathname === tabSelector.slug) {
            navigate('/', {replace: true});
        }
    }

    return (
        <IconButton
            onClick={handleOnClick}
            type={'button'}
            size={'small'}
            sx={{
                color: '#fff',
                ml: 0.5
            }}
        >
            <CloseIcon fontSize={'inherit'}/>
        </IconButton>
    )
}
export default connector(LinkTabDelete);