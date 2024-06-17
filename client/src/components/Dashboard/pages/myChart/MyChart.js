import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

  export const options = {
    responsive: true,
    
    plugins: {
      legend: {
        fullSize: false,
        labels:{
          borderRadius: 50
        }


      },
      title: {
        display: true,
        text: 'Performance',
        align: "start",
        padding: 20
      },
    },
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [1000,2000,4005,54600,456600, 2000,4005,54600, 40002, 34566, 2947,4566].map((n) =>  n),
        borderColor: '#007538',
        backgroundColor: '#007538',
      },
      {
        label: 'Expenses',
        data: [4000,27000, 4005,54600,456600, 2000,4005,54600, 40002,42005,594600,45600].map((n) =>  n),
        borderColor: '#00A4DC',
        backgroundColor: '#00A4DC',
      },
      {
        label: 'Debt',
        data: [21000,25000,47005,524600,56600, 3000,27000, 4005,54600,456600, 2000,3043328].map((n) =>  n),
        borderColor: '#BA1A1A',
        backgroundColor: '#BA1A1A',
      },
    ],
  };


function MyChart() {
  return (
    <Line options={options} data={data} />
  )
}

export default MyChart

