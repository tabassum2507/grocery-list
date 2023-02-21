import React, { useState, useEffect } from "react"
import Alert from "./Alert";
import List from "./List";

function App() {
  const[name, setName] = useState(' ');
  const[list, setList] = useState([]);
  const[isEditing, setIsEditing] = useState(false);
  const[editID, setEditID] = useState(null);
  const[alert, setAlert] = useState({show: false, msg:'', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){

    }else if(name && isEditing){

    }else {
      const newItem = { id: new Date().getTime().toString(), title:name};
      setList([...list, newItem])
      setName('')
    }
  }


  return (
    <div className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert />}
        <h3>Grocery List</h3>
        <input type="text" className="grocery" placeholder="e.g Rice" value={name} onChange={(e)=> setName(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing ? 'Edit' : 'Submit'}
        </button>
      </form>


      { list.length > 0 && (
               <div className="grocery-container">
               <List items={list}/>
               <button className="clear-btn">Clear Items</button>
             </div>
      )}
      
    </div>
  );
}

export default App;
