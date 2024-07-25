// import logo from './logo.svg';
// import loading3 from './loading3.svg';
// import './App.css';
// import CSVReader from './components/CSVReader';
// import DataVisualizer from './components/DataVisualizer';
// import React, {useState} from 'react';
// import Button from '@mui/material/Button';
// import Papa from 'papaparse';

// function App() {
//   // const [csvData, setCsvData] = useState(null);
//   const [csvData, setCsvData] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     Papa.parse(file, {
//       complete: function(results) {
//         console.log("Parsed CSV data: ", results.data);
//         setCsvData(results.data);
//       },
//       header: true, // Consider setting to true if your CSV has headers
//       dynamicTyping: true, // Automatically converts strings to numbers or booleans based on content
//       skipEmptyLines: true
//     });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={loading3} className="App-logo" alt="logo" />
//         <p>Upload .csv file</p>
//         <input
//           type="file"
//           accept=".csv"
//           style={{ display: 'none' }}
//           id="contained-button-file"
//           onChange={handleFileChange} // Add the onChange handler here
//         />
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" color="primary" component="span">
//           Upload
//         </Button>
//       </label>

//       {/* navigate to visualizing data */}
//       {csvData.length > 0 && <DataVisualizer data={csvData} />} 
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './UploadPage';
import AnalysisPage from './AnalysisPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;