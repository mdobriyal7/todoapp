import React, { useState } from "react";
import uuid from "react-uuid";
import { TiTickOutline } from "react-icons/ti";
import { RxDotFilled } from "react-icons/rx";
import { RiFileEditFill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./App.css";

const App = () => {
  const [inpdata, setinpdata] = useState({
    task: "",
    date: "",
    status: false,
    id: uuid(),
  });
  const [todoData, settodoData] = useState([]);
  const [itemIndex, setitemIndex] = useState(null);
  const [filteritem, setfilteritem] = useState([]);
  const [managearr, setmanagearr] = useState(true);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setinpdata((prev) => {
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });

    console.log(inpdata);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (itemIndex !== null) {
      const getitem = todoData.find((el) => {
        return el.id === itemIndex;
      });
      const updatedtodoData = todoData.map((el, i) =>
        el.id === getitem.id ? (el = inpdata) : el
      );
      settodoData(updatedtodoData);
      setinpdata((prev) => {
        return { ...prev, task: "" };
      });
      setitemIndex(null);
    } else {
      const newdata = inpdata;
      settodoData([...todoData, newdata]);
      setinpdata((prev) => {
        return { ...prev, task: "", date: "", id: uuid() };
      });
    }
  };
  const deleteItem = (id) => {
    const newarr = todoData.filter((el) => {
      return el.id !== id;
    });
    settodoData(newarr);
  };

  const editItem = (itemid) => {
    const editedarr = todoData.find((el) => {
      return el.id === itemid;
    });
    setinpdata(editedarr);
    setitemIndex(itemid);
  };

  const toggleStatus = (itemid) => {
    const finditem = todoData.find((el) => {
      return el.id === itemid;
    });

    const updatestatus = todoData.map((el) =>
      el.id === itemid ? { ...el, status: !finditem.status } : el
    );
    settodoData(updatestatus);
  };

  return (
    <div>
      <div className="contain text-center">
        <h1 style={{ width: "100%" }} className="text-center">
          Todo List app
        </h1>
      
          <form onSubmit={submitHandler} className="form text-center row justify-content-center">
            <input
              type="text"
              value={inpdata.task}
              name="task"
              onChange={onChangeHandler}
              placeholder="Enter Task here"
              className=" col-10 col-sm-10 col-xs-10 col-xl-4 m-3"
            />
            <input
              type="date"
              name="date"
              value={inpdata.date}
              onChange={onChangeHandler}
              placeholder="Set Task Deadline"
              className=" col-10 col-xl-4 m-3"
            />

            <button type="submit"
              className="btn btn-outline-primary col-xl-1 col-4 col-sm-2 m-3 "
            >
              {itemIndex !== null ? "Edit" : "Submit"}
            </button>
          </form>
      
        <div className="d-flex flex-row align-items-center justify-content-center col-xl-4 col-10 ">
          <label for="choose" className="m-3">
            Filter by:
          </label>
          <select
            className="form-select"
            style={{ width: "20rem" }}
            id="choose"
            aria-label="Default select example"
            onChange={(e) => {
              const selecteditem = e.target.value;
              if (selecteditem === "2") {
                setmanagearr(false);
                const filtercompleted = todoData.filter((el) => {
                  return el.status === true;
                });
                setfilteritem(filtercompleted);
              } else if (selecteditem === "3") {
                setmanagearr(false);
                const filternotcompleted = todoData.filter((el) => {
                  return el.status === false;
                });
                setfilteritem(filternotcompleted);
              } else {
                setmanagearr(true);
              }
            }}
          >
            <option value="1">All Task</option>
            <option value="2">Task Completed</option>
            <option value="3">Task not Completed</option>
          </select>
        </div>
        <p className="mx-3" style={{ fontSize: "12px", display: "inline", paddingTop: "20px" }}>
          Note : You can toggle the status of the task by clicking over it in
          the task card.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent:"center"
        }}
      >
        {(managearr === true ? todoData : filteritem).map((value) => {
          return (
            <div
              className="card m-4 "
              key={value.id}
              id={value.id}
              style={{ width: "20rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">Task: {value.task}</h5>
                <h6 className="card-subtitle mb-2 text-muted pt-2">
                  Task Deadline: {value.date}
                </h6>
                <div className="row align-items-center ">
                  <div
                    onClick={() => toggleStatus(value.id)}
                    className="d-inline col-8"
                  >
                    {value.status === true ? (
                      <h6
                        style={{ color: "green", display: "inline" }}
                        className="col-8"
                      >
                        <TiTickOutline /> Completed{" "}
                      </h6>
                    ) : (
                      <h6
                        style={{
                          color: "rgb(247, 107, 14)",
                          display: "inline",
                        }}
                        className="col-8"
                      >
                        <RxDotFilled /> Not Completed Yet
                      </h6>
                    )}
                  </div>
                  <span
                    className="edit col-2"
                    // style={{marginLeft:"45px", marginRight:"20px",paddingRight:"5px"}}
                    onClick={() => {
                      editItem(value.id);
                    }}
                  >
                    <RiFileEditFill />
                  </span>
                  <span
                    className="delete col-2"
                    onClick={() => {
                      deleteItem(value.id);
                    }}
                  >
                    <RiDeleteBin5Fill />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
