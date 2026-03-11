import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API = "https://full-stack-todo-xe93.onrender.com";

function App() {

const [isRegistering, setIsRegistering] = useState(false);
const [name, setName] = useState("");

const [todos, setTodos] = useState([]);
const [input, setInput] = useState("");

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(
!!localStorage.getItem("token")
);

const getHeaders = () => ({
headers: {
Authorization: localStorage.getItem("token")
}
});

const registerUser = async () => {
try {


  await axios.post(`${API}/auth/register`, {
    name: name.trim(),
    email: email.trim(),
    password: password.trim()
  });

  alert("Account created! Please login.");

  setIsRegistering(false);
  setName("");
  setEmail("");
  setPassword("");

} catch (err) {

  console.log(err);
  alert("Registration failed");

}

};

const loginUser = async () => {
try {

  const res = await axios.post(`${API}/auth/login`, {
    email: email.trim(),
    password: password.trim()
  });

  localStorage.setItem("token", res.data.token);
  setIsLoggedIn(true);

} catch (err) {

  alert("Invalid credentials");

}

};

const fetchTodos = async () => {
try {

  const res = await axios.get(`${API}/todos`, getHeaders());
  setTodos(res.data);

} catch (err) {

  console.log(err);

}

};

useEffect(() => {


if (isLoggedIn) {
  fetchTodos();
}


}, [isLoggedIn]);

const addTodo = async () => {


if (!input.trim()) return;

const res = await axios.post(
  `${API}/todos`,
  { text: input.trim() },
  getHeaders()
);

setTodos((prev) => [...prev, res.data]);
setInput("");

};

const deleteTodo = async (id) => {

await axios.delete(`${API}/todos/${id}`, getHeaders());

setTodos((prev) => prev.filter((todo) => todo._id !== id));

};

const toggleTodo = async (id) => {

const res = await axios.put(
  `${API}/todos/${id}`,
  {},
  getHeaders()
);

setTodos((prev) =>
  prev.map((todo) =>
    todo._id === id ? res.data : todo
  )
);

};

const logout = () => {
localStorage.removeItem("token");
setIsLoggedIn(false);
};

if (!isLoggedIn) {

return (
  <div className="app">
    <div className="container login-con">

      <h1>{isRegistering ? "Register" : "Login"}</h1>

      {isRegistering && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={isRegistering ? registerUser : loginUser}>
        {isRegistering ? "Register" : "Login"}
      </button>

      <p style={{ marginTop: "10px" }}>
        {isRegistering
          ? "Already have an account?"
          : "Don't have an account?"}
      </p>

      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Go to Login" : "Register"}
      </button>

    </div>
  </div>
);

}

return ( <div className="app">

  <div className="container">

    <button onClick={logout}>
      Logout
    </button>

    <h1>ToDo App</h1>

    <div className="input-field">

      <input
        type="text"
        value={input}
        placeholder="Add a task..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />

      <button onClick={addTodo}>
        Add
      </button>

    </div>

    <ul>

      {todos.map((todo) => (

        <li key={todo._id}>

          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
          />

          <span className={todo.completed ? "completed" : ""}>
            {todo.text}
          </span>

          <button onClick={() => deleteTodo(todo._id)}>
            Delete
          </button>

        </li>

      ))}

    </ul>

  </div>

</div>

);
}

export default App;
