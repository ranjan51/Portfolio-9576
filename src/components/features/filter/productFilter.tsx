import React from "react";
import { Button, Drawer, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import './productFilter.css';

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string | null;
  onCategoryChange: (value: string) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  visible,
  onClose,
  selectedCategory,
  onCategoryChange,
}) => {
    const WaveSVG = () => (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1400 320'
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
        >
          <path
            fill='#787eff'
            fillOpacity='1'
            d='M0,128L24,128C48,128,96,128,144,144C192,160,240,192,288,213.3C336,235,384,245,432,218.7C480,192,528,128,576,128C624,128,672,192,720,197.3C768,203,816,149,864,117.3C912,85,960,75,1008,85.3C1056,96,1104,128,1152,138.7C1200,149,1248,139,1296,122.7C1344,107,1392,85,1416,74.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'
          ></path>
        </svg>
      )
  return (
    <Drawer
    // className="productfilter"
    style={{padding:"0px"}}
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>	<img height={37} width={37} src="/assets/images/filter.gif"/>Filter Products</span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
          />
        </div>
      }
      visible={visible}
      onClose={onClose}
      closable={false} // Hides the default close icon
    >
      <Select
        placeholder="Select a category"
        style={{ width: "100%" }}
        onChange={onCategoryChange}
        value={selectedCategory}
      >
        <Select.Option value="electronics">Electronics</Select.Option>
        <Select.Option value="clothing">Clothing</Select.Option>
        <Select.Option value="books">Books</Select.Option>
        {/* Add more categories as needed */}
      </Select>
      <WaveSVG/>
    </Drawer>
  );
};

export default FilterDrawer;
