import React, { useEffect, useState } from 'react';
import { Card, Typography, message, Modal, Row, Col } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Firebase import
import './ProductList.css'; // Add a CSS file for styling
import Auxiliary from './auxilary';
import ProfileHeader from './profileHeader';
import About from './about';
import Biography from './Biography';
import Contact from './Contact';
import Friends from './friends';

const { Meta } = Card;
const { Text } = Typography;

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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

      // Grouping quotes by language (category)
      setHindiQuotes(productsArray.filter((product: any) => product.categories === 'Hindi'));
      setEnglishQuotes(productsArray.filter((product: any) => product.categories === 'English'));
      setBhojpuriQuotes(productsArray.filter((product: any) => product.categories === 'Bhojpuri'));
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Function to render quotes by category
  const renderQuotes = (quotes: any[], categoryTitle: string) => (
    <div style={{height:"100%"}} className="quote-category">
      <h2 className="category-title">{categoryTitle}</h2>
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

  // Modal close handler
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedQuote(null);
  };

  const modalTitle = selectedQuote ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/assets/images/read.gif" alt={selectedQuote.title} style={{ width: 40, height: 40, marginRight: 10 }} />
      <span>{selectedQuote.title}</span>
    </div>
  ) : null;

  return (
    <>
      <Auxiliary>
        <ProfileHeader />
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <About />
              <Biography />
            </Col>
            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Contact />
              <Friends />
            </Col>
          </Row>
        </div>
      </Auxiliary>
      <div  style={{marginBottom:"100px"}} className="quotes-container">
        {/* Render Bhojpuri quotes */}
        {bhojpuriQuotes.length > 0 && renderQuotes(bhojpuriQuotes, 'Bhojpuri Quotes')}

        {/* Render Hindi quotes */}
        {hindiQuotes.length > 0 && renderQuotes(hindiQuotes, 'Hindi Quotes')}

        {/* Render English quotes */}
        {englishQuotes.length > 0 && renderQuotes(englishQuotes, 'English Quotes')}

        {/* Modal for displaying selected quote */}
        {selectedQuote && (
         <Modal
         title={modalTitle}
         visible={isModalVisible}
         onCancel={handleModalClose}
         footer={null}
         style={{ top: 30 }}
       >
         <p style={{ whiteSpace: 'pre-wrap' }}>
           <strong>Description:</strong> {selectedQuote?.name}
         </p>
         <img src={selectedQuote?.imageUrl} alt={selectedQuote?.name} style={{ width: '100%' }} />
       </Modal>
       
        )}
      </div>
    </>
  );
};

export default AllQuotes;
