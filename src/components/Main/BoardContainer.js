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
        };

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

    addCard = (card) => {
        console.log(this.state);

        if (card.id === null) {
            let card = Object.assign({}, card, {id:Date.now()});
        }

        let nextState = update(this.state.cards, {$push: [card]});

        this.setState({cards: nextState});
    };

    updateCard = (card) => {
        let cardIndex = this.state.cards.findIndex( (currentCard) => currentCard.id === card.id);
        let nextState = update(this.state.cards, {
            [cardIndex]: {$set: card}
        });

        this.setState({cards: nextState});
    };

    updateCardStatus(cardId, listId) {

        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
        let card = this.state.cards[cardIndex];

        if(card.status !== listId){

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

        if(cardId !== afterId) {

            let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card)=>card.id === afterId);

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


    render() {

        let board = this.props.children && React.cloneElement(Board, {
            cards: this.state.cards,
            taskCallbacks:{
                toogle: this.toggleTask.bind(this),
                add: this.addTask.bind(this),
                delete: this.deleteTask.bind(this)
            },
            cardCallbacks:{
                updateCard: this.updateCard,
                updateCardStatus: this.updateCardStatus,
                updateCardPosition: this.updateCardPosition,
            },
            bg: defaultBg
        });

        return (
            <Board cards={this.state.cards}
                   taskCallbacks={{
                       toogle: this.toggleTask.bind(this),
                       add: this.addTask.bind(this),
                       delete: this.deleteTask.bind(this)
                   }}
                   cardCallbacks={{
                       addCard: this.addCard,
                       updateCard: this.updateCard,
                       updateCardStatus: this.updateCardStatus,
                       updateCardPosition: this.updateCardPosition,
                   }}
                   bg={defaultBg}
                />
        )
    }
}


export default BoardContainer;
