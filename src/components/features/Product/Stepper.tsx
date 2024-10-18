import React from "react";
import {Col, Row} from "antd";
import ContainerHeader from "../../layout/ContainerHeader";
import timeLineData from "./timeLineData";



const LeftAligned = ({match}:any) => {
  return (
    <Row>
      <Col span={24}>
        <ContainerHeader title={<h1>gyghjghjghjg</h1>} match={match}/>
      </Col>
      <Col span={24}>
        <div className="gx-timeline-section">
          {timeLineData.map((timeLine, index) => <h1>gjshdfdsfhj</h1>)}
        </div>
      </Col>
    </Row>
  )
};

export default LeftAligned;

