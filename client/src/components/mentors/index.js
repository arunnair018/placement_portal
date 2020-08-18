import React, { Component } from "react";
import CompanyList from "./companyList";
import Details from "./detailSection";
import cookie from "js-cookie";
import { Redirect } from "react-router";
import Axios from "axios";

class Mentor extends Component {
  state = {
    scope: "",
    redirect: false,
    studs: [],
    companies: [],
    load: false,
  };

  setScope = (scope) => {
    this.setState({
      scope: scope,
      load: true,
    });
  };

  componentDidMount() {
    const token = cookie.get("token");
    Axios.get("/users", {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.setState({
          studs: res.data,
        });
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    if (!this.state.load) {
      return <center>loading...</center>;
    }
    return (
      <div>
        <div className='row'>
          <div className='col s12 m3'>
            <CompanyList
              companies={this.state.companies}
              setScope={this.setScope}
            />
          </div>
          <div className='col s12 m9'>
            <Details scope={this.state.scope} studs={this.state.studs} />
          </div>
        </div>
      </div>
    );
  }
}

export default Mentor;
