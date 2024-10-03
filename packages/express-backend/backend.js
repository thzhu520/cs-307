// backend.js
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Helper Functions
//commented out for assignment 3
//const findUserByName = (name) => {
  //return users["users_list"].filter((user) => user["name"] === name);
//};

//const findUserByNameAndJob = (name, job) => {
  //return users["users_list"].filter(
    //(user) => user["name"] === name && user["job"] === job
  //);
//};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  const id = Math.random().toString(36).substr(2, 9); // Generate random ID
  const userWithId = { ...user, id };
  users["users_list"].push(userWithId);
  return userWithId;
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true;
  } else {
    return false;
  }
};

// Routes
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Missing 'name' or 'job' in request body");
  }
  const id = Math.random().toString(36).substr(2, 9); // Generate random ID
  const createdUser = { ...userToAdd, id }; // Add ID to the user object
  users["users_list"].push(createdUser);
  res.status(201).json({ message: "User created", user: createdUser }); // Respond with the new user
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  // Ensure that user data has both `name` and `job`
  if (!userToAdd.name || !userToAdd.job) {
    return res.status(400).send("Missing 'name' or 'job' in request body");
  }

  // Add user to the list
  const createdUser = addUser(userToAdd);

  // Respond with the newly created user and 201 status
  res.status(201).json({ message: "User created", user: createdUser });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const success = deleteUserById(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

