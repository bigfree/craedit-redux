import {FC, Fragment, useEffect} from "react";
import {
    selectAllTabs,
    selectTabBySlug,
    TabEntity,
    tabSetAll,
    tabUpdateMany
} from "../../stores/tabNavigation/tabNavigationSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {Box} from "@mui/material";
import LinkTab from "./LinkTab";
import {nanoid} from "@reduxjs/toolkit";
import {TabsUnstyled} from "@mui/base";
import {useLocation} from "react-router-dom";
import {RootState, store} from "../../app/store";

const mapStateToProps = () => ({
    selectAllTabs,
    selectTabBySlug,
});

const mapDispatchToProps = {
    tabSetAll,
    tabUpdateMany
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Tab navigation component
 * @param selectAllTabs
 * @param tabSetAll
 * @constructor
 */
const TabNavigation: FC<PropsFromRedux> = ({selectAllTabs, tabSetAll}): JSX.Element => {
    const location = useLocation();
    const selectAllTabsSelector = useSelector(selectAllTabs);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const activeTab: TabEntity = selectTabBySlug(store.getState(), location.pathname);
        console.log(activeTab.id);
    }, [location]);

    /** Initial tabs for testing */
    useEffect(() => {
        tabSetAll([{
            id: nanoid(),
            name: 'test name',
            active: true,
            slug: '/test'
        }, {
            id: nanoid(),
            name: 'test name 2',
            active: false,
            slug: '/test2'
        }, {
            id: nanoid(),
            name: 'test name 3',
            active: false,
            slug: '/test3'
        }]);
    }, []);

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