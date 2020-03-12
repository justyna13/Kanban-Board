import React from "react";
import List from "../TasksList/List";
import {DndProvider} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import {Button, ModalBody, ModalTitle} from "react-bootstrap";
import NewCard from "../Card/NewCard";
import CardForm from "../Card/CardForm";


class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
        }
    }


    toggleModal = () => {
        this.state.modalVisible
            ? this.setState({
                modalVisible: false
            })
            : this.setState({modalVisible: true});

    };


    render() {
        let bgStyle = {
            background: `url(${this.props.bg})`,
            backgroundSize: '100% 100%'
        };

        return (
            <div className="board" style={bgStyle}>
                <div className={this.state.modalVisible? "lists modal--open": "lists"}>

                    <DndProvider backend={HTML5Backend}>

                        <List id='todo'
                              title="To Do"
                              taskCallbacks={this.props.taskCallbacks}
                              cardCallbacks={this.props.cardCallbacks}
                              cards={this.props.cards.filter( (card) => card.status === 'todo')} />

                        <List id='in-progress'
                              title="Doing"
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


                <Button className="card--add"
                        onClick={() => this.toggleModal()}>+</Button>

                <Modal show={this.state.modalVisible} size="xl"
                       onHide={() => this.toggleModal()}>
                    <ModalHeader closeButton>
                        <h3 className="modal__title">Add new card</h3>
                    </ModalHeader>

                    <ModalBody>
                        <NewCard cards={this.props.cards}
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
