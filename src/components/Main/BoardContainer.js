import React from "react";
import update from 'react-addons-update';
import defaultCards from '../../defaultCards';
import Board from "./Board";
import Title from "./Title";
import defaultBg from '../../assets/images/bg-default.jpg';


class BoardContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            cards: [],
            title: 'Kanban board',
        };

        this.updateCardStatus = this.updateCardStatus.bind(this);
        this.updateCardPosition = this.updateCardPosition.bind(this);
    }

    componentDidMount() {
        const updatedCards = localStorage.getItem("kanban-cards")
        const parsedCards = updatedCards ? JSON.parse(updatedCards) : null
        const stateToUpdate = {
            cards: parsedCards ?? defaultCards
        }
        console.log(stateToUpdate, parsedCards)
        this.setState(stateToUpdate);

        if (!parsedCards) {
            localStorage.setItem("kanban-cards", JSON.stringify(defaultCards))
        }
    }


    addTask(cardId, taskName) {
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
        // localStorage.setItem("kanban-cards", JSON.parse(nextState))
    }

    addCard = (card) => {
        if (card.id === null) {
            card = Object.assign({}, card, {id:Date.now()});
        }

        let nextState = update(this.state.cards, {$push: [card]});

        this.setState({cards: nextState});

        // localStorage.setItem("kanban-cards", JSON.stringify(this.state.cards))
    };

    updateCard = (card) => {
        let cardIndex = this.state.cards.findIndex( (currentCard) => currentCard.id === card.id);
        let nextState = update(this.state.cards, {
            [cardIndex]: {$set: card}
        });

        this.setState({cards: nextState});
        // localStorage.setItem("kanban-cards", JSON.parse(nextState))
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
        // localStorage.setItem("kanban-cards", this.state.cards)
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

    changeTitle(userTitle) {
       this.setState({title: userTitle});
    }


    render() {
        return (
            <div>
                <Title title={this.state.title} changeTitle={this.changeTitle.bind(this)}/>

                <Board cards={this.state.cards}
                       taskCallbacks={{
                           toggle: this.toggleTask.bind(this),
                           add: this.addTask.bind(this),
                           delete: this.deleteTask.bind(this)
                       }}
                       cardCallbacks={{
                           addCard: this.addCard,
                           updateCard: this.updateCard,
                           updateCardStatus: this.updateCardStatus,
                           updateCardPosition: this.updateCardPosition,
                       }}
                       bg={defaultBg} />
            </div>
        )
    }
}


export default BoardContainer;
