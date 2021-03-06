import React from "react";
import PropTypes from 'prop-types';
import CardForm from "./CardForm";


class NewCard extends React.Component {

    componentWillMount() {
        this.setState( {
            id: Date.now(),
            title: '',
            description: '',
            status: 'todo',
            color: "#000",
            tasks: [],
        });
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.close();
        this.props.cardCallbacks.addCard(this.state);
    }


    render() {
        return (
           <div>
               <CardForm draftCard={this.state}
                         buttonLabel='add new card'
                         handleSubmit={this.handleSubmit.bind(this)}
                         handleChange={this.handleChange.bind(this)} />
           </div>
        );
    }
}

NewCard.propTypes = {
    cardCallbacks: PropTypes.object,
    close: PropTypes.func,
};

export default NewCard;
