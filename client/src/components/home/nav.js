import React, { Component } from "react";
import cookie from "js-cookie";
import Axios from "axios";

class Nav extends Component {
  state = {
    data: [],
  };

  closeModal = () => {
    this.setState({
      modal: "",
    });
  };

  openModal = () => {
    this.setState({
      modal: "open-modal",
    });
  };

  logout = () => {
    cookie.remove("token");
    cookie.remove("username");
    cookie.remove("id");
    cookie.remove("role");
  };

  searchpost = () => {
    let data = { query: this.state.search };
    Axios.post("/search", data)
      .then((res) => {
        this.setState({
          data: res.data,
        });
        this.openModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className='nav-fixed'>
          <nav>
            <div className='nav-wrapper'>
              <a href='/' className='brand-logo left'>
                Placement Portal
              </a>
              <ul id='nav-mobile' className='right logout'>
                <li>
                  <a href='/#' onClick={this.logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div>
          <div id='myModal' className={`modal ${this.state.modal}`}>
            <div className='modal-content'>
              <span className='close' onClick={this.closeModal}>
                &times;
              </span>
              <div>
                {this.state.data.map((item, index) => {
                  return (
                    <div class='searches' key={index}>
                      <p>{item.username}</p>
                      <p>{item.message}</p>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
