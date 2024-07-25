import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loading3 from './loading3.svg';
import Typewriter from "./Typewriter";
import { ReactTyped } from "react-typed";


function UploadPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Choose CSV File');

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setFileName(file.name); // Update the filename state with the selected file's name
    }
  };

  const handleFileUpload = () => {
    if (file) {
      navigate('/analysis', { state: { file } }); // Pass the file as state to the route
    }
  };

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#003366' // Dark blue background
  };

  const buttonStyles = {
    backgroundColor: 'black', // Dark blue background for the button
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    fontFamily: 'MuseoModerno'
  };

  const titleStyle = {
    fontFamily: 'MuseoModerno',
    fontSize: '50px',
    fontWeight: '700'
  }

  return (
    <div style={pageStyles}>
        <ReactTyped
          strings={[
            'ASSET TRACKER',
            'Easy 1 Step Visualization',
            'Choose a File, then Click Upload!'
          ]}
          typeSpeed={40}
          backSpeed={50}
          backDelay={1000}
          loop
          style={titleStyle}
        />
        <img src={loading3} className="App-logo" alt="logo" />
        <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
        <label htmlFor="fileInput" style={buttonStyles}>{fileName}</label>
      <button onClick={handleFileUpload} style={buttonStyles}>Upload and Analyze</button>
    </div>
  );
}

export default UploadPage;