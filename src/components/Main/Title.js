import React from "react";
import PropTypes from 'prop-types';

class Title extends React.Component {
    render() {
        return (
            <div className="board__title">
                {this.props.title}
            </div>
        )
    }
}

Title.defaultProps = {
    title: 'Kanban Board',
};

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;
