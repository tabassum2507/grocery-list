import React, { useState, useEffect } from "react"
import Alert from "./Alert";
import List from "./List";


const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list){
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const[name, setName] = useState('');
  const[list, setList] = useState(getLocalStorage);
  const[isEditing, setIsEditing] = useState(false);
  const[editID, setEditID] = useState(null);
  const[alert, setAlert] = useState({show: true, msg:'Add your grocery items', type: 'success'})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, 'danger', 'Please enter item')
    }else if(name && isEditing){
      setList(list.map((item) => {
        if(item.id === editID) {
          return { ...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Item updated')
    }else {
      showAlert(true, 'success', 'item added to list')
      const newItem = { id: new Date().getTime().toString(), title:name};
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show=false, type="", msg="")=> {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Removed Item');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true);
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <div className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery List</h3>
        <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g Rice" value={name} onChange={(e)=> setName(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing ? 'Edit' : 'Submit'}
        </button>
        </div>
      </form>


      { list.length > 0 && (
               <div className="grocery-container">
               <List items={list} removeItem={removeItem} editItem={editItem}/>
               <button className="clear-btn" onClick={clearList}>Clear Items</button>
             </div>
      )}
      
    </div>
  );
}

export default App;
