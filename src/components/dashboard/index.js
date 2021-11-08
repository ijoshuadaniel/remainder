import React, { useState, useEffect } from 'react';
import useTodo from '../../hooks/todo';
import Error from '../error';
import './index.scss';

const Dashboard = ({ user }) => {
  const [isRemainder, setIsRemainder] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const { error, loading, todoData, addTodo, getTodo, deleteTodo } = useTodo();

  useEffect(() => {
    const getTodos = async () => {
      const data = {
        email: user.email,
        completed: 'false',
      };
      await getTodo(data);
    };
    getTodos();
  }, []);

  const handleAddNote = async () => {
    let remainder = isRemainder ? 'true' : 'false';
    const data = {
      title,
      description,
      isRemainder: remainder,
      date,
      time,
      email: user.email,
    };
    await addTodo(data);
    window.location.reload();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo({ id });
    window.location.reload();
  };

  const getTodoHtml = () => {
    if (!todoData) return <div>loading...</div>;
    if (todoData.todo.length <= 0) return <div>Add your first remainder</div>;
    return todoData.todo.map((todo, i) => {
      return (
        <div className='dashboard-body-allRemainder-todo-data' key={i}>
          <div className='dashboard-body-allRemainder-todo-data-flex'>
            <div>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
            </div>
            <div>
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </p>
            </div>
          </div>
          {todo.remainder === 'true' && (
            <p className='dashboard-body-allRemainder-todo-data-remainder'>
              Your remainder is set to {todo.date} at {todo.time}
            </p>
          )}
        </div>
      );
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <Error error={error} />
      <div className='dashboard'>
        <div className='dashboard-header'>
          <p>Your Remainder</p>
          <p onClick={logout} style={{ cursor: 'pointer' }}>
            Logout
          </p>
        </div>
        <div className='dashboard-body'>
          <div className='dashboard-body-addRemainder'>
            <div className='dashboard-body-addRemainder-no'>
              <div>
                <input
                  type='text'
                  value={title}
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <input
                  type='checkbox'
                  value={isRemainder}
                  onChange={(e) => setIsRemainder(e.target.checked)}
                />
                <span>Add Remainder</span>
              </div>
            </div>
            {isRemainder && (
              <div>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            )}
            <button onClick={handleAddNote}>Add Note</button>
          </div>
          <div className='dashboard-body-allRemainder'>
            {loading && <div>loading...</div>}
            {!loading && (
              <div className='dashboard-body-allRemainder-todo'>
                {getTodoHtml()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
