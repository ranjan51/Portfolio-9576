import React from "react";
import Auxiliary from "./auxilary";

const AboutItem = ({ data }: any) => {
    console.log("AboutItem Data:", data); // Check if the data is being passed correctly
    const { title, icon, desc, userList } = data;
  
    return (
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xlxl gx-text-orange`} />
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">{title}</h6>
          {userList === '' ? null : userList}
          {desc && desc.length > 0 ? <p className="gx-mb-0">{desc}</p> : null}
        </div>
      </div>
    );
  };
  

export default AboutItem;
