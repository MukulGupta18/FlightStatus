// src/components/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title slide-in-top">About FlightStatus</h1>
      <p className="about-description fade-in">
        FlightStatus is a comprehensive platform designed to provide real-time updates and status information for flights all around the world. Our mission is to help travelers stay informed and make their travel experience as smooth as possible.
      </p>
      <p className="about-description fade-in">
        Our team is dedicated to ensuring that you have the most up-to-date and accurate flight information at your fingertips. Whether you are planning a trip, tracking a loved one's flight, or simply curious about the status of flights, FlightStatus has got you covered.
      </p>
      <div className="about-features">
        <h2 className="slide-in-left">Features</h2>
        <ul>
          <li className="fade-in">Real-time flight status updates</li>
          <li className="fade-in">Comprehensive flight search</li>
          <li className="fade-in">User-friendly interface</li>
          <li className="fade-in">Notifications for flight changes</li>
          <li className="fade-in">Support for multiple airlines and airports</li>
        </ul>
      </div>
      <div className="about-indigo">
        <h2 className="slide-in-left">Indigo Flight Status</h2>
        <p className="about-description fade-in">
          Indigo is one of the largest airlines in India, known for its efficient service and punctual flights. With FlightStatus, you can easily track the real-time status of any Indigo flight. Our platform provides detailed information, including departure and arrival times, delays, gate information, and more.
        </p>
        <ul>
          <li className="fade-in">Check real-time status of Indigo flights</li>
          <li className="fade-in">Receive notifications for any changes or delays</li>
          <li className="fade-in">View gate and terminal information</li>
          <li className="fade-in">Get detailed flight schedules</li>
        </ul>
        <p className="about-description fade-in">
          Stay updated with Indigo flight statuses and make your travel plans hassle-free with FlightStatus.
        </p>
      </div>
    </div>
  );
}

export default About;
