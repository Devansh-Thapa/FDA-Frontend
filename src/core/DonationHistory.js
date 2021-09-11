import React, { useState, useEffect } from "react";
// import "../style/.css";
import Base from "./Base";
import Card from "./Card";
import {
  getAllDonationBagsByUserId,
  getAllDonationRequestsByUserId,
} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import "../style/home.css";

const DonationHistory = () => {
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
    getAllDonationBagsByUserId(user._id, token, "Accepted").then((data) => {
      console.log("bag", data);
      if (data.error) {
        setError(data.error);
      } else {
        setDonationBags(data);
      }
    });
    getAllDonationRequestsByUserId(user._id, token, "Accepted").then((data) => {
      console.log("Requests", data);
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
      <div className="row mb-2 container-lg">
        <p
          className={`btn ${showDonation ? "bg-active" : "bg-inactive"} col-6`}
          onClick={showDonationBag}
        >
          <h1 className="text-center">Donation Bags</h1>
        </p>
        <p
          className={`btn ${!showDonation ? "bg-active" : "bg-inactive"} col-6`}
          onClick={showDonationRequest}
        >
          <h1 className="text-center">Donation Requests</h1>
        </p>
      </div>
      <div id="content">
        <div
          id="donationBag"
          name="donationBag"
          style={showDonation ? { display: "block" } : { display: "none" }}
        >
          <div className="row">
            {donationBags.map((donation, index) => {
              // console.log(donation);
              return (
                <div key={index} className="col-6 mb-2">
                  <Card
                    donation={donation}
                    text="Donation"
                    showButton={false}
                  />
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
                  <Card donation={donation} text="Request" showButton={false} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DonationHistory;
