import React, { useState, Component } from "react";
import cookie from "js-cookie";
import Axios from "axios";

class Imodal extends Component {
  state = {
    status: "",
    assignment: "",
    load: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.interview._id !== prevProps.interview._id) {
      this.setState({
        status: this.props.interview.status,
        assignment: this.props.interview.assignment,
        load: true,
      });
    }
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let token = cookie.get("token");
    let data = {
      status: parseInt(this.state.status),
      assignment: this.state.assignment,
    };

    Axios.put(`/interview/company/${this.props.interview._id}`, data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        this.props.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.load) {
      return "";
    }
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";

    var status;
    switch (this.props.interview.status) {
      case 1:
        status = "assignment";
        break;
      case 2:
        status = "technical";
        break;
      case 3:
        status = "hr";
        break;
      case 4:
        status = "placed";
        break;
      default:
        status = "initial";
    }

    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          <div class='modal-content'>
            <center>
              <div class='select-div'>
                <div class='row'>
                  <div class='col s12 m6'>
                    <label htmlFor='cars'>Interview Status:</label>
                    <select
                      class='browser-default select'
                      id='status'
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option disabled value='0'>
                        INITIAL
                      </option>
                      <option value='1'>ASSIGNMENT</option>
                      <option value='2'>TECHNICAL</option>
                      <option value='3'>HR</option>
                      <option value='4'>PLACED</option>
                    </select>
                  </div>
                  <div class='col s12 m6'>
                    <label htmlFor='cars'>Assignment Status:</label>

                    <select
                      class='browser-default select'
                      id='assignment'
                      value={this.state.assignment}
                      onChange={this.handleChange}
                    >
                      <option disabled value='none'>
                        NONE
                      </option>
                      <option value='started'>STARTED</option>
                      <option value='done'>DONE</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className='modal-button btn' onClick={this.handleSubmit}>
                update
              </button>
              <button
                className='modal-button btn'
                onClick={this.props.handleClose}
              >
                close
              </button>
            </center>
          </div>
        </section>
      </div>
    );
  }
}

export default Imodal;
