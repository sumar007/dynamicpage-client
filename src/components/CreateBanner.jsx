import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CreateBanner = () => {

    const [formData, setFormData] = useState({
        description: '',
        timer: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://dynamicpage-server.onrender.com/api/v1/create-banner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();

            setFormData({
                description: "",
                timer: "",
                link: "",
            });

            alert(data.message);

        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="modal-container">
    <h2 style={{color:"white"}}>Update Banner</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{color:"white"}}>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label style={{color:"white"}}>Timer</label>
        <input
          type="text"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label style={{color:"white"}}>Link</label>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="update-btn">Create</button>
    </form>
    <div className="dash_btn">
        <Link to={"/dashboard"}><button>Dashboard</button></Link>
        
      </div>
  </div>
  )
}

export default CreateBanner