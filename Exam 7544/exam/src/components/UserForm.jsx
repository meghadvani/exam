import { useState } from "react";
import { useEffect } from "react";

const UserForm = ({ Save, Edit }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    if (Edit) {
      setUser(Edit);
    }
  }, [Edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, image: reader.result }); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.name.trim().length < 3) return alert("Name should be atleast 3 characters.");
    if (!user.email.includes("@")) return alert("Enter valid email id.");
    if (!user.image) return alert("Please Upload an Image.");

    Save(user);
    if (!user.id) {
      setUser({ name: '', email: '', image: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="image" value={user.image} onChange={handleChange} placeholder="Image URL Like(https://...)" />
      {user.image && (
        <img
          src={user.image}
          alt="Preview"
          width="60"
          height="60"
          style={{ borderRadius: '50%', marginTop: '10px' }}
        />
      )}
      <button type="submit">{user.id ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
