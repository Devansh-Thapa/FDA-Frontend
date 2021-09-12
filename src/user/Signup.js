import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("!!ERROR!!: Signup", error));
  };

  const signUpForm = () => {
    return (
      <div className="row mt-5 container mx-auto">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="">
            <h2>Signup</h2>
          </div>
          <form action="#">
            <div className="form-group">
              <label>
                <h6>Name</h6>
              </label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <h6>Email</h6>
              </label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <h6>Password</h6>
              </label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
                required
              />
            </div>
            <div className="form-group">
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account created successfully.Please{" "}
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
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

  return (
    <Base title="Sign up page" description="A page to sign up!!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
