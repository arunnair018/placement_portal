import React from "react";
import { Component } from "react";
import Axios from "axios";
import cookie from "js-cookie";
import Imodal from "./imodal";
import { Redirect } from "react-router";

class Details extends Component {
  state = {
    interviews: [],
    load: false,
    show: false,
    scope: "",
    redirect: false,
  };

  showModal = (e) => {
    this.setState({
      scope: e,
      show: true,
    });
  };

  hideModal = () => {
    this.setState({ show: false, redirect: true, scope: "" });
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
    let student = cookie.get("username");
    Axios.post(`/interview/student/${student}`)
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

  convertDate = (d) => {
    var timestamp = new Date(d).getTime();
    var todate = new Date(timestamp).getDate();
    var tomonth = new Date(timestamp).getMonth() + 1;
    var toyear = new Date(timestamp).getFullYear();
    var original_date = tomonth + "/" + todate + "/" + toyear;
    return original_date;
  };

  render() {
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
      <div className='idetails'>
        <Imodal
          show={this.state.show}
          handleClose={this.hideModal}
          interview={this.state.scope}
        />
        <div class='row'>
          {this.state.interviews.map((item) => {
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
                  <div class='col s12 m6 l4'>
                    <div
                      class='icard'
                      id={item._id}
                      onClick={() => {
                        this.showModal(item);
                      }}
                    >
                      <span class='iheader'>{item.company.toUpperCase()}</span>
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
                      <span>Status: {status}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null
          })}
        </div>
        <div class='row'>
          {this.state.interviews.map((item) => {
            if (!item.isActive) {
              return (
                <div key={item._id} className='disable'>
                  <div class='col s12 m6 l4'>
                    <div class='icard disable' id={item._id}>
                      <span class='iheader'>{item.company.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null
          })}
        </div>
      </div>
    );
  }
}

export default Details;
