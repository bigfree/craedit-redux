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

const connector = connect(() => ({
    selectAllTabs,
    selectTabBySlug,
}), {
    tabSetAll,
    tabUpdateMany,
    tabSetActive
});

/**
 * Tab navigation component
 * @param selectAllTabs
 * @param tabSetAll
 * @param tabRemoveAllActive
 * @constructor
 */
const TabNavigation: FC<ConnectedProps<typeof connector>> = ({selectAllTabs, tabSetAll, tabSetActive}): JSX.Element => {
    const params = useParams<{ workflowId: string }>();
    const selectAllTabsSelector = useSelector(selectAllTabs);

    /** Initial tabs for testing */
    useEffect(() => {
        if (0 === selectAllTabsSelector.length) {
            tabSetAll([{
                id: nanoid(),
                name: 'TestWorkflow',
                active: false,
                slug: 'TestWorkflow'
            }, {
                id: nanoid(),
                name: 'TestWorkflow2',
                active: false,
                slug: 'TestWorkflow2'
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