import React from "react";
import update from 'react-addons-update';
import defaultCards from '../../defaultCards';
import Board from "./Board";
import defaultBg from '../../assets/images/bg-default.jpg';
import Title from "./Title";


class BoardContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            cards: [],
        }

        this.updateCardStatus = this.updateCardStatus.bind(this);
        this.updateCardPosition = this.updateCardPosition.bind(this);
    }

    componentDidMount() {
        this.setState({cards: defaultCards});
    }


    addTask(cardId, taskName) {
        console.log('add');
        let cardIndex = this.state.cards.findIndex( (card) => card.id === cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards: nextState});
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

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex( (card) => card.id === cardId);
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

    addCard(card) {
        let prevState = this.state;

        if (card.id === null) {
            let card = Object.assign({}, card, {id:Date.now()});
        }

        let nextState = update(this.state.cards, {$push: [card]});

        this.setState({cards: nextState});
    }

    updateCardStatus(cardId, listId) {

        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
        // Get the current card
        let card = this.state.cards[cardIndex];
        // Only proceed if hovering over a different list
        if(card.status !== listId){
            // set the component state to the mutated object
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId , afterId){
        // Only proceed if hovering over a different card
        if(cardId !== afterId) {
            // Find the index of the card
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
            // Get the current card
            let card = this.state.cards[cardIndex]
            // Find the index of the card the user is hovering over
            let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
            // Use splice to remove the card and reinsert it a the new index
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }
    persistCardDrag (cardId, status) {
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Get the current card
        let card = this.state.cards[cardIndex]

    }


    render() {
        return (
            <div>
                <Title title="Kanban Board"/>

                <Board cards={this.state.cards}
                       taskCallbacks={{
                           toogle: this.toggleTask.bind(this),
                           add: this.addTask.bind(this),
                           delete: this.deleteTask.bind(this)
                       }}
                       cardCallbacks={{
                           updateCardStatus: this.updateCardStatus,
                           updateCardPosition: this.updateCardPosition,
                           persistCardDrag: this.persistCardDrag.bind(this)
                       }}
                       bg={defaultBg}
                />
            </div>
        );
    }
}


export default BoardContainer;
