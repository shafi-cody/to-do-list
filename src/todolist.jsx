
import React, {useState} from "react";

function ToDoList(){
    const [tasks,setTasks] = useState([
        "Eat Breakfast",
        "Take a shower",
        "wake up early"
    ]);

    const [newTask,setNewtasks] = useState("");
    const [editIndex,setEditIndex] = useState(null);
    const [editText,setEditText] = useState("");
    const [completedTasks,setCompletedTasks] = useState([]);

    function handleInputchange(event){
        setNewtasks(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t,newTask.trim()]);
            setNewtasks("");
        }
    }

    function deleteTask(index){
        const updatedTask = tasks.filter((_,i) => i !== index);
        setTasks(updatedTask);

        setCompletedTasks(prev =>
            prev.filter(i => i !== index).map(i => i > index ? i - 1 : i)
        );

        if(editIndex === index){
            setEditIndex(null);
            setEditText("");
        }
        else if(editIndex !== null && editIndex > index){
            setEditIndex(editIndex - 1);
        }
    }

    function editTask(index){
        setEditIndex(index);
        setEditText(tasks[index]);
    }

    function saveTask(index){
        if(editText.trim() !== ""){
            const updatedTask = [...tasks];
            updatedTask[index] = editText.trim();
            setTasks(updatedTask);
            setEditIndex(null);
            setEditText("");
        }
    }

    function toggleComplete(index){
        setCompletedTasks(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev,index]
        );
    }

    return(
        <div className="to-do-list">
<h1>To-Do-List</h1>
<div>
    <input
        type="text"
        placeholder="Enter a task..."
         value={newTask}
          onChange={handleInputchange}
             />

 <button className="add-button" 
 onClick={addTask}>
     Add
    </button>
</div>

 <ol>
  {tasks.map((task,index) => (
    <li key={index}>
     <input
        type="checkbox"
        checked={completedTasks.includes(index)}
        onChange={() => toggleComplete(index)}
        />

        {editIndex === index ? (
         <>
         <input
        type="text"
        value={editText}
      onChange={e => setEditText(e.target.value)}
        />

    <button className="save-button" onClick={() => saveTask(index)}>
        Save
    </button>

    <button className="cancel-button" onClick={() => {
      setEditIndex(null);
      setEditText("");
    }}>
    Cancel
    </button>
    </>
     ) : (
     <>
     <span
      className="text"
        style={{
                textDecoration: completedTasks.includes(index) ? "line-through" : "none"
             }}>
                                
        {task}
</span>

<button className="edit-button" onClick={() => editTask(index)}>
    Edit
    </button>

 <button className="delete-button" onClick={() => deleteTask(index)}>
     Delete
     </button>
      </>
    )}
     </li>
      ))}
    </ol>
    </div>
    );
}

export default ToDoList;
