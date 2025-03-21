import React from 'react';
import bannerImg from "../../assets/banner.png";
import "./Banner.css"; // Import the CSS file

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-image">
        <img src={bannerImg} alt="Banner" />
      </div>
      <div className="banner-content">
        <h1>New Releases This Week</h1>
        <p>
          It's time to update your reading list with some of the latest and greatest releases 
          in the literary world. From heart-pumping thrillers to captivating memoirs, 
          this week's new releases offer something for everyone.
        </p>
        <button className="banner-button">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
