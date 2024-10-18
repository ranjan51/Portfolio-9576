import React from "react";
import {Avatar, Rate} from "antd";

const Classic = ({testimonial}:any) => {
  const {content, avatar, name, title} = testimonial;
  return (
    <div className="gx-classic-testimonial gx-slide-item">
      <Avatar src={avatar} alt="..."/>
      <h3 className="gx-title">{name}</h3>
      <small className="gx-post-designation">{title}</small>

      <div className="gx-star-rating">
      <Rate allowHalf defaultValue={3} />
      </div>
      <p className="gx-description">{content}</p>
    </div>
  )
};

export default Classic;

