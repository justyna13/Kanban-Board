import React from "react";
import List from "../TasksList/List";
import {DndProvider} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';


class Board extends React.Component {

    render() {
        let bgStyle = {
            background: `url(${this.props.bg})`,
            backgroundSize: '100% 100%'
        };

        return (
            <div className="board" style={bgStyle}>
                <div className="lists">

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

                <button className="card--add">+</button>

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
