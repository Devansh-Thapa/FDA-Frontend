import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { createDonationRequest } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import States from "./helper/states";
import "../style/form.css";

const AddDonationRequest = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    loading: false,
    error: "",
    createdDonationRequest: "",
    getRedirect: "",
  });

  const {
    name,
    description,
    category,
    contactNumber,
    address,
    city,
    state,
    loading,
    error,
    createdDonationRequest,
    getRedirect,
  } = values;

  const preLoad = () => {
    setValues({ ...values });
    // console.log("Cate:", categories);
  };

  useEffect(() => {
    preLoad();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(values);
    createDonationRequest(user._id, token, values)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            category: "",
            contactNumber: "",
            address: "",
            city: "",
            state: "",
            loading: false,
            createdDonationRequest: data.name,
            getRedirect: true,
          });
        }
      })
      .catch();
  };

  const addcitites = (state) => {
    const selector = document.getElementById("city");
    var option = document.createElement("option");
    option.text = "Select";
    selector.add(option);
    States[state].map((city, index) => {
      var option = document.createElement("option");
      option.text = city;
      option.value = city;
      selector.add(option);
    });
  };

  const removecities = () => {
    for (var o of document.querySelectorAll("#city > option")) {
      o.remove();
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    if (name === "state") {
      removecities();
      addcitites(value);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdDonationRequest ? "" : "none" }}
      >
        <h4>{createdDonationRequest} created successfully</h4>
      </div>
    );
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      if (getRedirect) {
        return <Redirect to="/" />;
      }
    } else {
      return <Redirect to="/signin" />;
    }
  };

  const createDonationRequestForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="name" className="mt-2 form-label">
          Request name
        </label>
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Description">Description</label>
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="Category">Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non Vegetarian">Non Vegetarian</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Contact Number">Contact Number</label>
        <input
          onChange={handleChange("contactNumber")}
          type="number"
          className="form-control"
          placeholder="Contact Number"
          value={contactNumber}
        />
      </div>
      <div className="form-group">
        <label htmlFor="State">State</label>
        <select
          onChange={handleChange("state")}
          className="form-control"
          placeholder="State"
        >
          <option>Select</option>
          {Object.keys(States).map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="City">City</label>
        <select
          onChange={handleChange("city")}
          id="city"
          className="form-control"
          placeholder="city"
        >
          <option>Select</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Address">Address</label>
        <textarea
          onChange={handleChange("address")}
          name="address"
          className="form-control"
          placeholder="Address"
          value={address}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-success mb-3">
        Create Donation Request
      </button>
    </form>
  );

  return (
    <Base className="container rounded pt-2 mt-5">
      <div className="list-inline d-flex justify-content-center">
        <Link
          to="/admin/dashboard"
          className="btn btn-md btn-dark mb-3 mt-2 list-inline-item"
        >
          Dashboard
        </Link>
        <h1 className="list-inline-item text-white mx-auto pt-1 pr-5">
          Add Donation Request
        </h1>
      </div>
      <div className="row text-white rounded mb-4 pt-4 form-body">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createDonationRequestForm()}
          {performRedirect()}
          {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </div>
      </div>
    </Base>
  );
};

export default AddDonationRequest;
