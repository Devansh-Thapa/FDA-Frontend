import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getDonationBags, getDonationRequests } from "./helper/coreapicalls";
import { isAuthenticated } from "../auth/helper";

const Home = () => {
  const [donationBags, setDonationBags] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [error, setError] = useState(false);
  const [showDonation, setShowDonation] = useState(true);
  const { user, token } = isAuthenticated();

  const showDonationBag = () => {
    // document.getElementById("donationRequest").style.display = "none";
    // document.getElementById("donationBag").style.display = "block";
    setShowDonation(true);
  };

  const showDonationRequest = () => {
    // document.getElementById("donationBag").style.display = "none";
    // document.getElementById("donationRequest").style.display = "block";
    setShowDonation(false);
  };

  const loadAllDonations = () => {
    console.log("loading all donations");
    getDonationBags(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setDonationBags(data);
      }
    });
    getDonationRequests(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setDonationRequests(data);
      }
    });
  };

  useEffect(() => {
    loadAllDonations();
  }, []);

  return (
    <Base>
      <div className="row mb-2">
        <p
          className={`btn ${showDonation ? "bg-success" : "bg-dark"} col-6`}
          onClick={showDonationBag}
        >
          <h1 className="text-white text-center">Donation Bags</h1>
        </p>
        <p
          className={`btn ${!showDonation ? "bg-success" : "bg-dark"} col-6`}
          onClick={showDonationRequest}
        >
          <h1 className="text-white text-center">Donation Requests</h1>
        </p>
      </div>
      <div
        id="donationBag"
        name="donationBag"
        style={showDonation ? { display: "block" } : { display: "none" }}
      >
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
    </Base>
  );
};

export default Home;
