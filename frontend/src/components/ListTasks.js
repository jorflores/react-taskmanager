import React,{useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import  "../App.css"

const ListTasks = (props) => {

 


  const DeleteTask = async (id) => {
    console.log(id);
    await axios.delete("http://localhost:4000/api/delete/" + id);
    props.onDeleteTask();
  };

  const ChangeStatus = async (id) => {
    console.log(id);
    await axios.put("http://localhost:4000/api/change_status/" + id);
    props.onDeleteTask();
  };




  return (
    <div className="col-md-7">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1} </td>
              <td>
                <strong>{task.title}</strong>
              </td>
              <td>{task.description}</td>
              <td>
                <Link
                  className={task.status ? "btn btn-success" : "btn btn-dark"}
                  to="#"
                  onClick={() => ChangeStatus(task._id)}
                >
                  Done
                </Link>

                <Link
                  className="btn btn-danger ms-1"
                  to="#"
                  onClick={() => DeleteTask(task._id)}
                >
                  Delete
                </Link>
                <Link className="btn btn-info ms-1" to={"/edit/" + task._id}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         

      

    </div>
  );
};

export default ListTasks;
