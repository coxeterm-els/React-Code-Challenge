import { useState, useEffect } from 'react';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('');
  const [hideTodos, setHideTodos] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTimeout(() => setTodos(data), 5000));
  }, []);

  var renderUsers = () => {
    return users
      .filter((u) => u.name.includes(filter))
      .map((user) => (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button
            onClick={(e) => {
              const newTodos = { ...hideTodos };
              newTodos[user.id] = !newTodos[user.id];
              setHideTodos(newTodos);
            }}
          >
            Toggle Todo
          </button>
          {!hideTodos[user.id] ? (
            <>
              <p>Todos: </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Todos
                  .filter((todo) => todo.userId === user.id)
                  .map((todo) => (
                    <div
                      style={{
                        background: todo.completed ? 'green' : 'red',
                        color: 'white',
                      }}
                    >
                      {todo.title}
                    </div>
                  ))}
              </div>
            </>
          ) : null}
        </div>
      ));
  };

  return (
    <div>
      <h2>User List</h2>
      <div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {renderUsers()}
      <h2>Summary</h2>
      <div>{users.length + ': Users shown.'}</div>
    </div>
  );
};
