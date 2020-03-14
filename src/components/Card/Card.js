import React from "react";
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import constants from "../../constants";

import CheckList from "../TasksList/CheckList";
import EditCard from "./EditCard";
import {Modal, ModalBody} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";


const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            status: props.status
        };
    }
};

const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateCardPosition(draggedId, props.id)
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
    }
};

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    }
};


class Card extends React.Component{
    constructor() {
        super(...arguments);

        this.state = {
            showDetails: false,
            updateModalVisible: false,
        }
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    toggleUpdateModal = () => {
        this.setState({updateModalVisible: !this.state.updateModalVisible});
    };

    render() {
        const { connectDragSource, connectDropTarget} = this.props;

        let sideColor = {
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color,
            borderBottomLeftRadius: 3,
            borderTopLeftRadius: 3
        };

        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details" >
                    <h4 className="card__details__label">Description: </h4>
                    <p>{this.props.description}</p>

                    <CheckList cardId={this.props.id}
                               tasks={this.props.tasks}
                               taskCallbacks={this.props.taskCallbacks} />

                </div>
            )
        }

        return connectDropTarget(connectDragSource(
            <div className="card" >
                <div>
                    <div style={sideColor}>

                    </div>
                    <div className="card__header">
                        <div className={
                            this.state.showDetails? "card__title card__title--is-open" : "card__title"}
                             onClick={this.toggleDetails.bind(this)}>
                            {this.props.title}
                        </div>

                        <button className="checklist__task__btn checklist__task__btn--edit"
                                onClick={this.toggleUpdateModal.bind(this)}>
                            <i className="fa fa-edit"> </i>
                        </button>
                        
                    </div>

                    <ReactCSSTransitionGroup transitionName="toggle"
                                             transitionEnterTimeout={250}
                                             transitionLeaveTimeout={250}>
                        {cardDetails}
                    </ReactCSSTransitionGroup>
                </div>

                <Modal show={this.state.updateModalVisible} size="xl"
                       onHide={() => this.toggleUpdateModal()}>
                    <ModalHeader closeButton>
                        <h3 className="modal__title">Edit <i>{this.props.title}</i> card</h3>
                    </ModalHeader>

                    <ModalBody>
                        <EditCard id={this.props.id}
                                  title={this.props.title}
                                  description={this.props.description}
                                  status={this.props.status}
                                  color={this.props.color}
                                  tasks={this.props.tasks}
                                  cardCallbacks={this.props.cardCallbacks}
                                  close={this.toggleUpdateModal}/>

                    </ModalBody>

                </Modal>


            </div>
        ));
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    color: PropTypes.string
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard

