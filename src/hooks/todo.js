import { useState } from 'react';
import axios from 'axios';

const useTodo = () => {
  const [error, setError] = useState({ error: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [todoData, setTodoData] = useState(null);

  const addTodoUrl = 'http://localhost:150/add';
  const getTodoUrl = 'http://localhost:150/get';
  const deleteTodoUrl = 'http://localhost:150/delete';

  const addTodo = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(addTodoUrl, {
        body: data,
      });
      setLoading(false);
      if (response.data.error) {
        setError(response.data);
      }
      return response.data;
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  const getTodo = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(getTodoUrl, {
        body: data,
      });
      setLoading(false);
      if (response.data.error) {
        setError(response.data);
      }
      setTodoData(response.data);
      return response.data;
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  const deleteTodo = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(deleteTodoUrl, {
        body: data,
      });
      setLoading(false);
      if (response.data.error) {
        setError(response.data);
      }
      return response.data;
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  return {
    error,
    loading,
    todoData,
    addTodo,
    getTodo,
    deleteTodo,
  };
};

export default useTodo;
