import React, { useState } from "react";
import { Col, Row, Steps, Tabs } from "antd";
import Widget from "./widget";
import AboutItem from "./aboutItem";
import { aboutList, EducationData, workData } from "./data"; // Ensure educationData is imported
import "./ProductList.css"
const { TabPane } = Tabs;

const About = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // Function to render data based on active tab
  const renderTabContent = () => {
    switch (activeTabKey) {
      case "1":
        return aboutList.map((about, index) => (
          <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
            <AboutItem data={about} />
          </Col>
        ));
      // case "2":
      //   return (
      //     <Col key={1} xs={24}>
      //       <Steps
      //         direction="vertical"
      //         current={1}
      //         style={{ paddingRight: 10 }} // Ensure content doesn't overflow horizontally
      //       >
      //         <Steps.Step
      //           title="Yayawari Group"
      //           description="Content Writer"
      //           icon={<img height={25} src={"/assets/images/current-account.png"} />}
      //         />
      //         <Steps.Step
      //           title="Yayawari Group"
      //           description="Content Writer"
      //           icon={<img height={25} src={"/assets/images/pending-tasks.png"} />}
      //         />
      //         {/* <Steps.Step
      //           title="Internshala"
      //           description="UI/UX Designer"
      //           icon={<img height={25} src={"/assets/images/start-line.png"} />}
      //         /> */}
      //       </Steps>
      //     </Col>
      //   );
      case "3":
        return (
          <Col key={1} xs={24}>
          <Steps
            direction="vertical"
            current={1}
            // style={{ paddingRight: 10 }} // Ensure content doesn't overflow horizontally
          >
            <Steps.Step
             title={
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "8px" }}>Hindi sahitya (BA)</span>
                  {/* <p style={{ margin: 0, fontSize: "small", lineHeight: "1.5" }} className="gx-fs-sm gx-text-grey">
                    2021-2023
                  </p> */}
                </div>
              </div>
            }
              description={<p>Indira Gandhi Open University</p>}
              icon={<img height={25} src={"/assets/images/certificate.png"} />}
            />
            <Steps.Step
       title={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "0px" }}>intermediate of science (ISC)</span>
            {/* <p style={{ margin: 0, fontSize: "small", lineHeight: "1.5" }} className="gx-fs-sm gx-text-grey">
              2021-2023
            </p> */}
          </div>
        </div>
      }
      
        
              description="B.S.E.B (Bihar Board Patna)"
              icon={<img height={25} src={"/assets/images/graduation-hat.png"} />}
            />
          </Steps>
        </Col>
        )
      default:
        return null;
    }
  };

  return (
    <Widget
      title={
        <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
          {/* Add image before the heading */}
          <img
            src={"/assets/images/info.gif"} // Replace with your image path
            alt="About Icon"
            style={{ width: 30, height: 30, marginRight: 3 }} // Adjust size and margin
          />
          About
        </div>
      }
      styleName="gx-card-tabs gx-card-profile"
    >
      <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
        <TabPane tab="Overview" key="1">
          <Row gutter={[16, 16]}>{renderTabContent()}</Row>
        </TabPane>
        {/* <TabPane tab="Work" key="2">
          <Row gutter={[16, 16]}>{renderTabContent()}</Row>
        </TabPane> */}
        <TabPane tab="Education" key="3">
          <Row gutter={[16, 16]}>{renderTabContent()}</Row>
        </TabPane>
      </Tabs>
    </Widget>
  );
};

export default About;
