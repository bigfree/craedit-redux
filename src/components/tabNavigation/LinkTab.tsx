import {FC, Fragment, useEffect, useState} from "react";
import {RootState, store} from "../../app/store";
import {connect, ConnectedProps} from "react-redux";
import {selectTabById, TabEntity} from "../../stores/tabNavigation/tabNavigationSlice";
import {Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"
import {blue, indigo} from "@mui/material/colors";
import LinkTabDelete from "./LinkTabDelete";

type LinkTypeOwnProps = {
    tabId: string;
}

const mapStateToProps = (state: RootState, ownProps: LinkTypeOwnProps) => ({
    selectTabById,
    ...ownProps
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * LinkTab component
 * @param tabId
 * @param selectTabById
 * @constructor
 */
const LinkTab: FC<PropsFromRedux> = ({tabId, selectTabById}: PropsFromRedux): JSX.Element => {
    const [tabSelector, setTabSelector] = useState<TabEntity>();

    useEffect(() => {
        setTabSelector(selectTabById(store.getState(), tabId));
    }, [tabId]);

    if (!tabSelector) {
        return <Fragment></Fragment>;
    }

    return (
        <Link
            component={RouterLink}
            to={tabSelector.slug}
            sx={{
                pl: 1.5,
                pr: 0.5,
                py: 1.2,
                backgroundColor: tabSelector.active ? indigo['800'] : blue['A700'],
                borderTopLeftRadius: '.5rem',
                borderTopRightRadius: '.5rem',
                mr: 1,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: tabSelector.active ? indigo['800'] : blue['A700'],
                borderBottom: 0,
                color: '#fff',
                textDecoration: 'none',
            }}
        >
            {tabSelector.name}
            <LinkTabDelete tabId={tabSelector.id}/>
        </Link>
    );
}
export default connector(LinkTab)