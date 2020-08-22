import React, { Component } from "react";
import cookie from "js-cookie";
import { Redirect } from "react-router";
import axios from "axios";

class AddCompany extends Component {
  state = {
    name: "",
    jd: "",
    location: "",
    invites: [],
    all: this.props.studs.map((x) => x._id),
    names: [],
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.names);
    const data = {
      name: this.state.name.toLowerCase(),
      jd: this.state.jd,
      location: this.state.location.toLowerCase(),
      lookouts:
        this.state.invites.length < 1 ? this.state.all : this.state.invites,
    };
    const token = cookie.get("token");
    axios
      .post("/company", data, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        var names;

        if (this.state.names.length < 1) {
          names = "everyone";
        } else {
          names = this.state.names.join(", ");
        }

        var message = `*Company name: _${data.name}_* \n\n Note: ${data.jd} \n\n Lookouts: ${names}`;
        var msg = JSON.stringify(
          { type: "mrkdwn", text: message },
          {
            type: "divider",
          }
        );
        var config = {
          method: "POST",
          url: "",
          data: msg,
        };
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addInvites = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let name = e.target.innerHTML;
    this.setState({
      invites: [...this.state.invites, id],
      names: [...this.state.names, name],
    });
  };

  render() {
    const users = this.props.studs;

    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    return (
      <div className='container'>
        <h3>Add a new company</h3>
        <section className='pikachu'>
          <div className=' modainer'>
            <div className='row'>
              <form className='col- 12'>
                <div className='input-field col s6'>
                  <input
                    placeholder='Company Name'
                    id='name'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className='input-field col s6'>
                  <input
                    placeholder='Location'
                    id='location'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                  />
                </div>
                <div className='input-field col s12'>
                  <input
                    placeholder='Job Description'
                    id='jd'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                  />
                </div>
                <div className='input-field col s12'>
                  <input
                    placeholder='Lookouts'
                    id='invites'
                    type='text'
                    className='validate'
                    onChange={this.handleChange}
                    value={this.state.names}
                    disabled
                  />
                </div>

                <div className='invites-list'>
                  {users.map((item) => {
                    return (
                      <button
                        onClick={this.addInvites}
                        id={item._id}
                        key={item._id}
                        value={item}
                        className='invites'
                      >
                        @{item.username}
                      </button>
                    );
                  })}
                </div>
              </form>
            </div>
            <button
              className='btn waves-effect waves-light right'
              type='submit'
              name='action'
              onClick={this.handleSubmit}
            >
              CREATE
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default AddCompany;
