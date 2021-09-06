import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddDonationBag from "./admin/AddDonationBag";
import AddDonationRequest from "./admin/AddDonationRequest";
import ManageDonationBags from "./admin/ManageDonationBags";
import UpdateDonationBag from "./admin/UpdateDonationBag";
import ManageDonationRequests from "./admin/ManageDonationRequest";
import UpdateDonationRequest from "./admin/UpdateDonationRequest";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* <Route path="/cart" exact component={Cart} /> */}

        <Route path="/signin" exact component={AdminRoute} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/DonationBag"
          exact
          component={AddDonationBag}
        />
        <AdminRoute
          path="/admin/create/DonationRequest"
          exact
          component={AddDonationRequest}
        />
        <AdminRoute
          path="/admin/manage/donationBags"
          exact
          component={ManageDonationBags}
        />
        <AdminRoute
          path="/admin/donationBag/update/:donationBagId"
          exact
          component={UpdateDonationBag}
        />
        <AdminRoute
          path="/admin/manage/donationRequests"
          exact
          component={ManageDonationRequests}
        />
        <AdminRoute
          path="/admin/donationRequest/update/:donationRequestId"
          exact
          component={UpdateDonationRequest}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
