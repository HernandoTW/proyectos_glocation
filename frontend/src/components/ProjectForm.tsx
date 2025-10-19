import { useState, useEffect } from 'react';

interface ProjectFormProps {
  proyecto?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ proyecto, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'PLANIFICACION',
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: ''
  });

  useEffect(() => {
    if (proyecto) {
      setFormData({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        estado: proyecto.estado,
        fechaInicio: proyecto.fechaInicio.split('T')[0],
        fechaFin: proyecto.fechaFin ? proyecto.fechaFin.split('T')[0] : ''
      });
    }
  }, [proyecto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar datos para el backend
    const dataToSend = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      estado: formData.estado,
      fechaInicio: new Date(formData.fechaInicio).toISOString(),
      fechaFin: formData.fechaFin ? new Date(formData.fechaFin).toISOString() : null
    };
    
    onSave(dataToSend);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
          {proyecto ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              minLength={1}
              maxLength={100}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
              Descripcion:
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              minLength={1}
              maxLength={500}
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                resize: 'vertical',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
              Estado:
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="PLANIFICACION">Planificacion</option>
              <option value="EN_PROGRESO">En Progreso</option>
              <option value="BLOQUEADO">Bloqueado</option>
              <option value="FINALIZADO">Finalizado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
              Fecha Inicio:
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#34495e' }}>
              Fecha Fin (opcional):
            </label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #bdc3c7',
                background: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              {proyecto ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};