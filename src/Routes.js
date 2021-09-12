import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import DonationHistory from "./core/DonationHistory";
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
    <HashRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute
          path="/donationHistory"
          exact
          component={DonationHistory}
        />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* <Route path="/cart" exact component={Cart} /> */}

        <Route path="/signin" exact component={AdminRoute} />
        {/* <PrivateRoute path="/user/dashboard" exact component={UserDashboard} /> */}
        <AdminRoute path="/user/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/user/create/DonationBag"
          exact
          component={AddDonationBag}
        />
        <AdminRoute
          path="/user/create/DonationRequest"
          exact
          component={AddDonationRequest}
        />
        <AdminRoute
          path="/user/manage/donationBags"
          exact
          component={ManageDonationBags}
        />
        <AdminRoute
          path="/user/donationBag/update/:donationBagId"
          exact
          component={UpdateDonationBag}
        />
        <AdminRoute
          path="/user/manage/donationRequests"
          exact
          component={ManageDonationRequests}
        />
        <AdminRoute
          path="/user/donationRequest/update/:donationRequestId"
          exact
          component={UpdateDonationRequest}
        />
      </Switch>
    </HashRouter>
  );
};

export default Routes;
