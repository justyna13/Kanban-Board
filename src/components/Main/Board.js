import React from "react";
import {DndProvider} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import List from "../TasksList/List";
import NewCard from "../Card/NewCard";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import {Button, ModalBody} from "react-bootstrap";


class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
        }
    }


    toggleModal = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    };


    render() {
        let bgStyle = {
            background: `url(${this.props.bg})`,
            overflow: 'scroll',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };

        return (
            <div className="board" style={bgStyle}>
                <div>
                    <div className={this.state.modalVisible? "lists modal--open": "lists"}>

                        <DndProvider backend={HTML5Backend}>

                            <List id='todo'
                                  title="To Do"
                                  taskCallbacks={this.props.taskCallbacks}
                                  cardCallbacks={this.props.cardCallbacks}
                                  cards={this.props.cards.filter( (card) => card.status === 'todo')} />

                            <List id='in-progress'
                                  title="In progress"
                                  taskCallbacks={this.props.taskCallbacks}
                                  cardCallbacks={this.props.cardCallbacks}
                                  cards={this.props.cards.filter( (card) => card.status === 'in-progress')} />

                            <List id="done"
                                  title="Done"
                                  taskCallbacks={this.props.taskCallbacks}
                                  cardCallbacks={this.props.cardCallbacks}
                                  cards={this.props.cards.filter( (card) => card.status === 'done')} />

                        </DndProvider>
                    </div>
                </div>
                <Button className="card--add"
                        onClick={() => this.toggleModal()}>+</Button>

                <Modal show={this.state.modalVisible} size="xl"
                       onHide={() => this.toggleModal()}>
                    <ModalHeader closeButton>
                        <h3 className="modal__title">Add new card</h3>
                    </ModalHeader>

                    <ModalBody>
                        <NewCard cards={this.props.cards}
                                 close={this.toggleModal}
                                 cardCallbacks={this.props.cardCallbacks}/>

                    </ModalBody>

                </Modal>
            </div>

        );
    }
}

Board.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    bg: PropTypes.string,
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
};

export default Board;
