import React from "react";
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Card extends React.Component{
    constructor() {
        super(...arguments);

        this.state = {
            showDetails: false
        }


    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
        console.log('toogle');
    }

    render() {
        let tasks = this.props.tasks.map( (task, taskId) => (
            <li key={task.id}>
                <input  type="checkbox"
                        checked={task.done}
                />
                {task.name}
            </li>
        ));

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };

        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <p>{this.props.description}</p>
                </div>
            )
        }

        return (
            <div className="card__wrapper">
                <div className={sideColor}>
                    <div className={
                         this.state.showDetails? "card__title card__title--is-open" : "card__title"}
                         onClick={this.toggleDetails.bind(this)}>
                        {this.props.title}
                    </div>
                    <ReactCSSTransitionGroup transitionName="toggle"
                                             transitionEnterTimeout={250}
                                             transitionLeaveTimeout={250}>
                        {cardDetails}
                    </ReactCSSTransitionGroup>
                </div>

            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object),
    description: PropTypes.string,
    taskCallbacks: PropTypes.object,
    color: PropTypes.string
};

export default Card;
