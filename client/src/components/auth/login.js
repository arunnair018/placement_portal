import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import crypto from "crypto";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    redirect: false,
  };

  // function to change state when an event is happened
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    // axiosfunction to make API call
    axios
      .post(`/login`, data)
      .then((res) => {
        const data = res.data.role;
        const key = "RoLe";
        const role = crypto.createHmac("sha1", key).update(data).digest("hex");
        var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        // when API call succeed set cookies
        cookie.set("token", res.data.token, { expires: inFifteenMinutes });
        cookie.set("username", res.data.username, {
          expires: inFifteenMinutes,
        });
        cookie.set("id", res.data.id, { expires: inFifteenMinutes });
        cookie.set("role", role, { expires: inFifteenMinutes });
        this.setState({ redirect: true });
      })
      .catch((res) => {
        // API call not succeed set error to display
        if (!res.response) {
          this.setState({
            errors: {
              error: "Something went wrong...",
            },
          });
        } else {
          this.setState({ errors: res.response.data });
        }
      });
  };

  render() {
    const errors = this.state.errors;
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/home' />;
    }
    return (
      <div>
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>
            <br />
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter username'
                id='username'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='Enter password'
                id='password'
                onChange={this.handleChange}
              />
            </div>
            <br />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <center>
              {errors ? (
                <span className='error red-text text-darken-2'>
                  {errors.error}
                </span>
              ) : (
                ""
              )}
            </center>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
