import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Card, Row, Col, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

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
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleFileChange = (info: any) => {
    const selectedFile = info?.fileList[0]?.originFileObj;
    setFile(selectedFile);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setIsAuthorized(key === 'zMGS6ZD5Tg');
  };

  const onFinish = async (values: any) => {
    try {
      let imageUrl = '';
      if (file && (selectedType === 'quotes' || (selectedType === 'video' && selectedPlatform === 'Instagram'))) {
        const imageRef = ref(storage, `Products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const dataToSave = selectedType === 'quotes'
        ? {
            title: values.title,
            name: values.name,
            categories: values.categories,
            imageUrl,
            createdAt: new Date(),
          }
        : {
            title: values.title,
            name: values.name,
            videoLink: values.videoLink,
            platform: values.platform,
            ...(selectedPlatform === 'Instagram' && { imageUrl }),
            createdAt: new Date(),
          };

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
    <motion.div initial={{ y: 200, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
      <Card
        style={{ minHeight: "580px", padding: "0px" }}
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
          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Enter Secret Key</span>
              <Form.Item>
                <Input.Password placeholder="Enter secret key" onChange={handleKeyChange} />
              </Form.Item>
            </Col>
          </Row>

          <Row className="gx-mt-0">
            <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
              <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Select Type</span>
              <Form.Item name="type">
                <Select
                  placeholder="Select Quotes or Video"
                  onChange={(value) => setSelectedType(value)}
                  defaultValue="quotes"
                  disabled={!isAuthorized}
                >
                  <Option value="quotes">Quotes</Option>
                  <Option value="video">Video</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {selectedType === 'quotes' ? (
            <>
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Quotes Title</span>
                  <Form.Item name="title" rules={[{ required: true, message: 'Please enter the Quotes title' }]}>
                    <Input.TextArea placeholder="Enter Quotes title" autoSize={{ minRows: 2 }} disabled={!isAuthorized} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
    <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Quotes Name</span>
    <Form.Item name="name" rules={[{ required: true, message: 'Please enter the Quotes name' }]}>
      <Input.TextArea placeholder="Enter Quotes name" disabled={!isAuthorized} autoSize />
    </Form.Item>
  </Col>
              </Row>
              <Row className="gx-mt-0">
              <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
    <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Categories</span>
    <Form.Item name="categories" rules={[{ required: true, message: 'Please select at least one category' }]}>
      <Select placeholder="Select categories" disabled={!isAuthorized}>
        <Option value="Hindi">Hindi</Option>
        <Option value="Bhojpuri">Bhojpuri</Option>
        <Option value="English">English</Option>
        <Option value="Bengali">Bengali</Option>
        <Option value="Popular">Popular</Option> {/* New category added */}
      </Select>
    </Form.Item>
  </Col>
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Thumbnail Image</span>
                  <Form.Item>
                    <Upload listType="picture" maxCount={1} onChange={handleFileChange} beforeUpload={() => false} disabled={!isAuthorized}>
                      <Button icon={<UploadOutlined />} disabled={!isAuthorized}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            // Code for Video section remains unchanged
            <>
            <Row className="gx-mt-0">
              <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Title</span>
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter the video title' }]}>
                  <Input placeholder="Enter video title" disabled={!isAuthorized} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Name</span>
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter the video name' }]}>
                  <Input placeholder="Enter video name" disabled={!isAuthorized} />
                </Form.Item>
              </Col>
            </Row>
            <Row className="gx-mt-0">
              <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Video Link</span>
                <Form.Item name="videoLink" rules={[{ required: true, message: 'Please enter the video link' }]}>
                  <Input placeholder="Enter video link" disabled={!isAuthorized} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Platform</span>
                <Form.Item name="platform" rules={[{ required: true, message: 'Please select a platform' }]}>
                  <Select placeholder="Select platform" onChange={setSelectedPlatform} disabled={!isAuthorized}>
                    <Option value="Instagram">Instagram</Option>
                    <Option value="YouTube">YouTube</Option>
                    <Option value="LinkedIn">LinkedIn</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {selectedPlatform === 'Instagram' && (
              <Row className="gx-mt-0">
                <Col xs={24} sm={24} md={12} lg={12} className="gx-flex-column">
                  <span className="gx-font-weight-normal gx-mb-1 gx-ml-0">Thumbnail Image</span>
                  <Form.Item>
                    <Upload listType="picture" maxCount={1} onChange={handleFileChange} beforeUpload={() => false} disabled={!isAuthorized}>
                      <Button icon={<UploadOutlined />} disabled={!isAuthorized}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            )}
          </>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isAuthorized}>
              Add {selectedType === 'quotes' ? 'Quotes' : 'Video'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
};

export default AddQuotesForm;
