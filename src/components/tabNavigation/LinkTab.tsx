import {FC, Fragment, useEffect, useState} from "react";
import {RootState, store} from "../../app/store";
import {connect, ConnectedProps} from "react-redux";
import {selectTabById, TabEntity} from "../../stores/tabNavigation/tabNavigationSlice";
import {Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"
import {blue} from "@mui/material/colors";
import LinkTabDelete from "./LinkTabDelete";

type LinkTypeOwnProps = {
    tabId: string;
}

const mapStateToProps = (state: RootState, ownProps: LinkTypeOwnProps) => ({
    tabSelector: selectTabById(state, ownProps.tabId),
    ...ownProps
});

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * LinkTab component
 * @param tabId
 * @constructor
 */
const LinkTab: FC<PropsFromRedux> = ({tabSelector}: PropsFromRedux): JSX.Element => {

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
                backgroundColor: tabSelector.active ? blue['A400'] : blue['A700'],
                borderTopLeftRadius: '.25rem',
                borderTopRightRadius: '.25rem',
                mr: 1,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: tabSelector.active ? blue['700'] : blue['800'],
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