import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { proyectoService } from './src/services/api';
import ProjectList from './src/components/ProjectList';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
}

export default function App() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await proyectoService.getAll();
      setProyectos(response.data.data);
    } catch (err) {
      setError('Error al cargar proyectos. Verifica la conexión.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📱 Proyectos</Text>
        <Text style={styles.subtitle}>
          {proyectos.length} proyectos encontrados
        </Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText} onPress={cargarProyectos}>
              Presiona para reintentar
            </Text>
          </View>
        ) : (
          <ProjectList proyectos={proyectos} loading={loading} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryText: {
    fontSize: 14,
    color: '#3498db',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});