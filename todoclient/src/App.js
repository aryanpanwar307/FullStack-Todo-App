import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const api_url = process.env.REACT_APP_API_URL
  
  const [todos, setTodos] = useState([])

  useEffect(() => {fetchTodos()},[]) //whenever we will refresh the page the fetchTodos function will be called.
  
  const fetchTodos = async () => {
    try{
      const response = await fetch(`${api_url}/getalltodos`);
      const data = await response.json()
      // console.log(data);

      setTodos(data.todos)
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const deleteTodos = async (id) => {
    try {
      const response = await fetch(`${api_url}/deletetodo/${id}`,{
        method: "DELETE"
      });
      const data = await response.json()
      console.log(data.message);
    }
    catch(error){
      console.log(error);
    }
  }

  const [newTodo , setNewTodo] = useState({title : "",description : ""})

  const createTodo = async (e)=> {
    if(newTodo.title === ""){
      alert("title is req")
    }
    e.preventDefault()
    try{
      const response = await fetch(`${api_url}/createtodo`,{
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(newTodo)
      })
      const data = await response.json();
      alert(data.message);
    }
    catch(error)
    {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <h1>Todo App</h1>
      {
        todos.map((todo) => {
          return(
            <div key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>
                {
                  todo.completed ? "completed" : "not completed"
                }
              </p>
              <button onClick = {()=> deleteTodos(todo._id)}>Delete</button>
              <br></br>
              <br></br>
              <br></br>
            </div>
           )
        })
      }
       <h1>create todo</h1>
              <form>
                <input type = "text" placeholder = "Title" 
                onChange={(e) => setNewTodo({...newTodo,title : e.target.value})}>
                </input>
                <br></br>
                <input type = "text" placeholder = "Description"
                onChange={(e) => setNewTodo({...newTodo,description : e.target.value})}>
                </input>
                <br></br>
                <button onClick = {createTodo}>Submit</button>
              </form>
    </div>
  );
}

export default App;
