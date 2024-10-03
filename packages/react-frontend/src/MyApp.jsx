// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function deleteUserById(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }

  function removeOneCharacter(index) {
    const characterToDelete = characters[index];
    deleteUserById(characterToDelete.id)
      .then(response => {
        if (response.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        }
      })
      .catch(error => console.log("Error deleting user:", error));
  }

  function updateList(person) {
    postUser(person)
      .then(response => {
        // Ensure the response is OK (status 201)
        if (response.status === 201) {
          return response.json(); // Parse the JSON from the response
        } else {
          throw new Error("Failed to add user");
        }
      })
      .then(data => {
        // Update the local state with the new user (including the ID)
        setCharacters([...characters, data.user]); 
      })
      .catch(error => console.log("Error adding user:", error));
  }
  
  

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
      
    </div>
  );
  
}
export default MyApp;
