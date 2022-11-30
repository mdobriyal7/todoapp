import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inpdata, setinpdata] = useState("");
  const [todoData, settodoData] = useState([]);
  const [itemIndex, setitemIndex]= useState(null);

  const onChangeHandler = (e) => {
    setinpdata(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    
    if (itemIndex!==null) {
      const getitem = todoData.find((el, i) => { return i === itemIndex; });
      const updatedtodoData = todoData.map((el, i) =>  el=== getitem ? (el = inpdata) : (el));
      settodoData(updatedtodoData);
      setinpdata("")
      setitemIndex(null);
    }
    else {
      const newdata = inpdata;
    settodoData([...todoData, newdata]);
    setinpdata("");
    console.log(todoData);
    }
  };
  const deleteItem = (index) => {
    const newarr = todoData.filter((el, ind) => { return ind != index; })
    settodoData(newarr);
  }

  const editItem = (index) => {
    const editedarr = todoData.find((el, i) => { return i === index; })
    setinpdata(editedarr);
    setitemIndex(index);
    }
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List app</h1>
        <form onSubmit={submitHandler} className="form">
          <input type="text" value={inpdata} onChange={onChangeHandler} />
          <button type="submit">{itemIndex!==null? "Edit":"Submit" }</button>
        </form>

        {todoData.map((value, index) => {
          return (
            <div className="alltasks" key={index} id={index} >
              <div className="item">
                <div>{value}</div>
                <div><button onClick={() => { editItem(index) }}>Edit</button> <button onClick={() => { deleteItem(index) }} >Delete </button></div>
              </div>
            </div>
        )})}
      </div>
    </div>
  );
};

export default App;
