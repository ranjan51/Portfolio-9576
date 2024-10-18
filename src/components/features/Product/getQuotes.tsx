import React, { useEffect, useState } from 'react';
import { Card, Typography, message, Modal, Avatar, Row, Col, Rate } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Firebase import
import './ProductList.css'; // Add a CSS file for styling
import Friends from './friends';
import { friendList, photoList } from './data';
import About from './about';
import Biography from './Biography';
import Photos from './photos';
import Auxiliary from './auxilary';
import ProfileHeader from './profileHeader';
import Contact from './Contact';
import grid from 'antd/lib/grid';

const { Meta } = Card;
const { Text } = Typography;

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const AllQuotes: React.FC = () => {
  const [hindiQuotes, setHindiQuotes] = useState<any[]>([]);
  const [englishQuotes, setEnglishQuotes] = useState<any[]>([]);
  const [bhojpuriQuotes, setBhojpuriQuotes] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'quotes'));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("bhojpuriQuotes",productsArray)

      // Grouping quotes by language (category)
      const hindiQuotesArray = productsArray.filter((product: any) => product.categories === 'Hindi');
      const englishQuotesArray = productsArray.filter((product: any) => product.categories === 'English');
      const bhojpuriQuotesArray = productsArray.filter((product: any) => product.categories === 'English');

      setHindiQuotes(hindiQuotesArray);
      setEnglishQuotes(englishQuotesArray);
      setBhojpuriQuotes(englishQuotesArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Function to render quotes by category
  const renderQuotes = (quotes: any, categoryTitle: string) => (
    <div >
      <p className="category-title">{categoryTitle}</p>
      <div className="product-list-horizontal">
        {quotes.map((quote: any) => (
          <div key={quote.id} className="product-card">
            <Card
              hoverable
              cover={<img width="100%" alt={quote.name} src={quote.imageUrl} />}
              onClick={() => {
                setSelectedQuote(quote);
                setIsModalVisible(true);
              }}
            >
              <Meta
                title={truncateText(quote.title, 16)} // Truncate title to 16 characters
                description={truncateText(quote.name, 50)} // Truncate description to 50 characters
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );

  // Function to handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedQuote(null); // Clear selected quote when closing
  };
  const modalTitle = selectedQuote ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/assets/images/read.gif" alt={selectedQuote.title} style={{ width: 40, height: 40, marginRight: 10 }} />
      <span>{selectedQuote.title}</span>
    </div>
  ) : null;

  const combinedVideoList = [
    {
      videoLink: "https://youtu.be/l3F3RFMRmcg?si=HhcmDUbLyGUGOqIE", // YouTube video link
      name: "Rick Astley",
      title: "Never Gonna Give You Up",
      status: "online",
      platform: "YouTube" // Platform identifier
    },
    {
      videoLink: "https://www.youtube.com/watch?v=eVTXPUF4Oz4",
      name: "Linkin Park",
      title: "Numb",
      status: "offline",
      platform: "YouTube"
    },
    {
      videoLink: "https://www.youtube.com/watch?v=lWA2pjMjpBs",
      name: "Rihanna",
      title: "Diamonds",
      status: "away",
      platform: "YouTube"
    },
    {
      videoLink: "https://www.instagram.com/reel/CyDrQ57vPld/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==", // Instagram video link
      name: "Cristiano Ronaldo",
      title: "Training Session",
      status: "online",
      platform: "Instagram" // Platform identifier
    },
    {
      videoLink: "https://www.instagram.com/p/CL3OephHsUP/",
      name: "LeBron James",
      title: "Game Highlights",
      status: "offline",
      platform: "Instagram"
    },
    {
      videoLink: "https://www.instagram.com/p/CKXNjqlF_3W/",
      name: "Dwayne Johnson",
      title: "Workout Motivation",
      status: "away",
      platform: "Instagram"
    }
  ];
  
  
  return (
    <>
    
    <Auxiliary>
      <ProfileHeader/>
      <div className="gx-profile-content">
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <About/>
            <Biography/>
            {/* <Events/> */}
          </Col>

          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Contact/>
            <Row>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
              <Friends />              </Col>
              {/* <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                <Photos photoList={photoList}/>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </div>
    </Auxiliary>
    <div>
      {/* Render Hindi quotes */}
      {bhojpuriQuotes.length > 0 && renderQuotes(bhojpuriQuotes, 'Bhojpuri Quotes')}
      {hindiQuotes.length > 0 && renderQuotes(hindiQuotes, 'Hindi Quotes')}

      {/* Render English quotes */}
      {englishQuotes.length > 0 && renderQuotes(englishQuotes, 'English Quotes')}

      {/* Modal for displaying selected quote */}
      {selectedQuote && (
        <Modal
        title={modalTitle} // Use the custom title
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null} // You can customize footer if needed
          style={{top:30}}
        >
          <p><strong>Title:</strong> {selectedQuote.title}</p>
          <p><strong>Description:</strong> {selectedQuote.name}</p>
          <img src={selectedQuote.imageUrl} alt={selectedQuote.name} style={{ width: '100%' }} />
        </Modal>
      )}
    </div>
  
    </>
  );
};

export default AllQuotes;
