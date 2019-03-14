import React, { Component } from "react";
import img1 from "../img/portfolio/Dallas.jpg";
import img2 from "../img/portfolio/Austin2.jpg";
import pic from "../img/portfolio/1-pic.jpg";

const MyCarousel = () => (
  <div id="myCarousel" class="carousel slide bg-1" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active" />
      <li data-target="#myCarousel" data-slide-to="1" />
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src={img1} width="1200" height="700" alt="Dallas" />
        <div class="carousel-caption">
          <h3>Dallas</h3>
          <p>The atmosphere in Dallas is lorem ipsum.</p>
        </div>
      </div>

      <div class="carousel-item">
        <img src={img2} alt="Austin" width="1200" height="700" />
        <div class="carousel-caption">
          <h3>Austin</h3>
          <p>Thank you, Austin for the Opportunity.</p>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#myCarousel"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true" />
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#myCarousel"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true" />
      <span class="sr-only">Next</span>
    </a>
  </div>
);

const ContactForm = () => (
  <div class="container bg-1">
    <h3 class="text-center">Contact</h3>
    <div class="row">
      <div class="col-md-4">
        <p>Drop a note.</p>
        <p>
          <span class="fas fa-map-marker" />
          Austin, US
        </p>
        <p>
          <span class="fas fa-phone" />
          Phone: 214-718-9746
        </p>
        <p>
          <span class="fas fa-envelope" />
          Email: mario.rodr.214@mail.com
        </p>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-sm-6 form-group">
            <input
              class="form-control"
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              required
            />
          </div>
          <div class="col-sm-6 form-group">
            <input
              class="email"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
          </div>
        </div>
        <textarea
          class="form-control"
          id="comments"
          name="comments"
          placeholder="Comment"
          rows="5"
        />
        <br />

        <div class="row">
          <div class="col-md-12 form-group">
            <button class="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class Home extends Component {
  render() {
    return (
      <div>
        <MyCarousel />

        <div class="container text-center">
          <h3>I am Mario Rodriguez</h3>
          <p>Recent graduate in Computer Science</p>
          <br />
          <div class="row">
            <div class="col-sm-4">
              <p class="text-center">
                <strong>Favorite Movie</strong>
              </p>
              <br />
              <a href="#demo" data-toggle="collapse">
                <img src={pic} class="img-circle" alt="pic" />
              </a>
              <div id="demo" class="collapse">
                <p>Guitarist and Lead Vocalist</p>
                <p>Loves long walks on the beach</p>
                <p>Member since 1993</p>
              </div>
            </div>
            <div class="col-sm-4">
              <a href="#demo" data-toggle="collapse" />

              <p class="text-center">
                <strong>Name</strong>
              </p>
              <br />
              <img
                src={pic}
                class="img-circle person"
                alt="Random Name"
                width="255"
                height="255"
              />
            </div>
            <div class="col-sm-4">
              <a href="#demo" data-toggle="collapse" />

              <p class="text-center">
                <strong>Name</strong>
              </p>
              <br />
              <img src={pic} class="img-circle person" alt="Random Name" />
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    );
  }
}
