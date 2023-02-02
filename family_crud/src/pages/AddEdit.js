import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  lname: "",
  quantity: "",
  members_name: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { lname, quantity, members_name } = state;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lname || !quantity || !members_name) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            lname,
            quantity,
            members_name,
          })
          .then(() => {
            setState({ lname: "", quantity: "", members_name: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Added Successfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            lname,
            quantity,
            members_name,
          })
          .then(() => {
            setState({ lname: "", quantity: "", members_name: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Contact Updated Successfully");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="lname">Lastname</label>
        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Your Lastname ..."
          value={lname || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Quantity inside the family ..."
          value={quantity || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="members_name">Members Name</label>
        <input
          type="text"
          id="members_name"
          name="members_name"
          placeholder="First name of familty members ..."
          value={members_name || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
