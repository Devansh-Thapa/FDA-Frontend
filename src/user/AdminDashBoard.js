import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white text-center">
          Navigation
        </h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to="/admin/create/donationBag"
              className="nav-link text-success"
            >
              Add Donation Bag
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/manage/donationBags"
              className="nav-link text-success"
            >
              Manage Donation Bags
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/donationRequest"
              className="nav-link text-success"
            >
              Add Donation Request
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/manage/donationRequests"
              className="nav-link text-success"
            >
              Manage Donation Requests
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <div>
          <h4 className="card-header">
            My Information
            {/* <span className="badge bg-danger"> area</span> */}
          </h4>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge  mr-2">
              <h5>Name:</h5>
            </span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge  mr-2">
              <h5>Email:</h5>
            </span>{" "}
            {email}
          </li>
          {/* <li className="list-group-item">
            <span className="badge bg-danger">Admin area</span>
          </li> */}
        </ul>
      </div>
    );
  };

  return (
    <Base className="container bg-info pt-2 mt-5">
      <div className="mt-0 mb-3">
        <h1>My Dashboard</h1>
      </div>
      <div className="row mt-2 bg-secondary mb-0 py-4">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
