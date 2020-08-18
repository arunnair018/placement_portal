import React, { Component } from "react";
import Login from "./login";
import Register from "./register";

class Auth extends Component {
  state = {
    login: "1",
  };

  changeScope = (e) => {
    e.preventDefault();
    this.setState({
      login: e.target.id,
    });
  };

  changeLogin = (x) => {
    this.setState({
      login: x,
    });
  };

  render() {
    return (
      <div className=''>
        <nav>
          <div className='nav-wrapper'>
            <a href='/' className='brand-logo left'>
              AddSkill
            </a>
            <ul className='nav-ul right' id='nav-mobile'>
              <li className='nav-li'>
                <a href='/#' id='1' onClick={this.changeScope}>
                  SignIn
                </a>
              </li>
              <li className='nav-li'>
                <a href='/#' id='0' onClick={this.changeScope}>
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.login === "0" ? (
          <Register staw={this.state.login} login={this.changeLogin} />
        ) : (
          <Login staw={this.state.login} />
        )}
      </div>
    );
  }
}

export default Auth;
