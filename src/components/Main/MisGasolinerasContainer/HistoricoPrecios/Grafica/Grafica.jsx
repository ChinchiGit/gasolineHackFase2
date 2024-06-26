import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Grafica.css'; // Importa el archivo CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Histórico de precios(€/Litro)',
    },
  },
};


export function Grafica({fechas, preciosDiesel, preciosGasolina}) {
  const data = {
    labels : [...fechas],
  
    datasets: [
      {
        label: 'Diesel',
        data: [...preciosDiesel],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Gasolina',
        data: [...preciosGasolina],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar className="grafica-bar" options={options} data={data} />;
}