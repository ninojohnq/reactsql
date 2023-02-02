import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        console.log(response);
        setData(response.data);
    
    }
  
    useEffect (() => {
        loadData();
    }, []);
    const deleteFamily = (id) => {
        if (
          window.confirm("Are you sure that you wanted to delete this?")
        ) {
          axios.delete(`http://localhost:5000/api/remove/${id}`);
          toast.success("Deleted Successfully");
          setTimeout(() => loadData(), 500);
        }
      };

  return (
    <div style={{marginTop: "150px"}}>
         <h1>Family CRUD</h1>
         <Link to="/addFamily">
         <button className="btn btn-family">Add Family</button>
         </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>ID</th>
                    <th style={{textAlign: "center"}}>Lastname</th>
                    <th style={{textAlign: "center"}}>Quantity</th>
                    <th style={{textAlign: "center"}}>Members Name</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.lname}</td>
                            <td>{item.quantity}</td>
                            <td>{item.members_name}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className="btn btn-edit">Edit</button>&nbsp;
                                </Link>
                                <button
                                className="btn btn-delete"
                                onClick={() => deleteFamily(item.id)}>
                                Delete
                                </button>&nbsp;&nbsp;
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-view">View</button>
                                </Link>
                            </td>
                        </tr>
                    );
            })}
            </tbody>
        </table>
    </div>
  );
};

export default Home;