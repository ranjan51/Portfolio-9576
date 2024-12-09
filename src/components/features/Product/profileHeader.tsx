import React from "react";
import {Avatar} from "antd";
import { motion } from "framer-motion";

const ProfileHeader = () => {
  return (
    <motion.div    initial={{ y: 200, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
    <div className="gx-profile-banner">
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top" style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="gx-profile-banner-top-left" style={{ display: "flex", alignItems: "center" }}>
              <div className="gx-profile-banner-avatar">
                <Avatar className="gx-size-90" alt="..." src={"/assets/images/sonukishordp.png"} />
              </div>
              <div className="gx-profile-banner-avatar-info" style={{ textAlign: "center" }}>
                <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light gx-ml-3">
                  Sonu Kishor
                </h2>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    style={{ marginRight: "5px" }}
                    height={20}
                    width={20}
                    src="/assets/images/icons8-location-96.png"
                  />
                  <p className="gx-mb-0 gx-fs-lg">Chhapra, Bihar, India</p>
                </div>
              </div>
            </div>
          <div className="gx-profile-banner-top-right">
            <ul className="gx-follower-list">
            <li>
  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">
    <img height={30} width={30} src="/assets/images/icons8-instagram-500.png" alt="Instagram" />
  </span>
  <span className="gx-fs-sm">
    <a 
      href="https://www.instagram.com/sonubhojpuriyaa/" 
      // href="https://www.instagram.com/_ranjankishoryadav/" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }} // Optional: Preserves current styles
    >
      Instagram
    </a>
  </span>
</li>

              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium"><img height={30} width={30} src="/assets/images/icons8-facebook-500.png"/></span>
                <span className="gx-fs-sm">
    <a 
      href="https://www.facebook.com/Sonukishoryadav" 
      // href="https://www.instagram.com/_ranjankishoryadav/" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }} // Optional: Preserves current styles
    >
      Facebook
    </a>
  </span>
                </li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium"><img height={30} width={30} src="/assets/images/icons8-twitter-480.png"/></span>
                <span className="gx-fs-sm">
    <a 
      href="https://www.facebook.com/Sonukishoryadav" 
      // href="https://www.instagram.com/_ranjankishoryadav/" 

      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }} // Optional: Preserves current styles
    >
      Twitter
    </a>
  </span>
              </li>
              <li>
                <span className="gx-follower-title gx-fs-lg gx-font-weight-medium"><img height={30} width={30} src="/assets/images/icons8-youtube-144.png"/></span>
                <span className="gx-fs-sm">
    <a 
      href="https://www.youtube.com/@locationbhojpuri" 
      // href="https://www.instagram.com/_ranjankishoryadav/" 

      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }} // Optional: Preserves current styles
    >
      You tube
    </a>
  </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="gx-profile-banner-bottom">
          <div className="gx-tab-list">
            <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Timeline</span>
              </li>
              <li>
                <span className="gx-link">About</span>
              </li>
              <li>
                <span className="gx-link">Photos</span>
              </li>
              {/* <li>
                <span className="gx-link">Friends <span className="gx-fs-xs">287</span></span>
              </li> */}
              <li>
                <span className="gx-link">More</span>
              </li>
            </ul>
          </div>
          <span className="gx-link gx-profile-setting">
            <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle"/>
            <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0">Setting</span>
          </span>
        </div>
      </div>
    </div>
    </motion.div>
  )
};

export default ProfileHeader;
