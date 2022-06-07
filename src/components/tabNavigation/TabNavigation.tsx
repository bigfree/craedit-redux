import {FC, Fragment, useEffect} from "react";
import {
    selectAllTabs,
    selectTabBySlug,
    TabEntity,
    tabSetActive,
    tabSetAll,
    tabUpdateMany
} from "../../stores/tabNavigation/tabNavigationSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {Box} from "@mui/material";
import LinkTab from "./LinkTab";
import {nanoid} from "@reduxjs/toolkit";
import {TabsUnstyled} from "@mui/base";
import {useParams} from "react-router-dom";

const mapStateToProps = () => {
    return {
        selectAllTabs,
        selectTabBySlug,
    };
};

const mapDispatchToProps = {
    tabSetAll,
    tabUpdateMany,
    tabSetActive
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Tab navigation component
 * @param selectAllTabs
 * @param tabSetAll
 * @param tabRemoveAllActive
 * @constructor
 */
const TabNavigation: FC<PropsFromRedux> = ({selectAllTabs, tabSetAll, tabSetActive}): JSX.Element => {
    const params = useParams<{ workflowId: string }>();
    const selectAllTabsSelector = useSelector(selectAllTabs);

    /** Initial tabs for testing */
    useEffect(() => {
        if (0 === selectAllTabsSelector.length) {
            tabSetAll([{
                id: nanoid(),
                name: 'test name',
                active: false,
                slug: 'test'
            }, {
                id: nanoid(),
                name: 'test name 2',
                active: false,
                slug: 'test2'
            }, {
                id: nanoid(),
                name: 'Playground',
                active: false,
                slug: 'playground'
            }]);
        }
    }, []);

    useEffect(() => {
        tabSetActive(params?.workflowId ?? '');
    }, [params]);

    if (0 === selectAllTabsSelector.length) {
        return <Fragment></Fragment>
    }

    return (
        <TabsUnstyled component={Box} sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'end',
            ml: 3
        }}>
            {selectAllTabsSelector.map(({id}: TabEntity, index: number) => (
                <LinkTab key={index} tabId={id}/>
            ))}
        </TabsUnstyled>
    );
}
export default connector(TabNavigation)