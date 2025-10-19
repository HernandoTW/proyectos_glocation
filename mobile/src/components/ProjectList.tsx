import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fechaInicio: string;
}

interface ProjectListProps {
  proyectos: Proyecto[];
  loading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ proyectos, loading }) => {
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

  const renderItem = ({ item }: { item: Proyecto }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) }]}>
          <Text style={styles.estadoText}>{item.estado}</Text>
        </View>
      </View>
      
      <Text style={styles.descripcion} numberOfLines={2}>
        {item.descripcion}
      </Text>
      
      <View style={styles.footer}>
        <Text style={styles.fecha}>
          Inicio: {new Date(item.fechaInicio).toLocaleDateString()}
        </Text>
        <Text style={styles.id}>#{item.id}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando proyectos...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={proyectos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  estadoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fecha: {
    fontSize: 12,
    color: '#95a5a6',
  },
  id: {
    fontSize: 12,
    color: '#bdc3c7',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default ProjectList;