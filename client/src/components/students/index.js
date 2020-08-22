import React, { Component } from "react";
import Lookouts from "./lookouts";
import Details from "./details";
class Student extends Component {
  render() {
    return (
      <div>
        <div class='row'>
          <div class='col s12 m9'>
            <div class='lookoutheader'>Interviews</div>
            <Details />
          </div>
          <div class='col s12 m3 col-sm'>
            <div class='lookoutheader'>Company Lookouts</div>
            <Lookouts />
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
