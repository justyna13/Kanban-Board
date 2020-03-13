import React from "react";
import CardForm from "./CardForm";
import PropTypes from 'prop-types';

class EditCard extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
                id: this.props.id,
                title: this.props.title,
                description: this.props.description,
                status: this.props.status,
                color: this.props.color,
                tasks: this.props.tasks,
        }
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.close();
        this.props.cardCallbacks.updateCard(this.state);
    }

    render() {
        return (
            <div>
                <CardForm draftCard={this.state}
                          buttonLabel="Edit card"
                          handleChange={this.handleChange.bind(this)}
                          handleSubmit={this.handleSubmit.bind(this)} />
            </div>
        );
    }
}

EditCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.array,
    cardCallbacks: PropTypes.object,
    close: PropTypes.func,
};

export default EditCard;
