import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dynamicpage-server.onrender.com/api/v1/get-visible-banners"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const bannersWithTime = data.data.map((banner) => ({
        ...banner,
        timeRemaining: banner.timer * 60, // convert to seconds
      }));
      setBanners(bannersWithTime);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanners();

    const intervalId = setInterval(() => {
      setBanners((prevBanners) =>
        prevBanners.map((banner) => ({
          ...banner,
          timeRemaining: Math.max(banner.timeRemaining - 1, 0),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="banner-container">
      <h1 className="banner-header">Banners</h1>
      <div>
        {banners
          .filter((banner) => banner.timeRemaining > 0)
          .map((banner) => (
            <div key={banner.id} className="banner">
              <h3>
                {Math.floor(banner.timeRemaining / 60)}:
                {banner.timeRemaining % 60}
              </h3>
              <p>{banner.description}</p>
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                Click me
              </a>
            </div>
          ))}
      </div>
      <div className="dash_btn">
        <Link to={"/dashboard"}><button>Dashboard</button></Link>
        
      </div>
    </div>
  );
};

export default Home;
