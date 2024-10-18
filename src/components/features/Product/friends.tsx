import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row } from "antd";
import { CiYoutube } from "react-icons/ci";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getYouTubeVideoId = (videoLink: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\n?#]+)/;
  const match = videoLink.match(regExp);
  return match ? match[1] : null;
};

// Placeholder function for Instagram thumbnail
const getInstagramThumbnail = () => {
  return "https://via.placeholder.com/150"; // Replace with actual logic for fetching Instagram thumbnails
};

const Friends = () => {
  const [videoList, setVideoList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const fetchVideoData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videos: any[] = [];
      querySnapshot.forEach((doc) => {
        videos.push(doc.data());
      });
      setVideoList(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  const showModal = (video: any) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <>
     <Card
  className="YouTube"
  style={{ overflowY: "auto" }}
  title={
    <Row>
      <Col xs={24} sm={24} md={12} lg={17} xl={12}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "500",
            justifyContent: "flex-start", // Left align text for small screens
          }}
        >
          <CiYoutube className=" gx-link" size={23} />
          <span style={{ marginLeft: "10px" }}>
            My YouTube and Instagram Videos
          </span>
        </div>
      </Col>
    </Row>
  }
>

        <Row >
          {videoList.map((user, index) => (
            <Col style={{padding:"3px"}} key={index} >
              <div
                className="gx-user-fnd"
                onClick={() => showModal(user)}
                style={{
                  marginBottom:"10px",
                  cursor: "pointer",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                  // padding: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  alt={user.name}
                  src={
                    user.platform === "YouTube"
                      ? `https://img.youtube.com/vi/${getYouTubeVideoId(
                          user.videoLink
                        )}/hqdefault.jpg`
                      : getInstagramThumbnail()
                  }
                  style={{
                    width: "100%",
                    height: "120px", // Fixed height for consistency
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <div className="gx-user-fd-content" style={{padding:"5px", marginTop: "10px" }}>
                  <div style={{display:"flex"}}>

                  <div
                      className="gx-status-pos"
                      style={{
                        marginRight: "5px",
                        marginLeft: "3px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "15px" }}>
                        <span
                          className="gx-status-pos gx-status gx-online"
                          style={{ marginRight: "16px" }}
                        ></span>
                      </div>
                    </div>
                  <h6
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "5px",
                    }}
                    title={user.name}
                  >
                    {user.name}
                  </h6>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={user.title}
                  >
                    {user.title}
                  </p>
                  
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Modal for displaying video */}
      <Modal
        title={selectedVideo?.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        {selectedVideo && (
          <div style={{ textAlign: "center" }}>
            {selectedVideo.platform === "YouTube" ? (
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  selectedVideo.videoLink
                )}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                width="100%"
                height="450"
                src={`https://www.instagram.com/p/${
                  selectedVideo.videoLink.split("/")[4]
                }/embed`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Friends;
