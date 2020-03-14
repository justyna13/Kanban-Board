import React from "react";
import PropTypes from 'prop-types';


class CheckList extends React.Component {

    checkInputKeyPressed(e) {
        if(e.key === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, e.target.value);
            e.target.value = '';
        }
    }

    render() {

        let tasks = this.props.tasks.map( (task, taskIndex) => (
            <li key={task.id} className={task.done ? "task task--done": "task"}>
                <input  type="checkbox"
                        checked={task.done}
                        onChange={this.props.taskCallbacks.toogle.bind(null, this.props.cardId, task.id, taskIndex)} />
                        {task.name}

                <button href="#" className="checklist__task__btn checklist__task__btn--remove"
                   onClick={this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}>
                <i className="fa fa-trash" />
                </button>

            </li>
        ));

        return (
            <div>
                <ul className="checklist">
                    <h4 className="card__details__label">Tasks:</h4>
                    {tasks}
                </ul>
                <input className="checklist__input--add-task"
                       placeholder="Add new task"
                       onKeyPress={this.checkInputKeyPressed.bind(this)} />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.arrayOf(PropTypes.object),
};

export default CheckList;
