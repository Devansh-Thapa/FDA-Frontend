import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  acceptDonationBag,
  acceptDonationRequest,
} from "./helper/coreapicalls";

const Card = ({ donation, text, setReload = (f) => f, reload = undefined }) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(donation.count);

  const cardTitle = donation ? donation.name : "A photo from pexels";
  const cardDescription = donation
    ? donation.description
    : "Default description";
  const cardContactNumber = donation ? donation.contactNumber : "88888888";
  const cardAddress = donation ? donation.address : "stree 404";
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
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Accept {text}
      </button>
    );
  };

  // const showRemovefromCart = () => {
  //   return (
  //     removefromCart && (
  //       <button
  //         onClick={() => {
  //           removeItemFromCart(donation._id);
  //           setReload(!reload);
  //         }}
  //         className="btn btn-block btn-outline-danger mt-2 mb-2"
  //       >
  //         Remove from cart
  //       </button>
  //     )
  //   );
  // };

  return (
    <div className="card text-white bg-dark border border-secondary">
      <div className="card-header lead text-center bg-secondary">
        {cardTitle}
      </div>
      <div className="card-body">
        {getARedirect(redirect)}
        <p className="lead font-weight-normal text-wrap">{cardDescription}</p>
        <p className="lead font-weight-normal text-wrap">
          Contact:{cardContactNumber}
        </p>
        <p className="lead font-weight-normal text-wrap">
          Address:{cardAddress}
        </p>
        <div className="row">
          <div className="col-12">{showAccept(text)}</div>
          {/* <div className="col-12">{showRemovefromCart(removefromCart)}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
