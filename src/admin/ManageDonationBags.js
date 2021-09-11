import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  deleteDonationBag,
  getAllDonationBagsByUserId,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import moment from "moment";
import "../style/donationlist.css";

const ManageDonationBags = () => {
  const [donationBags, setDonationBags] = useState([]);
  const [donationBagId, setDonationBagId] = useState([]);
  const [getRedirect, setRedirect] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getAllDonationBagsByUserId(user._id, token, "Available").then((data) => {
      if (data.error) {
        console.log("ERROR!!:");
        console.log(data.error);
      } else {
        setDonationBags(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const performRedirect = () => {
    if (isAuthenticated()) {
      if (getRedirect === "YES") {
        return <Redirect to={`/admin/donationBag/update/${donationBagId}`} />;
      }
    }
  };
  const setData = (donationBagId) => {
    setDonationBagId(donationBagId);
    setRedirect("YES");
  };
  // {`/admin/donationBag/update/${donationBagId}`};

  const deleteThisProduct = (donationBagId) => {
    deleteDonationBag(donationBagId, user._id, token).then((data) => {
      if (data.error) {
        console.log("ERROR!!:");
        // console.log(data.error);
      } else {
        // setProducts(data);
        preLoad();
      }
    });
  };

  return (
    <Base className="container rounded pt-2 mt-5">
      <div className="list-inline d-flex justify-content-center">
        <Link
          className="btn btn-md btn-dark mb-3 mt-2 list-inline-item"
          to={`/admin/dashboard`}
        >
          Dashboard
        </Link>
        <h1 className="list-inline-item text-white mx-auto pt-0 pr-5">
          Manage Donation Bags
        </h1>
      </div>
      <div className="row list rounded">
        <div className="col-12 mx-auto">
          <h5 className="text-center text-white mt-3 mb-3">
            Found {donationBags.length} donation bags
          </h5>
          <div class="row">
            <div class="col-12">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created</th>
                    <th scope="col" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donationBags.map((donationBag, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{donationBag.name}</td>
                        <td>{moment(donationBag.createdAt).format("LL")}</td>
                        <td className="d-flex justify-content-around">
                          {/* <button type="button" class="btn btn-primary">
                            <i class="far fa-eye"></i>
                          </button> */}
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick={() => {
                              setData(donationBag._id);
                            }}
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              deleteThisProduct(donationBag._id);
                            }}
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {performRedirect()}
    </Base>
  );
};

export default ManageDonationBags;
