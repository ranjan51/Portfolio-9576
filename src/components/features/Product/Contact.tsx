import React from "react";
import Widget from "./widget";
import { contactList } from "./data";


const Contact = () => {
  return (
    <Widget  styleName="gx-card-profile-sm">
       <div style={{display:"flex",alignItems:"center"}}>
<img className="gx-mb-3" height={35} width={35}  src={"/assets/images/contactInfo.gif"} />
        <span style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="gx-mb-3 gx-ml-2 gx-fs-xl">Contact</span>
        </div>
      {contactList.map((data, index) =>
        <div key={index} className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-${data.icon} gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">{data.title}</span>
            <p className="gx-mb-0">{data.desc}</p>
          </div>
        </div>
      )}
    </Widget>
  )
}

export default Contact;
