import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ChartsProps {
  data: Array<{ estado: string; count: number }>;
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map(item => item.estado),
            datasets: [
              {
                data: data.map(item => item.count),
                backgroundColor: [
                  '#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12',
                ],
                borderWidth: 2,
                borderColor: '#fff'
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'bottom' },
              title: {
                display: true,
                text: 'Distribución de Proyectos por Estado'
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ 
      background: 'white', 
      padding: '1.5rem', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h3>📈 Gráfico de Proyectos</h3>
      <div style={{ height: '300px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};