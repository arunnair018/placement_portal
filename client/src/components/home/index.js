import React, { Component } from "react";
import cookie from "js-cookie";
import Nav from "./nav";
import Admin from "../admin";
import Student from "../students";
import Mentor from "../mentors";

class Home extends Component {
  state = {
    redirect: false,
    load: true,
  };

  render() {
    if (cookie.get("role") === "29301d25d3092c4826b543e879fe3c110e253cb8") {
      return (
        <div>
          <Nav />
          <Student />
        </div>
      );
    } else if (
      cookie.get("role") === "09fdcbfc523754da8bdc0a9414182d486368118a"
    ) {
      return (
        <div>
          <Nav />
          <Mentor />
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <Admin />
        </div>
      );
    }
  }
}

export default Home;
