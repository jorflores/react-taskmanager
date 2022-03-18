import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import  "../App.css"

const AddTask = (props) => {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        setIsEditing(true);
        const task = await axios.get("http://localhost:4000/api/tasks/" + id);
        setTitle(task.data.title);
        setDescription(task.data.description);
      } else {
        setIsEditing(false);
        setTitle("");
        setDescription("");
      }
    };
    fetchData()

  }, [id]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const task = {
      id: id,
      title: title,
      description: description,
    };

    if (isEditing) {
      console.log(task);
      await axios.put("http://localhost:4000/api/editTask", task);
      props.onAddTask();
      return navigate("/");
      
    } else {
      console.log(task);
      await axios.post("http://localhost:4000/api/addTask", task);
      props.onAddTask();
      props.onShowAlert()
    }

    setTitle("");
    setDescription("");
  };





  return (
    <div
      className={
        props.AddOrChange === "Add" ? "col-md-5" : "col-md-3 offset-md-3"
      }
    >
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <div className="form-group mb-2">
              <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                cols="80"
                placeholder="Add a Description"
                value={description}
                onChange={onDescriptionChangeHandler}
              ></textarea>
            </div>
            <button className="btn btn-primary mt-1" type="submit">
              {!isEditing ? "Add" : "Edit"}
            </button>
          </form>
        </div>

      </div>


    </div>
    
  );
};

export default AddTask;
