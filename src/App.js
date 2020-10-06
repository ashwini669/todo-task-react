//import React from 'react';
import './App.css';
import React, {useState , useRef , useEffect} from 'react';
import ListItem from './Listitem.js';

function App() {
 
  const [taskList, setTaskList] = useState([]);
  const [current, setTask] = useState("");
  
  const inputRef=useRef(null);
  useEffect(()=>{
    inputRef.current.focus();
  });


  function handleChange(e){
    var val=e.target.value;
    if(val.value!=="")
    { 
      setTask(e.target.value);
    }
  }
  
  function addItem(e){

     e.preventDefault();
     const item={ task:current, key:Date.now()}
     setTaskList([...taskList, item]);
     
     inputRef.current.value=" ";
     addToStorage(item);

  }

  function addToStorage(item)
  {
    let tasks=localStorage.getItem("task_table");
     if(tasks==null)
     {
       var todo=[];
      }
     else{
          todo=JSON.parse(tasks);
         }
         
     todo.push({'Task':item.task,'Key':item.key});
     localStorage.setItem("task_table",JSON.stringify(todo));

  }

    function deleteItem(key)
    {
      const filteredItems= taskList.filter(item => item.Key!==key);
      setTaskList(filteredItems);
      deleteFromStorage(key);
    }

    function deleteFromStorage(key)
    {
      var m=[];
        m=getData();
      
        m= m.filter(function(m,index) {
            return m.Key!==key
          });
      
          localStorage.setItem('task_table',JSON.stringify(m));

    }

    function editItem(task,key)
    {

      var m=[];
      m=getData();      
      const updatedList= m.map(item =>{
        if(item.Key === key)
        {
          inputRef.current.value=task;
          window.$keyValue=key;
        }
      })
    }

    function handleUpdate(e)
    {
      e.preventDefault();
      var val=document.getElementById('demo').value;
      let keyVal=window.$keyValue;
      // console.log(val,keyVal);
      const editedItem={ task:val,key:keyVal};
      //setTaskList([...taskList, item]);
      // console.log(editedItem);
      inputRef.current.value=" ";
      
      var m=[];
      m= getData();
      //console.log(m);
      const updateList= m.map(item =>{
        if(item.Key ===editedItem.key)
        {
           item.Task=editedItem.task;
        }
      });

      localStorage.setItem("task_table",JSON.stringify(m));
      window.location.reload();
    }

    function getData()
    {
      var todo=[];
      if(localStorage.getItem('task_table')===null){
          todo=[];
      } else{
          todo= JSON.parse(localStorage.getItem('task_table'));
      
      }
      return todo;
    }
    
  return (
    <div className="App">
          <h2 id="todo-header">TODO LIST</h2>
          <form id="todo-form" autoComplete="off">
            <input type="text" onChange={handleChange} name="theTask" id="demo"
                   placeholder="Enter your task here" ref={inputRef}/><br></br>
            <button onClick={addItem} id="add">Add Task</button>
            <button onClick={handleUpdate} id="edit">Update Task</button>
           </form>
          <ListItem deleteItem={deleteItem}
                    editItem={editItem}/>
    </div>
  );
 
}

export default App;
