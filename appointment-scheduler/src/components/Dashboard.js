import React, { Component } from "react";
import AppointmentApp from "./AppointmentApp";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TodayApp from "./TodayApp";
import UserName from "./UserName";

class Dashboard extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Hello, {user.name}</h1>

          <TodayApp name={user.name} />
          <p class="lead">What would you like to do today?</p>
        </div>
        <div class="card text-center">
          <div class="card-header">Need some freshing up?</div>
          <div class="card-body">
            <h5 class="card-title">Set an Appointment</h5>

            <a href="#demo" data-toggle="collapse" class="btn btn-primary">
              Go somewhere
            </a>
            <div id="demo" class="collapse ">
              <p class="text-left">
                <AppointmentApp />
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    const guestLinks = (
      <div class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <h4 class="alert-heading">Warning! Not authorized</h4>
        <p class="mb-0">
          {" "}
          Need to Sign In First.{" "}
          <a href="/Login" class="alert-link">
            Login Page
          </a>
          .
        </p>
      </div>
    );

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { withRouter }
)(Dashboard);
