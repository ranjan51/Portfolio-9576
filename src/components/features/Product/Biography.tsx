import React from "react";
import Widget from "./widget";

const Biography = () => {
  return (
    <Widget styleName="gx-card-profile">
      <div className="ant-card-head">
        <div style={{display:"flex",alignItems:"center"}}>
<img className="gx-mb-3" height={25} width={25}  src={"/assets/images/more-info.gif"} />
        <span className="ant-card-head-title gx-mb-2 gx-ml-2">More About Me</span>
        </div>
        <p className="gx-text-grey gx-fs-lg gx-mb-0">Content Writer</p>
        {/* <p className="gx-text-grey gx-fs-md gx-mb-0">Full Stack Developer Specializing in Modern Web & Mobile Technologies.</p> */}
      </div>
      {/* <h3 className="gx-font-weight-light">Donec dignissim gravida sem, ut cursus dolor hendrerit et. Morbi
        volutpat.</h3> */}
      <p>Hello i am Sonu, a content writer with 1.5 years of experience in 
      content writing. Alongside writing, I’m also a lyricist.
      </p>
      <p>see below to know more.
      
      
      </p>

    </Widget>
  )
}


export default Biography;
