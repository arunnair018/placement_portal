import React from "react";
import { Component } from "react";
import AddCompany from "./addCompany";

class Details extends Component {
  render() {
    if (this.props.scope === "add") {
      return (
        <div>
          <AddCompany studs={this.props.studs} />
        </div>
      );
    }
    return <div>details</div>;
  }
}

export default Details;
