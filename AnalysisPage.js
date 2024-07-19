import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Papa from 'papaparse';
import { ReactTyped } from "react-typed";


function AnalysisPage() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [calculationResult, setCalculationResult] = useState('');
  const [calculateTotalAssets, setTotalAssets] = useState('');
  const [calculateSpecAssets, setSpecAssets] = useState('');

  useEffect(() => {
    const file = location.state.file;
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setData(results.data);
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
    }
  }, [location.state.file]);

  const uniqueAssetTypes = Array.from(new Set(data.map(item => item['Asset Type'])));

  // const handleColumnChange = (event) => {
  //   setSelectedColumn(event.target.value);
  // };

  // const getColumnStyle = (column) => {
  //   return selectedColumn === column ? { backgroundColor: 'yellow' } : {};
  // };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const calculateMigrationPercentage = () => {
    const filteredData = data.filter(item => item['Asset Type'] === selectedType);
    let migratedCount = filteredData.filter(item => item.Status === "Migrated").length;

    if (selectedType === 'SQL Server') {
      migratedCount = filteredData.filter((item, index, self) => item.Status === "Migrated" && self.findIndex(i => i.Name === item.Name) === index).length;
    }

    const percentage = (migratedCount / filteredData.length) * 100;
    setCalculationResult(`Percentage of Migrated ${selectedType} Assets: ${percentage.toFixed(2)}%`);
  };

  const calculateAssets = () => {
    const filteredData = data.filter(item => item['Asset Type'] === selectedType);
    const count = filteredData.length
    setSpecAssets(`Asset Count for ${selectedType}: ${count}`);
  };

  const calculateAssetCountTotal = () => {
    const count = data.length;
    setTotalAssets(`Total Asset Count: ${count}`);
  }

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

const handleSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
  sortData(key, direction);
};

const sortData = (key, direction) => {
  const sortedData = [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
    return 0;
  });
  setData(sortedData);
};
const filteredColumns = columns.filter(column => data.some(row => row[column] && ['Name', 'Cloud', 'Asset Type', 'Status', 'Program Office', 'Application', 'System Owner', 'DNS Name', 'Cluster', 'Database Software Version'].includes(column)));

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
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

  const tableContainerStyle = {
    maxHeight: '500px',  // Adjust height as needed
    overflow: 'auto',
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    margin: '20px 0'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',  // Ensures uniform column sizing
    };
    
    const cellStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',  // Ensures text does not overflow
        textOverflow: 'ellipsis',  // Adds an ellipsis if the text is too long
        whiteSpace: 'nowrap'
    };

    const textStyle = {
        fontFamily: 'MuseoModerno',
        color: 'white'
    }

return (
  <div style={pageStyles}>
    <ReactTyped
      strings={['Analysis']}
      typeSpeed={40}
      backSpeed={50}
      backDelay={1000}
      style={titleStyle}
    />

    <button style={buttonStyles} onClick={calculateAssetCountTotal}>
      Calculate Total Assets
    </button>
    <p style={textStyle}>{calculateTotalAssets}</p>

    {/* <select value={selectedColumn} onChange={handleColumnChange} style={buttonStyles}>
      {filteredColumns.map((column, index) => (
        <option key={index} value={column}>
          {column}
        </option>
      ))}
    </select>

    <button style={buttonStyles} onClick={getColumnStyle}>
      Get Column Data
    </button> */}


    <select value={selectedType} onChange={handleTypeChange} style={buttonStyles}>
      <option value="">Select Asset Type</option>
      {uniqueAssetTypes.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>

    <button style={buttonStyles} onClick={calculateMigrationPercentage}>
      Calculate Migration Percentage
    </button>
    <p style={textStyle}>{calculationResult}</p>

    <button style={buttonStyles} onClick={calculateAssets}>
      Calculate Specific Assets
    </button>
    <p style={textStyle}>{calculateSpecAssets}</p>

    <div style={{ ...tableContainerStyle, width: '80%', margin: '20px auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...cellStyle, backgroundColor: '#f4f4f4', fontWeight: 'bold' }}></th>
            {filteredColumns.map((header, index) => (
              <th
                key={index}
                style={{
                  ...cellStyle,
                  backgroundColor: '#f4f4f4',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
                onClick={() => handleSort(header)}
              >
                {header}
                {sortConfig.key === header && (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  ...cellStyle,
                  backgroundColor: '#f4f4f4',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {index + 1}
              </td>
              {filteredColumns.map((column, colIndex) => (
                <td key={colIndex} style={cellStyle}>
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default AnalysisPage;