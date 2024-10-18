import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, message, Row, Col, Card, Select, Rate } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { AddNewProduct } from '../../../redux/features/product/addProduct';
import { GetMasterCategory } from '../../../redux/features/product/getAllCategories';
import { motion } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const { Option } = Select;

const AddProductForm: React.FC = () => {
  
const firebaseConfig = {
  apiKey: "AIzaSyAQzJvhbf-ZuA5EblItZ0Ed6GVQK0Hd6u4",
  authDomain: "react-images-4c7f5.firebaseapp.com",
  projectId: "react-images-4c7f5",
  storageBucket: "react-images-4c7f5.appspot.com",
  messagingSenderId: "270801425263",
  appId: "1:270801425263:web:d40c3fb9b69dc327120e9a",
  measurementId: "G-VGP7RSGQEC"
};

const firebaseApp = initializeApp(firebaseConfig);
 const storage = getStorage(firebaseApp);
 const firestore = getFirestore(firebaseApp);
  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const { GetMasterCategoryData, GetMasterCategoryLoad } = useSelector((state: any) => state.GetMasterCategoryAction);
  console.log("GetMasterCategoryData", GetMasterCategoryData);

  const handleFileChange = (info: any) => {
    const file = info?.fileList[0]?.originFileObj;
    setFile(file);
  };

  useEffect(() => {
    dispatch(GetMasterCategory());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      // Upload image to Firebase Storage
      let imageUrl = '';
      if (file) {
        const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
  
      // Prepare product data to be saved
      const productData = {
        name: values.name,
        details: values.details,
        price: values.price,
        discountPrice: values.discountPrice,
        rating: values.rating,
        percentageOff: values.percentageOff,
        category: values.category,
        imageUrl,  // Add image URL to product data
        createdAt: new Date(),
      };
  
      // Save product data to Firestore
      const docRef = await addDoc(collection(firestore, 'products'), productData);
  
      if (docRef.id) {
        message.success('Product added successfully');
        form.resetFields();
        setFile(null);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product');
    }
  };
  
  return (
    <motion.div initial={{ y: 200, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>

      <Card
        title={
          <Row className="gx-ml-0">
            <Col className="gx-mb-0">
              <img className="gx-mr-3" height={30} src="/assets/images/AddProduct.gif" alt="Add Product" />
              <span style={{ fontSize: 18 }}>
                Add Product
              </span>
            </Col>
          </Row>
        }
      >
        <Form form={form} onFinish={onFinish}>
          {/* Existing fields */}
          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Product Name
              </span>
              <Form.Item className="gx-ml-2" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Product Details
              </span>
              <Form.Item className="gx-ml-2" name="details" rules={[{ required: true, message: 'Please enter the product details' }]}>
                <Input.TextArea rows={1} placeholder="Enter product details" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Price
              </span>
              <Form.Item className="gx-ml-2" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                <InputNumber placeholder="Enter price" style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Discount Price
              </span>
              <Form.Item className="gx-ml-2" name="discountPrice" rules={[{ required: true, message: 'Please enter the discount price' }]}>
                <InputNumber placeholder="Enter discount price" style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="gx-mt-0">
           
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Percentage Off
              </span>
              <Form.Item className="gx-ml-2" name="percentageOff" rules={[{ required: true, message: 'Please enter the percentage off' }]}>
                <InputNumber placeholder="Enter percentage off" style={{ width: '100%' }} min={0} max={100} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column-ml-2">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Rating
              </span>
              <Form.Item className="gx-ml-2" name="rating" rules={[{ required: true, message: 'Please enter the rating (0-5)' }]}>
                {/* Replace InputNumber with Rate component */}
                <Rate allowHalf />
              </Form.Item>
            </Col>
          </Row>

          {/* New Category Field */}
          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Category
              </span>
              <Form.Item className="gx-ml-2" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
                <Select placeholder="Select a category">
                  {GetMasterCategoryData.map((category: any) => (
                    <Option key={category._id} value={category._id}>
                      {category.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">
                <span className="gx-text-red gx-font-weight-bold">*</span> Product Image
              </span>
              <Form.Item className="gx-ml-2">
              <Upload listType="picture" maxCount={1} onChange={handleFileChange} beforeUpload={() => false}>
  <Button icon={<UploadOutlined />}>Upload Image</Button>
</Upload>

              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
};

export default AddProductForm;
