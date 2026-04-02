import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, ChevronRight } from 'lucide-react-native';
import loadsData from '../data/loads.json';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLoads = loadsData.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesGauge = item.Gauge.toLowerCase().includes(query);
    const matchesPowder = item.Powder.toLowerCase().includes(query);
    return matchesGauge || matchesPowder;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { load: item })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.gaugeText}>{item.Gauge}</Text>
        <Text style={styles.velocityText}>{item.Velocity}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.bulletPoint}>
          <Text style={styles.label}>Powder: </Text>{item.Powder}
        </Text>
        <Text style={styles.bulletPoint}>
          <Text style={styles.label}>Weight: </Text>{item['Load Weight']}
        </Text>
      </View>
      <ChevronRight color="#a1a1aa" size={20} style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search color="#a1a1aa" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search gauge or powder..."
          placeholderTextColor="#a1a1aa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredLoads}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#ffffff',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingRight: 24,
  },
  gaugeText: {
    color: '#34d399',
    fontSize: 18,
    fontWeight: 'bold',
  },
  velocityText: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '600',
  },
  cardBody: {
    marginTop: 4,
  },
  bulletPoint: {
    color: '#e4e4e7',
    fontSize: 15,
    marginBottom: 4,
  },
  label: {
    color: '#a1a1aa',
    fontWeight: '600',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
