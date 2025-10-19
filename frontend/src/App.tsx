import { useState, useEffect } from 'react';
import { proyectoService, analyticsService } from './services/api';
import './App.css';

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [proyectosRes, statsRes] = await Promise.all([
        proyectoService.getAll(),
        analyticsService.getGraficos()
      ]);
      setProyectos(proyectosRes.data.data);
      setEstadisticas(statsRes.data.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  return (
    <div className="app">
      <header style={{ background: '#2c3e50', color: 'white', padding: '1rem' }}>
        <h1>🚀 Gestor de Proyectos</h1>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2>📊 Resumen de Proyectos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {estadisticas.map((stat: any) => (
              <div key={stat.estado} style={{ 
                background: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{stat.estado}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db', margin: 0 }}>
                  {stat.count}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>📋 Lista de Proyectos</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#34495e', color: 'white' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Nombre</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Estado</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Fecha Inicio</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((proyecto: any) => (
                  <tr key={proyecto.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '0.75rem' }}>{proyecto.id}</td>
                    <td style={{ padding: '0.75rem' }}>{proyecto.nombre}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        background: proyecto.estado === 'EN_PROGRESO' ? '#2ecc71' : 
                                   proyecto.estado === 'FINALIZADO' ? '#3498db' : 
                                   proyecto.estado === 'PLANIFICACION' ? '#f39c12' : '#e74c3c',
                        color: 'white',
                        fontSize: '0.875rem'
                      }}>
                        {proyecto.estado}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {new Date(proyecto.fechaInicio).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;