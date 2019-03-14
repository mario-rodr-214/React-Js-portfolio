import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div
        class="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex justify-content-end">
            <a class="nav-link" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li class="nav-item d-flex justify-content-end">
            <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
              {user.name} Logout
            </a>
          </li>
        </ul>
      </div>
    );
    const guestLinks = (
      <div
        class="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item d-flex justify-content-end">
            <a class="nav-link" href="/register">
              Register
            </a>
          </li>
          <li class="nav-item d-flex justify-content-end">
            <a class="nav-link " href="/Login">
              Login
            </a>
          </li>
        </ul>
      </div>
    );
    return (
      <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Welcome
          </a>

          <button
            class="navbar-toggler justify-content-end"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon" />
          </button>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
