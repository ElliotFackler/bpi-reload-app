import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { load } = route.params;

  const dataRows = [
    { label: 'Gauge', value: load.Gauge },
    { label: 'Hull Length', value: load['Hull Length'] },
    { label: 'Load Weight', value: load['Load Weight'] },
    { label: 'Shot Material', value: load['Shot Material'] },
    { label: 'Powder', value: load.Powder },
    { label: 'Primer', value: load.Primer },
    { label: 'Wad', value: load.Wad },
    { label: 'Velocity', value: load.Velocity },
    { label: 'Pressure', value: load.Pressure },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{load.Gauge} Load Recipe</Text>
        <Text style={styles.subtitle}>{load.Powder} - {load['Load Weight']}</Text>
      </View>

      <View style={styles.table}>
        {dataRows.map((row, index) => (
          <View 
            key={row.label} 
            style={[
              styles.row, 
              index === dataRows.length - 1 && styles.lastRow
            ]}
          >
            <View style={styles.labelCol}>
              <Text style={styles.labelText}>{row.label}</Text>
            </View>
            <View style={styles.valCol}>
              <Text style={styles.valText}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#a1a1aa',
  },
  table: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  labelCol: {
    flex: 1,
    padding: 16,
    backgroundColor: '#262626',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  labelText: {
    color: '#a1a1aa',
    fontSize: 16,
    fontWeight: '600',
  },
  valCol: {
    flex: 2,
    padding: 16,
    justifyContent: 'center',
  },
  valText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
