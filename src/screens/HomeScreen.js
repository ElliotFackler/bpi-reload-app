import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Search, ChevronRight, ChevronDown } from 'lucide-react-native';
import loadsData from '../data/loads.json';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gaugeFilter, setGaugeFilter] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [hullFilter, setHullFilter] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const gauges = [...new Set(loadsData.map(item => item.Gauge))];
  const materials = [...new Set(loadsData.map(item => item['Shot Material']))];
  const hulls = [...new Set(loadsData.map(item => item['Hull Length']))];

  const filteredLoads = loadsData.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.Gauge.toLowerCase().includes(query) ||
      item.Powder.toLowerCase().includes(query) ||
      item.Primer.toLowerCase().includes(query) ||
      item.Wad.toLowerCase().includes(query) ||
      item['Shot Material'].toLowerCase().includes(query);
    const matchesGauge = gaugeFilter ? item.Gauge === gaugeFilter : true;
    const matchesMaterial = materialFilter ? item['Shot Material'] === materialFilter : true;
    const matchesHull = hullFilter ? item['Hull Length'] === hullFilter : true;

    return matchesSearch && matchesGauge && matchesMaterial && matchesHull;
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

  const filterOptions = {
    gauge: { label: 'Gauge', options: gauges, selected: gaugeFilter, setSelect: setGaugeFilter },
    material: { label: 'Material', options: materials, selected: materialFilter, setSelect: setMaterialFilter },
    hull: { label: 'Hull', options: hulls, selected: hullFilter, setSelect: setHullFilter }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search color="#a1a1aa" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search gauge, powder, primer, wad..."
          placeholderTextColor="#a1a1aa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={styles.filterBarContent}>
        {Object.keys(filterOptions).map(key => {
          const { label, selected } = filterOptions[key];
          const isActive = selected !== '';
          return (
            <TouchableOpacity
              key={key}
              style={[styles.dropdownButton, isActive && styles.dropdownButtonActive]}
              onPress={() => setActiveDropdown(key)}
            >
              <Text style={[styles.dropdownButtonText, isActive && styles.dropdownButtonTextActive]}>
                {isActive ? selected : label}
              </Text>
              <ChevronDown color={isActive ? "#121212" : "#a1a1aa"} size={16} style={styles.dropdownIcon} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal visible={activeDropdown !== null} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setActiveDropdown(null)}>
          {activeDropdown && (
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select {filterOptions[activeDropdown].label}</Text>
                <TouchableOpacity onPress={() => { filterOptions[activeDropdown].setSelect(''); setActiveDropdown(null); }}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {filterOptions[activeDropdown].options.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      filterOptions[activeDropdown].setSelect(option);
                      setActiveDropdown(null);
                    }}
                  >
                    <Text style={[
                      styles.modalOptionText,
                      filterOptions[activeDropdown].selected === option && styles.modalOptionTextSelected
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
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
  filterBar: {
    marginBottom: 8,
  },
  filterBarContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdownButtonActive: {
    backgroundColor: '#34d399',
    borderColor: '#34d399',
  },
  dropdownButtonText: {
    color: '#a1a1aa',
    fontWeight: '600',
  },
  dropdownButtonTextActive: {
    color: '#121212',
  },
  dropdownIcon: {
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearText: {
    color: '#34d399',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalOptionText: {
    color: '#e4e4e7',
    fontSize: 16,
  },
  modalOptionTextSelected: {
    color: '#34d399',
    fontWeight: 'bold',
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
