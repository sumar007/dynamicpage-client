
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import "./dashboard.css";


const Dashboard = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    timer: '',
    link: ''
  });

  const openModal = (banner) => {
    setCurrentBanner(banner);
    setFormData({
      description: banner.description || '',
      timer: banner.timer || '',
      link: banner.link || ''
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentBanner(null);
  };

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dynamicpage-server.onrender.com/api/v1/get-banners");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setBanners(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const updateMe = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`https://dynamicpage-server.onrender.com/api/v1/update-banner/${currentBanner.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Something went wrong while updating the banner.');
        }

        const data = await response.json();
        console.log('Banner updated:', data);
        alert("Banner updated successfully");

        closeModal(); 
        fetchBanners(); 
    } catch (error) {
        console.error(error);
    }
};
//invisible banner
const toggleBannerVisibility = async (banner) => {
  const endpoint = banner.isVisible ? 
      `https://dynamicpage-server.onrender.com/api/v1/invisible-banner/${banner.id}` :
      `https://dynamicpage-server.onrender.com/api/v1/visible-banner/${banner.id}`;

  try {
      const response = await fetch(endpoint, {
          method: 'PUT',
      });

      if (!response.ok) {
          throw new Error('Something went wrong while updating the banner visibility.');
      }

      const data = await response.json();
      console.log('Banner visibility updated:', data);
      alert(`Banner ${banner.isVisible ? 'invisible' : 'visible'} now`);
      fetchBanners();
  } catch (error) {
      console.error(error);
  }
};

  if (loading) return <h1>Loading ...</h1>;
  return (
    <>
    <div>
      <h1>All Banners</h1>
      <div>
        {banners.map((banner) => (
          <div key={banner.id} className="banner">
            { banner.isVisible ?
            <button onClick={() => toggleBannerVisibility(banner)}>Invisible</button> :
            <button onClick={() => toggleBannerVisibility(banner)}>Visible</button>
            }
            <h3><span style={{color:"black"}}>Description:</span> {banner.description}</h3>
            <p>Time: {banner.timer}</p>
            <p>Link: {banner.link}</p>
            <button onClick={() => openModal(banner)}>Update</button>
          </div>
        ))}
      </div>
      <div className="dash_btn">
        <Link to={"/"}><button>Home</button></Link>
        <Link to={"/create-banner"}><button>Create Banner</button></Link>
      </div>
    </div>

    <Modal
  isOpen={isOpen}
  onRequestClose={closeModal}
  contentLabel="Update Banner"
  className="modal"
  overlayClassName="overlay"
>
  <div className="modal-container">
    <h2>Update Banner</h2>
    <form onSubmit={updateMe}>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Timer</label>
        <input
          type="text"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Link</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="update-btn">Update</button>
      <button onClick={closeModal} className="close-btn">Close</button>
    </form>
  </div>
</Modal>

  </>
  );
};

export default Dashboard;
