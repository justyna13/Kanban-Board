import React from "react";
import List from "./List";
import HTML5Backed from 'react-dnd-html5-backend';
import {DndProvider} from "react-dnd";
import PropTypes from 'prop-types';


class Board extends React.Component {

    render() {
        return (
            <div className="board">
                <div className="lists__wrapper">

                    <DndProvider backend={HTML5Backed}>
                        <List title="To Do"
                              taskCallbacks={this.props.taskCallbacks}
                              cards={this.props.cards.filter( (card) => card.status === 'todo')} />

                        <List title="Doing"
                              taskCallbacks={this.props.taskCallbacks}
                              cards={this.props.cards.filter( (card) => card.status === 'in-progress')} />

                        <List title="Done"
                              taskCallbacks={this.props.taskCallbacks}
                              cards={this.props.cards.filter( (card) => card.status === 'done')} />

                    </DndProvider>
                </div>

                <button className="card--add">+</button>

            </div>

        );
    }
}

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default Board;
