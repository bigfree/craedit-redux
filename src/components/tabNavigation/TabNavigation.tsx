import {FC} from "react";
import {selectAllTabs, TabEntity} from "../../stores/tabNavigation/tabNavigationSlice";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {Box, Tabs} from "@mui/material";
import LinkTab from "./LinkTab";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    selectAllTabs: selectAllTabs
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Tab navigation component
 * @param selectAllTabs
 * @constructor
 */
const TabNavigation: FC<PropsFromRedux> = ({selectAllTabs}): JSX.Element => {
    const selectAllTabsSelector = useSelector(selectAllTabs);

    return (
        <Box sx={{width: '100%'}}>
            <Tabs>
                {selectAllTabsSelector.map(({id}: TabEntity) => (
                    <LinkTab key={id} tabId={id}/>
                ))}
            </Tabs>
            tab navigations
            {JSON.stringify(selectAllTabs)}
        </Box>
    );
}
export default connector(TabNavigation)