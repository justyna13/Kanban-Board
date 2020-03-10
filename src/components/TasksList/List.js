import React from "react";
import Card from "./Card/Card";
import PropTypes from 'prop-types';

const listSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;


    }
};


class List extends React.Component {
    render() {

        let cards = this.props.cards.map( (card) => {
            return <Card key={card.id}
                         taskCallbacks={this.props.taskCallbacks}
                {...card} />
        });

        return (
            <div>
                <h2>{this.props.title}</h2>
                {cards}
            </div>
        );
    }
}

List.propTypes = {
  cards: PropTypes.object.isRequired,
  taskCallbacks: PropTypes.object,
  title: PropTypes.string.isRequired
};


export default List;
