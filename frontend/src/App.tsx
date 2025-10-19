import { useState, useEffect } from 'react';
import axios from 'axios';
import { Charts } from './components/Charts';
import { ProjectForm } from './components/ProjectForm';
import './App.css';

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProyecto, setEditingProyecto] = useState(null);
  const [analisis, setAnalisis] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [proyectosRes, statsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/proyectos'),
        axios.get('http://localhost:3000/api/analytics/graficos')
      ]);
      setProyectos(proyectosRes.data.data);
      setEstadisticas(statsRes.data.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProyecto(null);
    setShowForm(true);
  };

  const handleEdit = (proyecto: any) => {
    setEditingProyecto(proyecto);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        await axios.delete(`http://localhost:3000/api/proyectos/${id}`);
        cargarDatos();
        alert('✅ Proyecto eliminado correctamente');
      } catch (error) {
        console.error('Error eliminando proyecto:', error);
        alert('❌ Error al eliminar el proyecto');
      }
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingProyecto) {
        await axios.put(`http://localhost:3000/api/proyectos/${editingProyecto.id}`, data);
        alert('✅ Proyecto actualizado correctamente');
      } else {
        await axios.post('http://localhost:3000/api/proyectos', data);
        alert('✅ Proyecto creado correctamente');
      }
      setShowForm(false);
      setEditingProyecto(null);
      cargarDatos();
    } catch (error: any) {
      console.error('Error guardando proyecto:', error);
      alert(error.response?.data?.message || '❌ Error al guardar el proyecto');
    }
  };

  const handleAnalisis = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/analytics/analisis');
      setAnalisis(response.data.data.resumen);
    } catch (error) {
      console.error('Error generando análisis:', error);
      alert('❌ Error al generar el análisis');
    }
  };

  const getEstadoColor = (estado: string) => {
    const colors: { [key: string]: string } = {
      'PLANIFICACION': '#f39c12',
      'EN_PROGRESO': '#2ecc71', 
      'BLOQUEADO': '#e74c3c',
      'FINALIZADO': '#3498db',
      'CANCELADO': '#95a5a6'
    };
    return colors[estado] || '#95a5a6';
  };

  const getEstadoIcon = (estado: string) => {
    const icons: { [key: string]: string } = {
      'PLANIFICACION': '📋',
      'EN_PROGRESO': '🚀',
      'BLOQUEADO': '🛑',
      'FINALIZADO': '✅',
      'CANCELADO': '❌'
    };
    return icons[estado] || '📁';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem',
        color: '#2c3e50'
      }}>
        ⏳ Cargando proyectos...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #ecf0f1'
      }}>
        <div>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>
            🚀 Gestor de Proyectos
          </h1>
          <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>
            {proyectos.length} proyectos registrados
          </p>
        </div>
        <button
          onClick={handleCreate}
          style={{
            background: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ➕ Nuevo Proyecto
        </button>
      </header>

      {/* Gráfico */}
      {estadisticas.length > 0 && <Charts data={estadisticas} />}

      {/* Análisis IA */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: '#2c3e50' }}>🤖 Análisis IA de Proyectos</h3>
            <button
              onClick={handleAnalisis}
              style={{
                background: '#9b59b6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Generar Análisis
            </button>
          </div>
          {analisis && (
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              border: '1px solid #e9ecef'
            }}>
              {analisis}
            </div>
          )}
        </div>
      </section>

      {/* Tabla de Proyectos */}
      <section>
        <h2 style={{ marginBottom: '1rem', color: '#34495e' }}>📋 Lista de Proyectos</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ background: '#34495e', color: 'white' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Descripción</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Estado</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Fecha Inicio</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto: any) => (
                <tr key={proyecto.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={{ padding: '1rem', background: 'white', fontWeight: 'bold' }}>
                    #{proyecto.id}
                  </td>
                  <td style={{ padding: '1rem', background: 'white', fontWeight: 'bold' }}>
                    {proyecto.nombre}
                  </td>
                  <td style={{ padding: '1rem', background: 'white', maxWidth: '300px' }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {proyecto.descripcion}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', background: 'white' }}>
                    <span style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: '20px',
                      background: getEstadoColor(proyecto.estado),
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: 'fit-content'
                    }}>
                      {getEstadoIcon(proyecto.estado)} {proyecto.estado}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', background: 'white' }}>
                    {new Date(proyecto.fechaInicio).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', background: 'white' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(proyecto)}
                        style={{
                          background: '#f39c12',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(proyecto.id)}
                        style={{
                          background: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal de Formulario */}
      {showForm && (
        <ProjectForm
          proyecto={editingProyecto}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProyecto(null);
          }}
        />
      )}
    </div>
  );
}

export default App;