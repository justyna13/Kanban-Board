import React from "react";
import update from 'react-addons-update';
import defaultCards from '../defaultCards';
import Board from "./Board";


class BoardContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            cards: [],
        }
    }

    componentDidMount() {
        this.setState({cards: defaultCards});
    }


    addTask(cardId, taskName) {

        let cardIndex = this.state.cards.findIndex( (card) => card.id === cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextstate = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards: nextstate});
    }

    deleteTask(cardId, taskId, taskIndex) {

        let cardIndex = this.state.cards.findIndex( (card) => card.id === cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });

        this.setState({cards: nextState});
    }

    toogleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex( (card) => card.id === cardIndex);
        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {$apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }}
                    }
                }
            }
        });

        this.setState({cards: nextState});
    }

    render() {
        return (
            <div>
                <Board cards={this.state.cards}
                       taskCallbacks={{
                           toogle: this.toogleTask.bind(this),
                           add: this.addTask.bind(this),
                           delete: this.deleteTask.bind(this)
                       }}
                />
            </div>
        );
    }
}


export default BoardContainer;
