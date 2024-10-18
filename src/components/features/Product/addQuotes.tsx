import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Card, Row, Col, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQzJvhbf-ZuA5EblItZ0Ed6GVQK0Hd6u4",
  authDomain: "react-images-4c7f5.firebaseapp.com",
  projectId: "react-images-4c7f5",
  storageBucket: "react-images-4c7f5.appspot.com",
  messagingSenderId: "270801425263",
  appId: "1:270801425263:web:d40c3fb9b69dc327120e9a",
  measurementId: "G-VGP7RSGQEC",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

const { Option } = Select;

const AddQuotesForm: React.FC = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<any>('quotes');

  const handleFileChange = (info: any) => {
    const selectedFile = info?.fileList[0]?.originFileObj;
    setFile(selectedFile);
  };

  const onFinish = async (values: any) => {
    try {
      // Common data
      let imageUrl = '';
      if (file && selectedType === 'quotes') {
        const imageRef = ref(storage, `Products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Prepare data based on the selected type
      const dataToSave = selectedType === 'quotes'
        ? {
            title: values.title,  // Quotes Title
            name: values.name,    // Quotes Name
            categories: values.categories, // Selected categories
            imageUrl,             // Image URL
            createdAt: new Date(),
          }
        : {
            title: values.title,   // Video Title
            name: values.name,     // Video Name
            videoLink: values.videoLink, // Video Link
            platform: values.platform,   // Video Platform
            createdAt: new Date(),
          };

      // Save data to Firestore
      const docRef = await addDoc(collection(firestore, selectedType === 'quotes' ? 'quotes' : 'videos'), dataToSave);

      if (docRef.id) {
        message.success(`${selectedType === 'quotes' ? 'Quotes' : 'Video'} added successfully`);
        form.resetFields();
        setFile(null);
      }
    } catch (error) {
      console.error(`Error adding ${selectedType}:`, error);
      message.error(`Failed to add ${selectedType}`);
    }
  };

  return (
    <motion.div    initial={{ y: 200, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Card
      style={{minHeight:"580px",padding:"0px"}}
        title={
          <Row className="gx-ml-0">
            <Col className="gx-mb-0">
              <img className="gx-mr-3" height={30} src="/assets/images/Addproduct.gif" alt="Add Item" />
              <span style={{ fontSize: 18 }}>Add {selectedType === 'quotes' ? 'Quotes' : 'Video'}</span>
            </Col>
          </Row>
        }
      >
        <Form form={form} onFinish={onFinish}>
          {/* Type Selection Dropdown */}
          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Select Type</span>
              <Form.Item name="type">
                <Select
                  placeholder="Select Quotes or Video"
                  onChange={(value) => setSelectedType(value)}
                  defaultValue="quotes"
                >
                  <Option value="quotes">Quotes</Option>
                  <Option value="video">Video</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Conditionally Rendered Fields */}
          {selectedType === 'quotes' ? (
            <>
              {/* Quotes Title and Name */}
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Quotes Title</span>
                  <Form.Item name="title" rules={[{ required: true, message: 'Please enter the Quotes title' }]}>
                    <Input placeholder="Enter Quotes title" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Quotes Name</span>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please enter the Quotes name' }]}>
                    <Input placeholder="Enter Quotes name" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Quotes Categories and Image Upload */}
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Categories</span>
                  <Form.Item name="categories" rules={[{ required: true, message: 'Please select at least one category' }]}>
                    <Select placeholder="Select categories">
                      <Option value="Hindi">Hindi</Option>
                      <Option value="Bhojpuri">Bhojpuri</Option>
                      <Option value="English">English</Option>
                      <Option value="Bengali">Bengali</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Thumbnail Image</span>
                  <Form.Item>
                    <Upload listType="picture" maxCount={1} onChange={handleFileChange} beforeUpload={() => false}>
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Video Fields: Title, Name, Video Link, and Platform */}
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Title</span>
                  <Form.Item name="title" rules={[{ required: true, message: 'Please enter the video title' }]}>
                    <Input placeholder="Enter video title" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Name</span>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please enter the video name' }]}>
                    <Input placeholder="Enter video name" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Video Link and Platform */}
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Link</span>
                  <Form.Item name="videoLink" rules={[{ required: true, message: 'Please enter the video link' }]}>
                    <Input placeholder="Enter video link" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Platform</span>
                  <Form.Item name="platform" rules={[{ required: true, message: 'Please select a platform' }]}>
                    <Select placeholder="Select platform">
                      <Option value="YouTube">YouTube</Option>
                      <Option value="Instagram">Instagram</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedType === 'quotes' ? 'Add Quotes' : 'Add Video'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
};

export default AddQuotesForm;
