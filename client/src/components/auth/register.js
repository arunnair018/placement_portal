import React, { Component } from "react";
import axios from "axios";
import MD5 from "crypto-js/md5";

class Register extends Component {
  state = {
    username: "",
    password: "",
    secret: "",
    errors: "",
    role: "student",
    redirect: false,
  };

  // function to change state when an event is happened
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // function to submit the form
  handleSubmit = (e) => {
    e.preventDefault(); // prevents default working of function
    console.log(this.state.role);
    // form the body of request

    if (
      this.state.role === "Mentor" &&
      MD5(this.state.secret).toString() !== "63bcc58aa5ba755987c3bb16e495dd2d"
    ) {
      this.setState({
        errors: "Invalid Secret...",
      });
    }
    const data = {
      username: this.state.username,
      role: this.state.role,
      password: this.state.password,
    };
    // axiosfunction to make API call
    axios
      .post(`/users`, data)
      .then((res) => {
        this.props.login("1");
      })
      .catch((err) => {
        // API call not succeed set error to display
        this.setState({ errors: "error submitting" });
      });
  };

  // check for password matching
  confirmPassword = (e) => {
    if (e.target.value !== this.state.password) {
      this.setState({
        errors: "Passwords not matching.",
      });
    } else {
      this.setState({ errors: "" });
    }
  };

  // render the jsx with proper data
  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h3>Register</h3>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                id="username"
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                id="password"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                id="confirm_password"
                onChange={this.confirmPassword}
                required
              />
            </div>

            <div className="form-group">
              <select
                class="browser-default select"
                id="role"
                defaultValue="0"
                onChange={this.handleChange}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            {this.state.role !== "student" && (
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter secret"
                  id="secret"
                  onChange={this.handleChange}
                />
              </div>
            )}
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {errors ? (
              <center>
                <span className="error">{errors}</span>
              </center>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
