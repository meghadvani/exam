const UserTable = ({ users, Edit, Delete }) => {

  // const handleEdit = (user) => {
  //   onEdit(user);
  //   }
  //   const handleDelete = (user) => {
  //     onDelete(user);
  //     }

    return (
      <table className="user-table" style={{border:'15px'}}>
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.image}
                  alt={user.name}
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%' }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => Edit(user)} style={{color:'white',backgroundColor:'green'}}>Edit</button>
                <button onClick={() => Delete(user.id)} style={{color:'white', backgroundColor:'red'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserTable;
  