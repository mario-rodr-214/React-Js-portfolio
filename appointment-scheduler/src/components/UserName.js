import React, { Component } from "react";
import { renderComponent } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
const API_BASE = "http://localhost:3000/";

class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: []
    };
  }

  componentWillMount() {
    /*     axios
      .get(API_BASE + "retrieveSlots/byId/", {
        params: { _id: "{name}" }
      })
      .then(response => {
        this.handleDBReponse(response.data);
      }); */
  }
  handleDBReponse(response) {
    this.setState({ slots: response });
  }
  componentWillReceiveProps(props) {
    axios
      .get(API_BASE + "retrieveSlots/byId/", {
        params: { _id: "5c537c349ecfd727b0c9589c" }
      })
      .then(response => {
        this.handleDBReponse(response.data);
      });
  }
  render() {
    return (
      <div class="alert alert-success">
        {this.state.slots.map(function(slot, index) {
          return <strong>Success! </strong>;
        })}
      </div>
    );
  }
}

export default UserName;
