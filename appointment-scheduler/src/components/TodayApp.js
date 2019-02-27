import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { isBuffer } from "util";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserName from "./UserName";

const API_BASE = "http://localhost:3000/";

class TodayApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      slots: []
    };
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    const userN = user.name;
    axios
      .get(API_BASE + "appointments/", { params: { name: userN } })
      .then(response => {
        this.handleDBReponse(response.data);
      });
  }
  handleDBReponse(response) {
    this.setState({ items: response });
  }

  //use componentDidMount to fetch data from a server with AJAX calls
  componentDidMount() {
    /*     axios
      .get(API_BASE + `retrieveSlots/byId`, {
        params: { _id: "5c6c9004fff2373ba017af60" }
      })
      .then(response => {
        this.handleDBsumbitRes(response.data);
      }); */
  }

  handleDBsumbitRes(response) {
    this.setState({ slots: response });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userN = user.name;
    return (
      <div class="container-fluid">
        <ul>
          <div class="row ">
            <div class="card-columns">
              <div class="pr-4">
                {this.state.items.map(function(item, index) {
                  return (
                    <div class="card">
                      <h5 class="card-title ">{userN} Appointment at</h5>
                      <p class="card-text">{item.name}</p>
                      <p class="card-text">
                        <small class="text-muted">
                          slot: {item.email}
                          {item.slots}
                        </small>
                        {/* <UserName name={item.slots} /> */}
                        <div className="summary-info" />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { withRouter }
)(TodayApp);
