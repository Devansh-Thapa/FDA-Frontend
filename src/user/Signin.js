import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        // console.log("data:", data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Signin failed!!"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row container mt-5 mx-auto">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="">
            <h2>Signin</h2>
          </div>
          <form action="#">
            <div className="form-group">
              <label>
                <h6>Email</h6>
              </label>
              <input
                value={email}
                onChange={handleChange("email")}
                className="form-control"
                type="text"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <h6>Password</h6>
              </label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                required
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
