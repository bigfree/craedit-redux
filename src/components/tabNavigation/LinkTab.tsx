import {FC} from "react";
import {RootState} from "../../app/store";
import {connect, ConnectedProps} from "react-redux";
import {selectTabById} from "../../stores/tabNavigation/tabNavigationSlice";

export type LinkTypeProps = {
    tabId: string;
}

const mapStateToProps = (state: RootState, ownProps: LinkTypeProps) => ({
    selectById: selectTabById,
    ...ownProps
});

const connector = connect(mapStateToProps, null);

type PropsFromRedux = ConnectedProps<typeof connector>;

const LinkTab: FC<PropsFromRedux> = ({tabId, selectById}): JSX.Element => {
    return (
        <p>link tab {tabId}</p>
    );
}
export default connector(LinkTab)