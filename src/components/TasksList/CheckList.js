import React from "react";
import PropTypes from 'prop-types';


class CheckList extends React.Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.string,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object),
};

export default CheckList;
