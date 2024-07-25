import React from 'react';
import { Bar } from 'react-chartjs-2';

const DataVisualizer = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.label),  // Adjust 'label' according to your CSV headers
        datasets: [{
            label: 'Dataset',
            data: data.map(item => item.value),  // Adjust 'value' according to your CSV headers
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }]
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default DataVisualizer;