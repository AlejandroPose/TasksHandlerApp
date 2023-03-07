import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../features/tasks/taskSlice";

export const TasksList = () => {

    const dispatch = useDispatch();

    const tasks = useSelector( state => state.tasks );

    const handleDelete = (id) => {
        dispatch( deleteTask(id) );
    };

    return (
        <div>
            <header>
                <h1>Tasks: { tasks.length }</h1>
                <Link to='/create-task'>
                    Create Task
                </Link>
            </header>
            {
                tasks.map( task => (
                    <div key={ task.id }>
                        <h3>{ task.title }</h3>
                        <p>{ task.description }</p>
                        <button onClick={ () => handleDelete( task.id ) }>Delete</button>
                        <Link to={`/edit-task/${ task.id }`}>
                            Edit
                        </Link>
                    </div>
                ))
            }
        </div>
    );

};