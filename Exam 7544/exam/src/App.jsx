import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    const activeUsers = res.data.filter(user => user.status);
    setUsers(activeUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const saveUser = async (user) => {
    if (user.id) {
      await axios.put(`http://localhost:5000/users/${user.id}`, user);
    } else {
      await axios.post(`http://localhost:5000/users`, { ...user, status: true });
    }
    setEditingUser(null);
    fetchUsers();
  };



  const deleteUser = async (id) => {
    await axios.patch(`http://localhost:5000/users/${id}`, { status: false });
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>CRUD OPERATIONS</h1>
      <UserForm Save={saveUser} Edit={editingUser} />
      <UserTable users={users} Edit={setEditingUser} Delete={deleteUser} />
    </div>
  );
}

export default App;
