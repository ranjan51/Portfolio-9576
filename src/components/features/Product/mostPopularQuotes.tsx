import React, { useEffect, useState } from 'react';
import { Card, Typography, message, Modal, Carousel, Row, Col } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Firebase import
import './ProductList.css'; // Add a CSS file for styling

const { Meta } = Card;
const { Text } = Typography;

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const MostPopularQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<any[]>([]); // Changed to quotes for all categories
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Set quotes array to all fetched products
      setQuotes(productsArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Function to render the carousel of English quotes
  const renderQuotesCarousel = () => {
    const cards = [];

    // Group quotes into pairs for displaying two per card
    for (let i = 0; i < quotes.length; i += 2) {
      cards.push(quotes.slice(i, i + 2));
    }

    return (

      
      <>
        <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
      <img src="/assets/images/most popular.gif" alt={"MostPopular.gif"} style={{ width: 40, height: 40, marginRight: 5 }} />
    
        <p style={{ marginBottom: "3px" }} className="category-title">Popular Quotes</p>
      </div>
        <Carousel autoplay>
          {cards.map((pair, index) => (
            <div key={index}>
              <Row gutter={[16, 16]}>
                {pair.map((quote: any) => (
                  <Col key={quote.id} xs={12} sm={12} md={12} lg={8}>
                    <Card
                      
                      style={{ width: '100%' }} // Ensure full width
                      cover={<img width="100%" style={{maxHeight:"120px",minHeight:"120px"}}  alt={quote.name} src={quote.imageUrl} />}
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
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      </>
    );
  };

  // Function to render the most recent quotes section
  const renderRecentQuotes = () => {
    // Take the first 10 quotes from the quotes array
    const recentQuotes = quotes.slice(0, 10);

    return (
      <>
      <div style={{display:"flex",alignItems:"center",marginBottom:"5px"}}>
      <img src="/assets/images/MostPopular-unscreen.gif" alt={"MostPopular.gif"} style={{ width: 40, height: 40, marginRight: 5 }} />
    
        <Text style={{ marginBottom: "3px" }} className="category-title">Most Recent Quotes</Text>
      </div>
        <Row gutter={[16, 16]}>
          {recentQuotes.map((quote: any) => (
            <Col key={quote.id}xs={12} sm={12} md={12} lg={8}>
              <Card
                hoverable
                style={{ width: '100%' }} // Ensure full width
                cover={<img style={{maxHeight:"120px",minHeight:"120px"}} width="100%" alt={quote.name} src={quote.imageUrl} />}
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
            </Col>
          ))}
        </Row>
      </>
    );
  };

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

  return (
    <div className="product-list-container">
      {/* Render quotes in carousel */}
      {quotes.length > 0 && renderQuotesCarousel()}

      {/* Render Most Recent Quotes */}
      {quotes.length > 0 && renderRecentQuotes()}

      {/* Modal for displaying selected quote */}
      {selectedQuote && (
        <Modal
          title={modalTitle} // Use the custom title
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null} // You can customize footer if needed
          style={{ top: 30 }}
        >
          <p><strong>Title:</strong> {selectedQuote.title}</p>
          <p><strong>Description:</strong> {selectedQuote.name}</p>
          <img src={selectedQuote.imageUrl} alt={selectedQuote.name} style={{ width: '100%' }} />
        </Modal>
      )}
    </div>
  );
};

export default MostPopularQuotes;
