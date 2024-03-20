import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  //render data from MongoDB
  useEffect(() => {
    axios.get("http://localhost:8001/users/")
      .then(res => { 
        setUsers(res.data);
        setIsLoading(false);
      });
  }, []);

  console.log(users);

  //handle POST request
  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    axios.post("http://localhost:8001/users/", {
      name: name,
      age: age,
    }).then(res => {
      axios.get("http://localhost:8001/users/")
      .then(res => { 
        setUsers(res.data);
      });
    });
  }

  //handle DELETE request
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8001/users/${id}`)
      .then(res => {
        axios.get("http://localhost:8001/users/")
        .then(res => { 
          setUsers(res.data);
        });
      });
  }

  //handle PUT request
  const handleUpdate = (id) => {
    axios.put(`http://localhost:8001/users/${id}`, {
      name: document.getElementById("updatedName").value,
      age: document.getElementById("updatedAge").value,
    }).then(res => {
        axios.get("http://localhost:8001/users/")
        .then(res => { 
          setUsers(res.data);
        });
    });
  }


  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}>
      <section>
        <h1>Users</h1>
        {!isLoading && 
          users.map(user => {
            return(
              <div key={user._id} style={{display: "flex"}}>
                <h2>Name: { user.name}, age: { user.age }</h2>
                <button onClick={() => {handleDelete(user._id)}}>Delete</button>
                <button onClick={() => {handleUpdate(user._id)}}>Update</button>
              </div>
            )
          })
        }
      </section>
      <section>
        <h1>Create a user</h1>
        <form>
          <label>
            Name
            <input type="text" id="name"/>
          </label>
          <label>
            Age
            <input type="number" id="age"/>
          </label>
          <button onClick={handleCreateUser}>Create</button>
        </form>
        <br />
        <h1>Update a user</h1>
        <form>
          <label>
            New name
            <input type="text" id="updatedName"/>
          </label>
          <label>
            New age
            <input type="number" id="updatedAge"/>
          </label>
        </form>
      </section>
    </div>
  )
}

export default App;
