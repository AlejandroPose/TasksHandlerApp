import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector( state => state.tasks );

    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( params.id ) {
            dispatch( updateTask( task ) );
        } else {
            dispatch( addTask({
                ...task,
                id: uuid(),
            }) );
        }
        navigate('/');
    }; 

    useEffect(() => {
      if ( params.id ) {
        setTask( tasks.find( task => task.id === params.id ) );
      }
    }, [])
    

    return (
        <div>
            <Link to='/'>
                Back to TasksList
            </Link>
            <form onSubmit={ handleSubmit }>
                <input type="text" name="title" placeholder="title" onChange={ handleChange } value={ task.title } />
                <textarea name="description" placeholder="description" onChange={ handleChange } value={ task.description } ></textarea>
                <button>Save</button>
            </form>
        </div>
    );

};