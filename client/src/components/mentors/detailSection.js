import React from "react";
import { Component } from "react";
import AddCompany from "./addCompany";
import Axios from "axios";
import cookie from "js-cookie";
import { Redirect } from "react-router";

class Details extends Component {
  state = {
    interviews: [],
    load: false,
    redirect: false,
  };

  terminate = (id) => {
    if (window.confirm("You are about to terminate an interview process.")) {
      let token = cookie.get("token");
      Axios.put(
        `/interview/company/${id}`,
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

  fetchData = () => {
    let company = this.props.scope || "all";
    let token = cookie.get("token");
    Axios.post(`/interview/company/${company}`)
      .then((res) => {
        this.setState({
          interviews: res.data,
          load: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.scope !== prevProps.scope) {
      this.fetchData();
    }
  }

  convertDate = (d) => {
    var timestamp = new Date(d).getTime();
    var todate = new Date(timestamp).getDate();
    var tomonth = new Date(timestamp).getMonth() + 1;
    var toyear = new Date(timestamp).getFullYear();
    var original_date = tomonth + "/" + todate + "/" + toyear;
    return original_date;
  };

  render() {
    if (this.props.scope === "add") {
      return (
        <div>
          <AddCompany studs={this.props.studs} />
        </div>
      );
    }
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
      <div class='idetails'>
        <div class='row'>
          {this.state.interviews.map((item, index) => {
            var status;
            switch (item.status) {
              case 1:
                status = "ASSIGNMENT";
                break;
              case 2:
                status = "TECHNICAL";
                break;
              case 3:
                status = "HR";
                break;
              case 4:
                status = "PLACED";
                break;
              default:
                status = "INITIAL";
            }
            if (item.isActive) {
              return (
                <div key={item._id}>
                  <div class='col s12 m4'>
                    <div class='icard'>
                      <span class='iheader'>
                        {item.student.toUpperCase()} -{" "}
                        {item.company.toUpperCase()}
                      </span>
                      <button
                        class='closer'
                        onClick={() => {
                          this.terminate(item._id);
                        }}
                      >
                        X
                      </button>
                      <hr
                        style={{
                          height: "2px",
                          borderWidth: "0",
                          color: "black",
                          backgroundColor: "black",
                        }}
                      />
                      <div class='content'>
                        <p>
                          <b>Status: </b>
                          {status}
                        </p>
                        <p>
                          <b>Assignment: </b>
                          {item.assignment.toUpperCase()}
                        </p>
                        <p>
                          <b>Started on: </b>
                          {this.convertDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div class='row'>
          {this.state.interviews.map((item, index) => {
            var status;
            switch (item.status) {
              case 1:
                status = "ASSIGNMENT";
                break;
              case 2:
                status = "TECHNICAL";
                break;
              case 3:
                status = "HR";
                break;
              case 4:
                status = "PLACED";
                break;
              default:
                status = "INITIAL";
            }
            if (!item.isActive) {
              return (
                <div key={item._id} class='disable'>
                  <div class='col s12 m4'>
                    <div class='icard disable'>
                      <span class='iheader'>
                        {item.student.toUpperCase()} -{" "}
                        {item.company.toUpperCase()}
                      </span>
                      <hr
                        style={{
                          height: "2px",
                          borderWidth: "0",
                          color: "black",
                          backgroundColor: "black",
                        }}
                      />
                      <div class='content'>
                        <p>
                          <b>Started on: </b>
                          {this.convertDate(item.createdAt)}
                        </p>
                        <p>
                          <b>Last updated on: </b>
                          {this.convertDate(item.updatedAt)}
                        </p>
                        <p>
                          <b>Assignment: </b>
                          {item.assignment.toUpperCase()}
                        </p>
                        <p>
                          <b>Status: </b>
                          {status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default Details;
