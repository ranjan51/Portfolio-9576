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
  const [quotes, setQuotes] = useState<any[]>([]); // Popular quotes state
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]); // Recent quotes state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  // Fetch quotes from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'quotes'));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter popular quotes
      const popularQuotes = productsArray.filter((quote: any) => quote.categories === 'Popular');
      setQuotes(popularQuotes);

      // Sort by createdAt to get recent quotes
      const recentQuotes = productsArray.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();  // Convert to timestamp (milliseconds)
        const dateB = new Date(b.createdAt).getTime();  // Convert to timestamp (milliseconds)
        return dateB - dateA;  // Sort by most recent
      });
      
      setRecentQuotes(recentQuotes);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch quotes on component mount
  }, []);

  // Render carousel for quotes (Popular and Recent)
  const renderQuotesCarousel = () => {
    const cards = [];

    // Group popular quotes into pairs for displaying two per card
    for (let i = 0; i < quotes.length; i += 2) {
      cards.push(quotes.slice(i, i + 2));
    }

    const recentCards = [];

    // Group recent quotes into pairs for displaying two per card
    for (let i = 0; i < recentQuotes.length; i += 2) {
      recentCards.push(recentQuotes.slice(i, i + 2));
    }

    return (
      <>
        {/* Popular Quotes Carousel */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <img src="/assets/images/most popular.gif" alt="MostPopular.gif" style={{ width: 40, height: 40, marginRight: 5 }} />
          <p style={{ marginBottom: "3px" }} className="category-title">Popular Quotes</p>
        </div>
        <Carousel autoplay>
          {cards.map((pair, index) => (
            <div key={index}>
              <Row gutter={[16, 16]}>
                {pair.map((quote: any) => (
                  <Col key={quote.id} xs={12} sm={12} md={12} lg={8}>
                    <Card
                      style={{ width: '100%' }}
                      cover={<img width="100%" style={{ maxHeight: "120px", minHeight: "120px" }} alt={quote.name} src={quote.imageUrl} />}
                      onClick={() => {
                        setSelectedQuote(quote);
                        setIsModalVisible(true);
                      }}
                    >
                      <Meta title={truncateText(quote.title, 16)} description={truncateText(quote.name, 50)} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>

        {/* Recent Quotes Carousel */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <img src="/assets/images/MostPopular-unscreen.gif" alt="Recent.gif" style={{ width: 40, height: 40, marginRight: 5 }} />
          <p style={{ marginBottom: "3px" }} className="category-title">Recent Quotes</p>
        </div>
        <Carousel autoplay>
          {recentCards.map((pair, index) => (
            <div key={index}>
              <Row gutter={[16, 16]}>
                {pair.map((quote: any) => (
                  <Col key={quote.id} xs={12} sm={12} md={12} lg={8}>
                    <Card
                      style={{ width: '100%' }}
                      cover={<img width="100%" style={{ maxHeight: "120px", minHeight: "120px" }} alt={quote.name} src={quote.imageUrl} />}
                      onClick={() => {
                        setSelectedQuote(quote);
                        setIsModalVisible(true);
                      }}
                    >
                      <Meta title={truncateText(quote.title, 16)} description={truncateText(quote.name, 50)} />
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
      {renderQuotesCarousel()}

      {/* Modal to display quote details */}
      {selectedQuote && (
        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          style={{ top: 20 }}
        >
          <div>
            <Text>{selectedQuote.name}</Text>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MostPopularQuotes;
