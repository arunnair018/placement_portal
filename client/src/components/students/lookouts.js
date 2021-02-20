import React from "react";
import { Component } from "react";
import Axios from "axios";
import cookie from "js-cookie";
import Modal from "./modal";
import { Redirect } from "react-router";

class Lookouts extends Component {
  state = {
    companies: [],
    load: false,
    show: false,
    scope: "",
    redirect: false,
  };

  showModal = (e, name) => {
    this.setState({
      show: true,
      scope: { id: e.target.id, name: name },
    });
  };

  hideModal = () => {
    this.setState({ show: false, redirect: true });
  };

  componentDidMount() {
    const token = cookie.get("token");
    Axios.get("/company", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({
          companies: res.data,
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let companies = this.state.companies;
    if (!this.state.load) {
      return (
        <center>
          <div class='loader'></div>;
        </center>
      );
    }
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          company={this.state.scope}
        />
        <div class='lookout-list'>
          {companies.map((item, index) => {
            if (item.isActive) {
              return (
                <button
                  className='channel-button waves-effect'
                  key={index}
                  id={item._id}
                  name={item.name}
                  onClick={(e) => this.showModal(e, item.name)}
                >
                  <p className='lookout-name'>Company: {item.name}</p>
                  {item.location ? <p>Location: {item.location}</p> : ""}
                  {item.jd ? <p>JD: {item.jd}</p> : ""}
                </button>
              );
            }
            return null
          })}
          <br />
          {companies.map((item, index) => {
            if (!item.isActive) {
              return (
                <button
                  className='channel-button waves-effect'
                  key={index}
                  disabled
                >
                  {item.name}
                </button>
              );
            }
            return null
          })}
        </div>
      </div>
    );
  }
}

export default Lookouts;
