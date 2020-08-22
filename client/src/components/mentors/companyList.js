import React, { Component } from "react";
import Axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router";

class CompanyList extends Component {
  state = { show: false, redirect: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, redirect: true });
  };

  terminate = (id) => {
    if (window.confirm("You are about to terminate an company.")) {
      let token = cookie.get("token");
      Axios.put(
        `/company/${id}`,
        { isActive: false },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
        .then((res) => {
          this.setState({
            redirect: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        redirect: true,
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    var companies = this.props.companies;
    return (
      <div>
        <div className='company-list'>
          <div className='channel-list'>
            <span>Currently Active</span>
            <br />
            <br />
            {companies.map((item, index) => {
              if (item.isActive) {
                return (
                  <button
                    className='channel-button waves-effect lookout-name'
                    key={item._id}
                    onClick={(e) => {
                      this.props.setScope(item.name);
                    }}
                  >
                    {item.name}
                    <button
                      class='closer'
                      onClick={() => {
                        this.terminate(item.name);
                      }}
                    >
                      X
                    </button>
                  </button>
                );
              }
            })}
            <hr />
            {companies.map((item, index) => {
              if (!item.isActive) {
                return (
                  <button
                    disabled
                    className='channel-button waves-effect'
                    key={item._id}
                    onClick={(e) => {
                      this.props.setScope(item.name);
                    }}
                  >
                    {item.name}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyList;
