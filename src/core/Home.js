import React, { useState, useEffect } from "react";
import "../style/home.css";
import { Redirect } from "react-router-dom";
import Base from "./Base";
import Card from "./Card";
import { getDonationBags, getDonationRequests } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper";
import States from "../admin/helper/states";

const Home = () => {
  const [donationBags, setDonationBags] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [donationValues, setDonationValues] = useState({
    donationCategory: undefined,
    donationState: undefined,
    donationCity: undefined,
  });
  const [requestValues, setRequestValues] = useState({
    requestCategory: undefined,
    requestState: undefined,
    requestCity: undefined,
  });
  const [error, setError] = useState(false);
  const [showDonation, setShowDonation] = useState(true);
  const [showDonationFilter, setDonationFilter] = useState(false);
  const [showRequestFilter, setRequestFilter] = useState(false);
  const { user, token } = isAuthenticated();

  var { donationCategory, donationState, donationCity } = donationValues;

  var { requestCategory, requestState, requestCity } = requestValues;

  const showDonationBag = () => {
    setShowDonation(true);
    setRequestFilter(false);
  };

  const showDonationRequest = () => {
    setShowDonation(false);
    setDonationFilter(false);
  };

  const donationFilter = () => {
    setDonationFilter(!showDonationFilter);
  };

  const requestFilter = () => {
    setRequestFilter(!showRequestFilter);
  };

  const removeDonationFilter = () => {
    setDonationValues({
      ...donationValues,
      donationCategory: undefined,
      donationState: undefined,
      doantionCity: undefined,
    });
    donationCategory = undefined;
    donationState = undefined;
    donationCity = undefined;
    document.getElementById("donationCategory").selectedIndex = 0;
    document.getElementById("donationState").selectedIndex = 0;
    document.getElementById("doantionCity").selectedIndex = 0;
    showDonationFilter();
    loadAllDonations();
  };

  const removeRequestFilter = () => {
    setRequestValues({
      ...requestValues,
      requestCategory: undefined,
      requestState: undefined,
      requestCity: undefined,
    });
    requestCategory = undefined;
    requestState = undefined;
    requestCity = undefined;
    document.getElementById("requestCategory").selectedIndex = 0;
    document.getElementById("requestState").selectedIndex = 0;
    document.getElementById("requestCity").selectedIndex = 0;
    showRequestFilter();
    loadAllDonations();
  };

  const addcitites = (state, type) => {
    const selector = document.getElementById(type + "City");
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

  const removecities = (type) => {
    for (var o of document.querySelectorAll(`#` + type + `city > option`)) {
      o.remove();
    }
  };

  const handleChange = (name, type) => (event) => {
    const value = event.target.value;
    if (type === "donation") {
      setDonationValues({ ...donationValues, [name]: value });
    } else {
      setRequestValues({ ...requestValues, [name]: value });
    }
    if (name === type + "State") {
      removecities(type);
      if (event.target.value !== "undefined") addcitites(value, type);
    }
  };

  const filterForm = (type) => (
    <div
      // className="bg-secondary px-3 py-3 mb-3 border"
      className="px-3 py-3 mb-3 border filter-form"
      style={
        showDonationFilter || showRequestFilter
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <form className="form-inline d-flex justify-content-between mx-4">
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <select
            onChange={handleChange(type + "Category", type)}
            className="custom-select"
            id={type + "Category"}
            placeholder="Category"
          >
            <option value="undefined">Select Category</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non Vegetarian">Non Vegetarian</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="State">State</label>
          <select
            onChange={handleChange(type + "State", type)}
            className="custom-select"
            id={type + "State"}
            placeholder="State"
          >
            <option value="undefined">Select State</option>
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
            onChange={handleChange(type + "City", type)}
            id={type + "City"}
            className="custom-select"
            placeholder="city"
          >
            <option value="undefined">Select City</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={loadAllDonations}
          className="btn btn-success mt-4"
        >
          Filter
        </button>
        <button
          type="submit"
          onClick={
            type === "doantion" ? removeDonationFilter : removeRequestFilter
          }
          className="btn btn-danger mt-4"
        >
          Clear
        </button>
      </form>
    </div>
  );

  const loadAllDonations = () => {
    // console.log("loading all donations with filter", category, state, city);
    getDonationBags(
      user._id,
      token,
      donationCategory,
      donationState,
      donationCity
    ).then((data) => {
      // console.log("donations", data);
      if (data.error) {
        setError(data.error);
      } else {
        setDonationBags(data);
      }
    });
    getDonationRequests(
      user._id,
      token,
      requestCategory,
      requestState,
      requestCity
    ).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setDonationRequests(data);
      }
    });
    setDonationValues({ ...donationValues });
    setRequestValues({ ...requestValues });
  };

  useEffect(() => {
    loadAllDonations();
  }, []);

  return (
    <Base>
      <div className="row mb-2 container-lg">
        <div
          className={`btn ${showDonation ? "bg-active" : "bg-inactive"} col-6 `}
          onClick={showDonationBag}
        >
          <h1 className="text-center">Donation Bags</h1>
        </div>
        <div
          className={`btn ${!showDonation ? "bg-active" : "bg-inactive"} col-6`}
          onClick={showDonationRequest}
        >
          <h1 className="text-center">Donation Requests</h1>
        </div>
      </div>
      <div id="content">
        <div
          id="donationBag"
          name="donationBag"
          style={showDonation ? { display: "block" } : { display: "none" }}
        >
          <div>
            <div className="d-flex mb-3">
              <h5 className="align-self-center mt-3 mb-3">
                Found {donationBags.length} donation bags
              </h5>
              <button className="ml-auto filter-btn" onClick={donationFilter}>
                <i class="fas fa-filter"></i>
              </button>
            </div>
            {filterForm("donation")}
          </div>

          <div className="row">
            {donationBags.map((donation, index) => {
              console.log(donation);
              return (
                <div key={index} className="col-6 mb-2">
                  <Card donation={donation} text="Donation" />
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="donationRequest"
          name="donationRequest"
          style={!showDonation ? { display: "block" } : { display: "none" }}
        >
          <div>
            <div className="d-flex mb-3">
              <h5 className="align-self-center mt-3 mb-3">
                Found {donationRequests.length} donation requests
              </h5>
              <button
                className="btn ml-auto filter-btn"
                onClick={requestFilter}
              >
                <i class="fas fa-filter"></i>
              </button>
            </div>
            {filterForm("request")}
          </div>

          <div className="row">
            {donationRequests.map((donation, index) => {
              return (
                <div key={index} className="col-6 mb-2">
                  <Card donation={donation} text="Request" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
