import React from "react";
import PropTypes from 'prop-types';
import CardForm from "../Card/CardForm";

class Title extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changeTitle: false,
            userTitle: this.props.title,
        }
    }

    showTitleInput() {
        this.setState({changeTitle: !this.state.changeTitle});
        console.log(this.state.changeTitle);
    }

    handleChange(e) {
        this.setState({userTitle: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.changeTitle(this.state.userTitle);
        this.setState({changeTitle: !this.state.changeTitle});
    }

    render() {
        return (

            <div className="board__title">
                {this.state.changeTitle ?
                    <div className="title__header">
                        <input
                            className="title__input"
                            placeholder="enter new title"
                            onChange={this.handleChange.bind(this)}/>
                        <i className="fa fa-check" onClick={this.handleSubmit.bind(this)}> </i>

                    </div>
                    :
                    <div className="title__header">
                        <p className="title">
                            {this.props.title}</p>
                        <i className="fa fa-edit"
                           onClick={this.showTitleInput.bind(this)}> </i>
                    </div>
                    }
           </div>

        )
    }
}

Title.defaultProps = {
    title: 'Kanban Board',
};

Title.propTypes = {
    title: PropTypes.string,
    changeTitle: PropTypes.func,
};

export default Title;
