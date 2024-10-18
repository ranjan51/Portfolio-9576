import { Carousel, Avatar, Row, Col, Rate, Card } from "antd";
import "./Home.css"; // Import your CSS file
import { fourthCardData, testimonials, ThirdCardData } from "./HomeData";
import { motion } from 'framer-motion';



const chunkArray = (array:any, chunkSize:any) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const BestofTodayCard = () => {
  const testimonialChunks = chunkArray(testimonials, 3);
  const secondCardFormat = chunkArray(fourthCardData, 5);
  const ThirdCardDataFormat = chunkArray(ThirdCardData, 5);

  return (

<>
<motion.div initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 0.9 }}>

 <Card    title={
        
                <Row  style={{margin:0}}  className="gx-ml-0">
        <Col>
                    <img  className="gx-mr-1" height={30} src="/assets/images/Best.gif"/>
                 <span style={{fontSize:18}}>
                     Best of Today
                    </span>
        </Col>
                </Row>
            }>
        
            <Carousel autoplay>
              {testimonialChunks.map((chunk, index) => (
                <div key={index}>
                  <Row gutter={[16, 16]}>
                    {chunk.map((testimonial:any, i:any) => (
                      <Col key={i} span={8}>
                        <div className="gx-classic-testimonial gx-slide-item">
                          <Avatar src={testimonial.avatar} alt="..." size={64} />
                          <h3 className="gx-title hover-name">{testimonial.name}</h3>
                          <small className="gx-post-designation">{testimonial.title}</small>
        
                          <div className="gx-star-rating">
                   <Rate defaultValue={testimonial?.rating}/>
                  </div>
                          <p className="gx-description">{testimonial.content}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </Carousel>
            </Card>
            </motion.div>
            <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 0.9 }}>
    <Carousel autoplay>
      {secondCardFormat.map((chunk, index) => (
        <div key={index}>
          <Row gutter={[16, 16]}>
            {chunk.map((testimonial:any, i:any) => (
              <Col key={i} span={4.9}>
                <Card>

                <div className="gx-classic-testimonial gx-slide-item">
                  <Avatar style={{display:"flex",justifyContent:"center"}} src={testimonial.avatar} alt="..." size={94} />
                  <div >

                  <h3 className="gx-title hover-name">{testimonial.name}</h3>
                  <p className="gx-post-designation">From ₹{1099}</p>

                  </div>
                </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Carousel>
    </motion.div>
    
    {/* <Card > */}
    <motion.div initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 0.9 }}>
    <div>
        
      {ThirdCardDataFormat.map((chunk, index) => (
        <div key={index}>
          <Row gutter={[16, 16]}>
            {chunk.map((testimonial:any, i:any) => (
              <Col key={i} span={4.9}>
                <Card>

                <div className="gx-classic-testimonial gx-slide-item">
                  <Avatar style={{display:"flex",justifyContent:"center"}} src={testimonial.avatar} alt="..." size={94} />
                  <div >

                  <h3 className="gx-title hover-name">{testimonial.name}</h3>
                  <p className="gx-post-designation">From ₹{1099}</p>

                  </div>
                </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
    </motion.div>
    {/* </Card> */}
</>

    // </Card>
  );
};

export default BestofTodayCard;
