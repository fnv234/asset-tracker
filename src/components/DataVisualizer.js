import React from 'react';
import { Bar } from 'react-chartjs-2';

function DataVisualizer({ data }) {
    const chartData = {
        labels: data.map(item => item.labelField),  // Replace 'labelField' with the field from your CSV
        datasets: [{
            label: 'Dataset 1',
            data: data.map(item => item.dataField),  // Replace 'dataField' with the data field from your CSV
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
    };

    return <Bar data={chartData} />;
}

export default DataVisualizer;