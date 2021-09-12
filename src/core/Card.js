import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  acceptDonationBag,
  acceptDonationRequest,
} from "./helper/coreapicalls";
import "../style/card.css";

const Card = ({ donation, text, showButton = true }) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(donation.count);

  // const cardTitle = donation ? donation.name : "A photo from pexels";
  // const cardDescription = donation
  //   ? donation.description
  //   : "Default description";
  // const cardContactNumber = donation ? donation.contactNumber : "88888888";
  // const cardAddress = donation ? donation.address : "stree 404";
  const { user, token } = isAuthenticated();

  const acceptDonationBags = () => {
    acceptDonationBag(donation._id, user._id, token, donation).then(
      window.location.reload()
    );
  };

  const acceptDonationRequests = () => {
    acceptDonationRequest(donation._id, user._id, token, donation).then(
      window.location.reload()
    );
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const showAccept = (text) => {
    return (
      <button
        onClick={
          text === "Donation" ? acceptDonationBags : acceptDonationRequests
        }
        className="btn btn-block btn-success mt-2 mb-2"
      >
        Accept {text}
      </button>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-header lead text-center text-white">
        {donation.name}
        <div
          className={
            donation.category === "Vegetarian" ? "green-square" : "red-square"
          }
          style={{ float: `right` }}
        >
          <i
            className={`fas fa-circle ${
              donation.category === "Vegetarian"
                ? "text-success"
                : "text-danger"
            }`}
          ></i>
        </div>
      </div>
      <div className="card-body">
        {getARedirect(redirect)}
        <p className="lead font-weight-normal text-wrap">
          {donation.description}
        </p>
        <p className="lead font-weight-normal text-wrap d-flex justify-content-between">
          <span>
            <i className="fas fa-user mr-2"></i>
            Donated By: {donation.user.name}
          </span>
          <span>
            <i className="fas fa-phone-alt mr-2"></i>
            {donation.contactNumber}
          </span>
        </p>
        {donation.acceptedBy ? (
          <p className="lead font-weight-normal text-wrap d-flex justify-content-between">
            <span>
              <i class="fas fa-user color-info mr-2"></i>
              Accepted By: {donation.acceptedBy.name}
            </span>
          </p>
        ) : (
          ""
        )}
        <p className="lead font-weight-normal text-wrap">
          <i className="fas fa-home mr-2"></i>
          {donation.address}
        </p>
        <p className="lead font-weight-normal text-wrap ">{`${donation.city},${donation.state}`}</p>
        <div className="row">
          <div className="col-12">{showButton ? showAccept(text) : ""}</div>
          {/* <div className="col-12">{showRemovefromCart(removefromCart)}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
