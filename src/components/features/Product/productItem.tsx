import React from "react";
import { Button, Rate, Row, Col } from "antd";

const ProductList = ({ products, grid }: any) => {
  return (
    <Row gutter={[10, 0]}>
      {products?.map((product: any) => {
        const {
          imageUrl,
          name,
          price,
          discountPrice,
          percentageOff,
          rating,
          details,
        } = product;

        return (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <div className={`gx-product-item ${grid ? "gx-product-vertical" : "gx-product-horizontal"}`}>
              <div className="gx-product-image">
                {/* <div className="gx-grid-thumb-equal"> */}
                  <span >
                    <img style={{height:"80%", width:"80%"}} alt={name} src={imageUrl} />
                  </span>
                {/* </div> */}
              </div>

              <div className="gx-product-body">
                <h3 className="hover-name">{name}</h3>
                <div className="ant-row-flex">
                  <h4>{price}</h4>
                  <h5 className="gx-text-muted gx-px-2">
                    <del>{discountPrice}</del>
                  </h5>
                  <h5 className="gx-text-success">{percentageOff}% off</h5>
                </div>
                <div className="ant-row-flex gx-mb-1">
                  <Rate  disabled allowHalf defaultValue={rating} />
                  <strong className="gx-d-inline-block gx-ml-2">{rating}</strong>
                </div>
                <p>{details}</p>
              </div>

              <div className="gx-product-footer">
                {/* <Button type="primary">Add</Button> */}
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProductList;
