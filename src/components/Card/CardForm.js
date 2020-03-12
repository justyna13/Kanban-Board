import React from "react";
import PropTypes from 'prop-types';


class CardForm extends React.Component {

    handleChange(field, e) {
        console.log('field:');
        console.log(field);
        console.log('target:');
        console.log(e.target.value);
        this.props.handleChange(field, e.target.value);
    }

    handleClose(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="card--new">
                    <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <label htmlFor="title">Card title</label> <br/>
                        <input type="text"
                               value={this.props.draftCard.title}
                               onChange={this.handleChange.bind(this, 'title')}
                               placeholder='title'
                               required={true}
                               autoFocus={true} /> <br/>  <br/>
                        <label htmlFor="description">Description</label> <br/>
                        <textarea value={this.props.draftCard.description}
                                  onChange={this.handleChange.bind(this, 'description')}
                                  placeholder='description'
                                  required={true} /> <br/>  <br/>
                        <label htmlFor="status">Status</label>
                        <select id="status"
                                onChange={this.handleChange.bind(this, 'status')}
                                defaultValue={this.props.draftCard.status}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select> <br/>
                        <label htmlFor="color">Color</label>
                        <input type="color"
                               id="color"
                               value={this.props.draftCard.color}
                               onChange={this.handleChange.bind(this, 'color')} />

                        <div className='actions' >
                            <button type='submit'>{this.props.buttonLabel}</button>
                        </div>
                    </form>
                </div>
                <div className='overlay' onClick={this.handleClose.bind(this)}> </div>
            </div>
        );
    }
}

CardForm.propTyoes = {
    draftCard: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        color: PropTypes.string
    }).isRequired,
    buttonLabel: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default CardForm;
