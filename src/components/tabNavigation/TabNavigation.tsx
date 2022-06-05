import {FC, Fragment, useEffect} from "react";
import {selectAllTabs, TabEntity, tabSetAll} from "../../stores/tabNavigation/tabNavigationSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {Box} from "@mui/material";
import LinkTab from "./LinkTab";
import {nanoid} from "@reduxjs/toolkit";
import {TabsUnstyled} from "@mui/base";

const mapStateToProps = () => ({
    selectAllTabs
});

const mapDispatchToProps = {
    tabSetAll
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
    const selectAllTabsSelector = useSelector(selectAllTabs);

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
            ml: 2
        }}>
            {selectAllTabsSelector.map(({id}: TabEntity, index: number) => (
                <LinkTab key={index} tabId={id}/>
            ))}
        </TabsUnstyled>
    );
}
export default connector(TabNavigation)